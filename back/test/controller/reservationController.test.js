import { describe, it, expect, jest, beforeEach } from '@jest/globals'

const DEFAULT_RESERVATION = {
  id: 2,
  date_reservation: '2026-12-01T19:00:00',
  places_reservation: 4,
  customer_id: null,
  staff_id: 2,
  room_id: 3,
}

// Mock du service : les noms doivent être IDENTIQUES à ceux du service réel
jest.unstable_mockModule('../../services/reservationService.js', () => ({
  getAllReserv: jest.fn(),
  getReservationById: jest.fn(),
  creatReservation: jest.fn(),
  updateReservation: jest.fn(),
  deleteReservation: jest.fn(),
}))

// Imports APRÈS le mock
const reservationService = await import('../../services/reservationService.js')
const { getReservation, getReservationById } = await import('../../controllers/reservationController.js')
const { ErrorHttp } = await import('../../server/erreurs.js')

function createMockRes() {
  const res = { statusCode: null, body: null }
  res.status = (code) => { res.statusCode = code; return res }
  res.json = (payload) => { res.body = payload; return res }
  return res
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getReservation : récupération de toutes les réservations', () => {
  it('renvoie 200 avec la liste des réservations', async () => {
    const req = { query: {} }
    const res = createMockRes()
    const next = jest.fn()
    reservationService.getAllReserv.mockResolvedValue([DEFAULT_RESERVATION])

    await getReservation(req, res, next)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([DEFAULT_RESERVATION])
    expect(next).not.toHaveBeenCalled()
  })

  it('transmet les filtres room_id et date au service', async () => {
    const req = { query: { room_id: '3', date: '2026-12-01' } }
    reservationService.getAllReserv.mockResolvedValue([])

    await getReservation(req, createMockRes(), jest.fn())

    expect(reservationService.getAllReserv).toHaveBeenCalledWith('3', '2026-12-01')
  })

  it("transmet à next l'erreur levée par le service", async () => {
    const res = createMockRes()
    const next = jest.fn()
    const erreur = new Error('Erreur DB simulée')
    reservationService.getAllReserv.mockRejectedValue(erreur)

    await getReservation({ query: {} }, res, next)

    expect(next).toHaveBeenCalledWith(erreur)
    expect(res.statusCode).toBeNull()
  })
})

describe('getReservationById : récupération par id', () => {
  it.each([
    ['id absent', undefined],
    ['id null', null],
    ['id non numérique', 'abc'],
    ['id à 0', '0'],
    ['id négatif', '-3'],
    ['id décimal', '1.5'],
  ])('appelle next avec une ErrorHttp si : %s', async (_nom, id) => {
    const req = { params: { id } }
    const res = createMockRes()
    const next = jest.fn()

    await getReservationById(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(ErrorHttp)
    expect(reservationService.getReservationById).not.toHaveBeenCalled()
    expect(res.statusCode).toBeNull()
  })

  it("renvoie 200 et appelle le service avec l'id converti en nombre", async () => {
    const req = { params: { id: '2' } }
    const res = createMockRes()
    const next = jest.fn()
    reservationService.getReservationById.mockResolvedValue(DEFAULT_RESERVATION)

    await getReservationById(req, res, next)

    expect(reservationService.getReservationById).toHaveBeenCalledWith(2)
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(DEFAULT_RESERVATION)
    expect(next).not.toHaveBeenCalled()
  })

  it('renvoie 404 si la réservation est introuvable', async () => {
    const req = { params: { id: '99' } }
    const res = createMockRes()
    const next = jest.fn()
    reservationService.getReservationById.mockResolvedValue(null)

    await getReservationById(req, res, next)

    expect(res.statusCode).toBe(404)
    expect(res.body).toEqual({ message: 'Reservation introuvable' })
    expect(next).not.toHaveBeenCalled()
  })

  it("transmet à next l'erreur levée par le service", async () => {
    const res = createMockRes()
    const next = jest.fn()
    const erreur = new Error('Erreur DB simulée')
    reservationService.getReservationById.mockRejectedValue(erreur)

    await getReservationById({ params: { id: '2' } }, res, next)

    expect(next).toHaveBeenCalledWith(erreur)
    expect(res.statusCode).toBeNull()
  })
})