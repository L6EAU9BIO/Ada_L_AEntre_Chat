import { describe, it, expect, jest } from '@jest/globals';
 
// Donnée simulée par défaut, pour représenter une vraie réservation
const DEFAULT_RESERVATION = {
  id: 2,
  date_reservation: '2026-12-01T19:00:00',
  places_reservation: 4,
  customer_id: null,
  staff_id: 2,
  room_id: 3,
};
 
// Interrupteurs : font échouer le service pour UN SEUL test
let mockErrorGetReservation = false;
let mockErrorGetReservationById = false;
 
// Capture de l'id reçu par le service
let receivedReservationId = null;
 
// 1 - MOCK DU SERVICE
//  Les noms exportés ici doivent être IDENTIQUES à ceux que ton controller importe
jest.unstable_mockModule('../back/services/reservationService.js', () => ({
  getReservation: async () => {
    if (mockErrorGetReservation) {
      mockErrorGetReservation = false;
      throw new Error('Erreur DB simulée');
    }
    return [DEFAULT_RESERVATION];
  },
  getReservationById: async (id) => {
    receivedReservationId = id;
    if (mockErrorGetReservationById) {
      mockErrorGetReservationById = false;
      throw new Error('Erreur DB simulée');
    }
    return DEFAULT_RESERVATION; // un seul objet, pas un tableau
  },
  createReservation: async () => undefined, 
  updateReservation: async () => undefined,
  deleteReservation: async () => undefined,
}));
 
// 2 - IMPORT DYNAMIQUE, après le mock
const { getReservationController, getReservationByIdController } =
  await import('../back/controllers/reservationControllers.js');
 
// 3 - FAUSSE RESPONSE
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
  return res;
}
 
// 4 - TESTS
 
describe('getReservationController : Vérification de la récupération de toutes les réservations', () => {
  it('Vérifier que les réservations sont bien récupérées', async () => {
    // GIVEN
    const req = {};
    const res = createMockRes();
 
    // WHEN
    await getReservationController(req, res);
 
    // THEN
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });
 
  it("Vérifier que si le service échoue, l'erreur remonte", async () => {
    // GIVEN
    const req = {};
    const res = createMockRes();
    mockErrorGetReservation = true;
 
    // WHEN / THEN
    await expect(getReservationController(req, res)).rejects.toThrow(
      'Erreur DB simulée'
    );
  });
});
 
describe("getReservationByIdController : Vérification de la récupération d'une réservation par id", () => {
  it("Vérifier que si l'id est manquant, l'erreur AppError 400 est levée", async () => {
    // GIVEN
    const req = { params: {} };
    const res = createMockRes();
 
    // WHEN / THEN
    await expect(getReservationByIdController(req, res)).rejects.toMatchObject({
      statusCode: 400,
    });
  });
 
  it("Vérifier que si l'id n'est pas un nombre, l'erreur AppError 400 est levée", async () => {
    // GIVEN
    const req = { params: { id: 'abc' } };
    const res = createMockRes();
 
    // WHEN / THEN
    await expect(getReservationByIdController(req, res)).rejects.toMatchObject({
      statusCode: 400,
    });
  });
 
  it("Vérifier que si l'id est valide, ça retourne bien 200", async () => {
    // GIVEN : l'id est une string dans l'URL
    const req = { params: { id: '2' } };
    const res = createMockRes();
 
    // WHEN
    await getReservationByIdController(req, res);
 
    // THEN
    expect(res.statusCode).toBe(200);
    expect(receivedReservationId).toBe(2); // converti en number par le controller
  });
 
  it("Vérifier que si le service échoue, l'erreur remonte", async () => {
    // GIVEN
    const req = { params: { id: '2' } };
    const res = createMockRes();
    mockErrorGetReservationById = true;
 
    // WHEN / THEN
    await expect(getReservationByIdController(req, res)).rejects.toThrow(
      'Erreur DB simulée'
    );
  });
});
 

