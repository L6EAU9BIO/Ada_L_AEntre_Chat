import { describe, it , expect, jest } from '@jest/globals'

// Donné de test 
// Objet envoyé par dééfaut par le service mocké, pour ne jamais taper la vrai BDD
const UPDATE_RESERVATION = {
  id: 2,
  date_reservation: '2026-11-01T19:00:00',
  places_reservation: 2,
  customer_id: null,
  staff_id: 2,
  room_id: 1,
}

// Mock des seervices : Le mock sera ocnfigurer a chaque test
jest.unstable_mockModule('../../services/reservationService.js', () => ({
    getAllReserv: jest.fn(),
    getReservationById: jest.fn(),
    creatReservation: jest.fn(),
    updateReservation: jest.fn(),
    deleteReservation: jest.fn()
}))

// import apres le mock sinon le vrai reservationService.js  est chargé 
const { creatReservationService } = await import('../../services/reservationService.js')

// MOCK res

function updateMockRes() {
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
describe('Valider que les données à modifier sont bien récupérées', () => {
  it("renvoie une erreur 400 si l'id n'est pas valide", async () => {
    // GIVEN
    const req = { params: { id: 'deux' }, body: {} };
    const res = updateMockRes();

    // WHEN + THEN
    await expect(updateReservationController(req, res)).rejects.toMatchObject({
      statusCode: 400,
      message: "L'identifiant de la reservation n'est pas valide !",
    });
  });

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
      },
    };
    const res = updateMockRes();

    // WHEN + THEN
    await expect(updateReservationController(req, res)).rejects.toMatchObject({
      statusCode: 400,
      message: 'La date est requis ou mal renseigné!',
    });
  });

  it('renvoie une erreur 400 si le champ PLACES_RESERVATION est vide', async () => {
    // GIVEN
    const req = {
      params: { id: '1' },
            body: {
                date_reservation: '2026-12-01T19:00:00',
                places_reservation: null,
                customer_id: null,
                staff_id: null,
                room_id: 3,
      },
    };
    const res = updateMockRes();
    // WHEN + THEN
    await expect(updateReservationController(req, res)).rejects.toMatchObject({
      statusCode: 400,
      message: 'Le nombre de places est requis ou mal renseigné!',
    });
  });

  it("renvoie une erreur 400 si le champ ROOM_ID est vide", async () => {
    // GIVEN
    const req = {
       id: 2,
  date_reservation: '2026-12-01T19:00:00',
  places_reservation: 3,
  customer_id: null,
  staff_id: 2,
  room_id: null,
      }
    
    const res = updateMockRes();

    // WHEN + THEN
    await expect(updateReservationController(req, res)).rejects.toMatchObject({
      statusCode: 400,
      message: 'La room doit etre choisie !',
    });
  });

  describe('Valider que la reservation est bien été modifier', () => {
    it('succés 200 si reservation a bien été modifier', async () => {
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
  
      updateReservationService.mockResolvedValue(UPDATED_RESERVATION);
  
      await creatReservationController(req, res);
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(UPDATE_RESERVATION);
    });
  });
})
