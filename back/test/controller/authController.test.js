import { describe, it, expect, jest, beforeEach } from '@jest/globals'

// Mock du service : pas de vraie BDD, pas de vrai JWT
jest.unstable_mockModule('../../services/authService.js', () => ({
  inscrire: jest.fn(),
  connecterStaff: jest.fn(),
}))

// Imports APRÈS le mock
const loginService = await import('../../services/authService.js')
const { connexion, deconnexion, moi } = await import('../../controllers/authController.js')
const { ErrorHttp } = await import('../../server/erreurs.js')

// Fausse réponse Express
function mockRes() {
  const res = {
    statusCode: null,
    body: null,
    cookies: {},
    clearedCookies: [],
    ended: false,
  }
  res.status = (code) => { res.statusCode = code; return res }
  res.json = (payload) => { res.body = payload; return res }
  res.cookie = (name, value, options) => { res.cookies[name] = { value, options }; return res }
  res.clearCookie = (name) => { res.clearedCookies.push(name); return res }
  res.end = () => { res.ended = true; return res }
  return res
}

const VALID_BODY = { email: 'lea@mail.com', motDePasse: 'password123' }

beforeEach(() => {
  jest.clearAllMocks()
})

describe('connexion : validation des entrées', () => {
  it('appelle next avec une ErrorHttp 422 si le body est vide', async () => {
    const req = { body: {} }
    const res = mockRes()
    const next = jest.fn()

    await connexion(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    const err = next.mock.calls[0][0]
    expect(err).toBeInstanceOf(ErrorHttp)
    expect(err.message).toBe('Email et mot de passe obligatoires')
    expect(loginService.connecterStaff).not.toHaveBeenCalled()
  })

  it("appelle next avec une ErrorHttp 422 si l'email est vide", async () => {
    const req = { body: { ...VALID_BODY, email: '   ' } }
    const next = jest.fn()

    await connexion(req, mockRes(), next)

    expect(next.mock.calls[0][0]).toBeInstanceOf(ErrorHttp)
  })

  it('appelle next avec une ErrorHttp 422 si req.body est undefined', async () => {
    const next = jest.fn()

    await connexion({}, mockRes(), next)

    expect(next.mock.calls[0][0]).toBeInstanceOf(ErrorHttp)
  })
})

describe('connexion : appel du service', () => {
  it('pose le cookie et renvoie le staff si les identifiants sont valides', async () => {
    const req = { body: { email: '  LEA@Mail.com ', motDePasse: 'password123' } }
    const res = mockRes()
    const next = jest.fn()
    const staff = { nom: 'Léa', role: 'STAFF' }
    loginService.connecterStaff.mockResolvedValue({ token: 'fake.jwt.token', staff })

    await connexion(req, res, next)

    // l'email est normalisé (trim + lowercase) avant l'appel au service
    expect(loginService.connecterStaff).toHaveBeenCalledWith({
      email: 'lea@mail.com',
      motDePasse: 'password123',
    })
    expect(res.cookies.token.value).toBe('fake.jwt.token')
    expect(res.cookies.token.options).toMatchObject({
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 8 * 60 * 60 * 1000,
    })
    expect(res.body).toEqual({ staff })
    expect(next).not.toHaveBeenCalled()
  })

  it("transmet à next l'erreur levée par le service (ex : identifiants invalides)", async () => {
    const res = mockRes()
    const next = jest.fn()
    const erreur = new ErrorHttp(401, 'Identifiants invalides')
    loginService.connecterStaff.mockRejectedValue(erreur)

    await connexion({ body: { ...VALID_BODY } }, res, next)

    expect(next).toHaveBeenCalledWith(erreur)
    expect(res.cookies.token).toBeUndefined()
  })

  it("transmet à next une erreur technique (ex : BDD down)", async () => {
    const next = jest.fn()
    const erreur = new Error('DB down')
    loginService.connecterStaff.mockRejectedValue(erreur)

    await connexion({ body: { ...VALID_BODY } }, mockRes(), next)

    expect(next).toHaveBeenCalledWith(erreur)
  })
})

describe('deconnexion', () => {
  it('supprime le cookie et renvoie 204', () => {
    const res = mockRes()

    deconnexion({}, res)

    expect(res.clearedCookies).toEqual(['token'])
    expect(res.statusCode).toBe(204)
    expect(res.ended).toBe(true)
  })
})

describe('moi', () => {
  it("renvoie l'utilisateur présent sur la requête", () => {
    const res = mockRes()
    const utilisateur = { id: 1, nom: 'Léa' }

    moi({ utilisateur }, res)

    expect(res.body).toEqual({ utilisateur })
  })
})