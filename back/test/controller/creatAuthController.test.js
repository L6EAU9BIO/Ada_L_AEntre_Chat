import { describe, it, expect, jest, beforeEach } from '@jest/globals'

// Mock du service : pas de vraie BDD, pas de bcrypt
jest.unstable_mockModule('../../services/authService.js', () => ({
  inscrire: jest.fn(),
  connecterStaff: jest.fn(),
}))

// Imports APRÈS le mock
const loginService = await import('../../services/authService.js')
const { inscription } = await import('../../controllers/authController.js')
const { ErrorHttp } = await import('../../server/erreurs.js')

// Fausse réponse Express
function createMockRes() {
  const res = { statusCode: null, body: null }
  res.status = (code) => { res.statusCode = code; return res }
  res.json = (payload) => { res.body = payload; return res }
  return res
}

const VALID_BODY = {
  nom: 'DeLarue',
  prenom: 'Jean-Michel',
  email: 'jeanjean@mail.fr',
  tel: '0600000000',
  motDePasse: 'password123',
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('inscription : validation des champs', () => {
  it.each([
    ['nom vide', { nom: ' ' }],
    ['prénom vide', { prenom: ' ' }],
    ['email vide', { email: ' ' }],
    ['email au format invalide', { email: 'jeanjean@fr' }],
    ['téléphone vide', { tel: ' ' }],
    ['mot de passe vide', { motDePasse: '' }],
    ['mot de passe trop court', { motDePasse: 'court' }],
  ])('appelle next avec une ErrorHttp 422 si : %s', async (_nom, champ) => {
    const req = { body: { ...VALID_BODY, ...champ } }
    const res = createMockRes()
    const next = jest.fn()

    await inscription(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    const err = next.mock.calls[0][0]
    expect(err).toBeInstanceOf(ErrorHttp)
    expect(err.message).toBe('Données invalides')
    expect(loginService.inscrire).not.toHaveBeenCalled()
    expect(res.statusCode).toBeNull()
  })

  it('appelle next avec une ErrorHttp 422 si req.body est undefined', async () => {
    const next = jest.fn()

    await inscription({}, createMockRes(), next)

    expect(next.mock.calls[0][0]).toBeInstanceOf(ErrorHttp)
  })
})

describe('inscription : création du compte', () => {
  it('renvoie 201 avec le user si le compte est créé', async () => {
    const req = {
      body: {
        ...VALID_BODY,
        nom: '  DeLarue ',
        email: '  JeanJean@Mail.fr ',
      },
    }
    const res = createMockRes()
    const next = jest.fn()
    const user = { id: 1, nom: 'DeLarue', prenom: 'Jean-Michel' }
    loginService.inscrire.mockResolvedValue(user)

    await inscription(req, res, next)

    // les champs sont nettoyés (trim, email en minuscules) avant l'appel au service
    expect(loginService.inscrire).toHaveBeenCalledWith({
      nom: 'DeLarue',
      prenom: 'Jean-Michel',
      email: 'jeanjean@mail.fr',
      tel: '0600000000',
      motDePasse: 'password123',
    })
    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual({ message: 'Compte crée avec suscès', user })
    expect(next).not.toHaveBeenCalled()
  })

  it("transmet à next l'erreur levée par le service (ex : email déjà utilisé)", async () => {
    const res = createMockRes()
    const next = jest.fn()
    const erreur = new ErrorHttp(409, 'Email déjà utilisé')
    loginService.inscrire.mockRejectedValue(erreur)

    await inscription({ body: { ...VALID_BODY } }, res, next)

    expect(next).toHaveBeenCalledWith(erreur)
    expect(res.statusCode).toBeNull()
  })
})