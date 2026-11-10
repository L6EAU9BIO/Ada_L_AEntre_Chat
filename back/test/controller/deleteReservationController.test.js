import { describe, it, expect, jest } from '@jest/globals'


// Pas de valeurs par défaut pour garder de la flexibilité
// Le mock sera configuré dans chaque test

jest.unstable_mockModule('../../services/reservationService.js', () => ({
    getAllReserv: jest.fn(),
    getReservationById: jest.fn(),
    creatReservation: jest.fn(),
    updateReservation: jest.fn(),
    deleteReservation: jest.fn()

}))

// Controller : import APRES le mock, sinon le vrai reservationService.js est appelé

const { deleteReservationController } = await import('../../controllers/reservationController.js')

// Service : on récupere la réference au mock pour le configurer dans chaque test

const { deleteReservationService } = await import('../../services/reservationService.js')

// Mock res

function deleteMockRes() {
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

// TEST

describe('Valider que la reservation sont bien supprimées', () => {
  it('renvoi réponse avec status 204 si la reservation est bien supprimée', async () => {
    const req = { params: { id: 2 }, body: {} };
    const res = deleteMockRes();
    deleteReservationService.mockResolvedValue(true);
    await deleteReservationController(req, res);
    expect(res.statusCode).toBe(204);
    expect(res.send).toHaveBeenCalled();
  });
  it("renvoi erreur 400 si ID n'existe pas", async () => {
    const req = { params: { id: null }, body: {} };
    const res = deleteMockRes();

    await expect(deleteReservationController(req, res)).rejects.toMatchObject({
      statusCode: 400,
      message: "L'identifiant non valide !",
    });
  });

  it("renvoi erreur 400 si ID n'est pas un nombre", async () => {
    const req = { params: { id: 'deux' }, body: {} };
    const res = deleteMockRes();
    await expect(deleteReservationController(req, res)).rejects.toMatchObject({
      statusCode: 400,
      message: "L'identifiant non valide !",
    });
  });
  it('renvoi erreur 404 si la reservation à supprimer est introuvable', async () => {
    const req = { params: { id: 2 }, body: {} };
    const res = deleteMockRes();
    deleteReservationService.mockResolvedValue(false);
    await expect(deleteReservationController(req, res)).rejects.toMatchObject({
      statusCode: 404,
      message: 'Ressource introuvable...',
    });
  });
  it("propage l'erreur du service", async () => {
    const req = { params: { id: 2 }, body: {} };
    const res = deleteMockRes();
    deleteReservationService.mockRejectedValue(new Error('DB down'));
    await expect(deleteReservationController(req, res)).rejects.toThrow('DB down');
  });
});
