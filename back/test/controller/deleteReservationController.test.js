import { describe, it, expect, jest, beforeEach } from '@jest/globals'

// Mock du service : le comportement est configuré dans chaque test
jest.unstable_mockModule('../../services/reservationService.js', () => ({
  getAllReserv: jest.fn(),
  getReservationById: jest.fn(),
  creatReservation: jest.fn(),
  updateReservation: jest.fn(),
  deleteReservation: jest.fn(),
}))

// Imports APRÈS le mock
const reservationService = await import('../../services/reservationService.js')
const { deleteReservation } = await import('../../controllers/reservationController.js')
const { ErrorHttp } = await import('../../server/erreurs.js')

function deleteMockRes() {
  const res = { statusCode: null, body: null }
  res.status = (code) => { res.statusCode = code; return res }
  res.json = (payload) => { res.body = payload; return res }
  res.send = jest.fn(() => res)
  return res
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('deleteReservation : validation de l\'id', () => {
  it.each([
    ['id null', null],
    ['id absent', undefined],
    ['id non numérique', 'deux'],
    ['id à 0', '0'],
    ['id négatif', '-3'],
    ['id décimal', '1.5'],
  ])('appelle next avec une ErrorHttp si : %s', async (_nom, id) => {
    const req = { params: { id } }
    const res = deleteMockRes()
    const next = jest.fn()

    await deleteReservation(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(ErrorHttp)
    expect(reservationService.deleteReservation).not.toHaveBeenCalled()
    expect(res.statusCode).toBeNull()
  })
})

describe('deleteReservation : suppression', () => {
  it('renvoie 204 si la réservation est supprimée', async () => {
    const req = { params: { id: '2' } }
    const res = deleteMockRes()
    const next = jest.fn()
    reservationService.deleteReservation.mockResolvedValue(true)

    await deleteReservation(req, res, next)

    // l'id est converti en nombre avant l'appel au service
    expect(reservationService.deleteReservation).toHaveBeenCalledWith(2)
    expect(res.statusCode).toBe(204)
    expect(res.send).toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
  })

  it('renvoie 404 si la réservation à supprimer est introuvable', async () => {
    const req = { params: { id: '2' } }
    const res = deleteMockRes()
    const next = jest.fn()
    reservationService.deleteReservation.mockResolvedValue(false)

    await deleteReservation(req, res, next)

    expect(res.statusCode).toBe(404)
    expect(res.body).toEqual({ message: 'Reservation introuvable' })
    expect(next).not.toHaveBeenCalled()
  })

  it("transmet à next l'erreur levée par le service", async () => {
    const req = { params: { id: '2' } }
    const res = deleteMockRes()
    const next = jest.fn()
    const erreur = new Error('DB down')
    reservationService.deleteReservation.mockRejectedValue(erreur)

    await deleteReservation(req, res, next)

    expect(next).toHaveBeenCalledWith(erreur)
    expect(res.statusCode).toBeNull()
  })
})