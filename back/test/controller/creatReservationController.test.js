import { describe, it, expect, jest } from '@jest/globals'


// Donné de test
// Object renvoyé par défaut par le service mocké, pour ne jamais taper la vrai BDD
const CREATE_RESERVATION = {
  id: 2,
  date_reservation: '2026-12-01T19:00:00',
  places_reservation: 4,
  customer_id: null,
  staff_id: 2,
  room_id: 3,
}

// Mock des services : le mock sera configuré dans chaque test
jest.unstable_mockModule('../../services/reservationService.js', () => ({
    getAllReserv: jest.fn(),
    getReservationById: jest.fn(),
    creatReservation: jest.fn(),
    updateReservation: jest.fn(),
}))

// import Apres le mock sinon le vrai reservationService.js est chargé
const { creatReservation: creatReservationController } = await import('../../controllers/reservationController.js')

// on récupere la référence au mock pour le configurer dans chaque test 

const { creatReservationService } = await import('../../services/reservationService.js')

// 5. MOCK res

function creatMockRes() {
  const res = { statusCode: null, body: null };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (payload) => {
    res.body = payload;
    return res;
  };
  return res;
}

// TEST 

describe("Valider la création d'une reservation", () => {
    it("renvoie une 400 si l'id n'est pas valide", async () => {
        // GIVEN
        const req = { params: { id: 'deux'}, body: {}}
        const res = creatMockRes()

        // WHEN + THEN 
        await expect(creatReservationController(req, res)).rejects.toMatchObject({
            statusCode: 400,
            message: "L'indentifier de la reservation n'est pas valide !",
        })
    })

    it("renvoie une erreur 400 si le champ DATE est vide", async () => {
        // GIVEN 
        const req = {
            params: { id: '1' },
            body: {
                date_reservation: ' ',
                places_reservation: 2,
                customer_id: null,
                staff_id: null,
                room_id: 3,
            }
        }
        const res = creatMockRes()
        // WHEN + THEN 
        await expect(creatReservationController(req, res)).rejects.toMatchObject({
          statusCode: 400,
          message: 'La date est invalide'
        })
    })
    it("Renvoie une erreur 400 si le champ PLACES_RESERVATION est vide", async () => {
        // GIVEN 
        const req = {
            params: { id: '1' },
            body: {
             date_reservation: '2026-12-01T19:00:00',
             places_reservation: null,
             customer_id: null,
             staff_id: null,
             room_id: 3,
        }}
        const res = creatMockRes()

        // WHEN + THEN 
        await expect(creatReservationController(req, res)).rejects.toMatchObject({
            statusCode: 400,
            message: "Il faut choisir un nombre de personne !"
        })
    })
    it("Renvoie une erreur 400 si le champ ROOM_ID est vide", async () => {
        // GIVEN 
        const req = {
            params: { id: '1' },
            body: {
             date_reservation: '2026-12-01T19:00:00',
             places_reservation: 2,
             customer_id: null,
             staff_id: null,
             room_id: null,
        }}
        const res = creatMockRes()

        // WHEN + THEN 
        await expect(creatReservationController(req, res)).rejects.toMatchObject({
            statusCode: 400,
            message: "Il faut choisir la room !"
        })
    })
    describe('Valider que la reservation est bien été  crée', () => {
  it('succés 200 si reservation a bien été crée', async () => {
    const req = {
      params: { id: '1' },
            body: {
             date_reservation: '2026-12-01T19:00:00',
             places_reservation: 2,
             customer_id: null,
             staff_id: null,
             room_id: 2,
      },
    };
    const res = updateMockRes();

    creatReservationServiceService.mockResolvedValue(CREATE_RESERVATION);

    await creatReservationController(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(CREATE_RESERVATION);
   });    
  });
});
