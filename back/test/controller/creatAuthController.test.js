import { describe, it, expect, jest } from '@jest/globals'
import { inscription } from '../../controllers/authController'

// On remplace authService par une fausse version pas de vrai BDD ni de bcrypt
jest.unstable_mockModule('../../services/authService.js', () => ({
    inscrire: jest.fn(),
    connecterStaff: jest.fn(),
}))

// On importe Apres le mock, sinon le controller irait prendre le vrai service
const { createAuthController } = await import('../../controllers/authController.js')

const { createAuthService } = await import('../../services/authService.js')

// Fausse réponse Express : on capture status + body, et send() pour le 204.
function createMockRes() {
  const res = { statusCode: null, body: null };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (payload) => {
    res.body = payload;
    return res;
  };
  res.send = jest.fn(() => res);
  return res;
}
//* 'id, nom, prenom, mail as email, num_tel as tel, role, date_arrivee';
// TESTS
describe('Valider la création du compte (inscription)', () => {
  it("renvoie 400 si un champ NOM requis ", async () => {
    // GIVEN : body sans name
    const req = {
      body: {
        nom: " ",
        prenom: "Jean-miche",
        email: "jeanjean@fr",
        num_tel: '090099',
        role: "client",
        password: "password"
      }
    }
    const res = createMockRes()

    // WHEN + THEN 
    await expect(createAuthController(req, res)).rejects.toMatchObject({
      statusCode: 400,
      message: 'Champs obligatoire manquants'
    })
  })
  it('renvoie 400 si le champ prenom est vide', async () => {
    const req = {
      body: {
        nom: "DeLarue",
        prenom: " ",
        email: "jeanjean@fr",
        num_tel: '090099',
        role: "client",
        password: "password"
      }
    }
    const res = createMockRes()

    // WHEN + THEN 
    await expect(createAuthController(req, res)).rejects.toMatchObject({
      statusCode: 400,
      message: 'Champ manquant requis'
    }) 
  })
  it("renvoie 400 si le champs EMAIL est manquant", async () => {
    const req = {
      body: {
        nom: "DeLarue",
        prenom: "Jean-miche",
        email: " ",
        num_tel: '090099',
        role: "client",
        password: "password"
      }
    }
    const res = createMockRes()

    // WHEN + THEN
    await expect(createAuthController(req, res)).rejects.toMatchObject({
      statusCode: 400,
      message: 'Champ requis manquant'
    })
  })
  it('renvoie 400 si le champ NUM_TEL est absent', async () => {
    const req = {
      body: {
        nom: "DeLarue",
        prenom: "Jean-miche",
        email: "jeanjean@fr",
        num_tel: ' ',
        role: "client",
        password: "password"
      }
    }
    const res = createMockRes()

    await expect(createAuthController(req, res)).rejects.toMatchObject({
      statusCode: 400,
      message: 'Champs requis manquants'
    })
  })

  it("Renvoie 400 si le champ PASSWORD est manquant", async () => {
    const req = {
      body: {
        nom: "DeLarue",
        prenom: "Jean-miche",
        email: "jeanjean@fr",
        num_tel: '090099',
        role: "client",
        password: " "
      }
    }
    const res = createMockRes()
    await expect(createAuthController(req, res)).rejects.toMatchObject({
      statusCode: 400,
      message: "Champ obligatoire manquant"
    })
  })
  it("renvoie 204 sans body si le compte a bien été crée", async () => {
    // GIVEN : donnés valides, service OK
    const req = {
      body: {
        nom: "DeLarue",
        prenom: "Jean-miche",
        email: "jeanjean@fr",
        num_tel: '090099',
        role: "client",
        password: "password"                
      }
    }
    const res = createMockRes()
    
    await createAuthService.mockResolvedValue(undefined)

     // WHEN
     await createAuthController(req, res)

    // THEN
     expect(res.statusCode).toBe(204)
     expect(res.send).toHaveBeenCalled()
     expect(createAuthService).toHaveBeenCalled(
      "DeLarue",
      "Jean-miche",
      "jeanjean@fr",
      '090099',
      "client",
      "password"
     )
    })
})