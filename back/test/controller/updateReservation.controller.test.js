import { describe, it, expect, jest, beforeEach } from '@jest/globals'

const UPDATED_RESERVATION = {
  id: 2,
  date_reservation: '2026-12-05T20:00:00',
  places_reservation: 6,
  customer_id: null,
  staff_id: 2,
  room_id: 3,
}

jest.unstable_mockModule('../../services/reservationService.js', () => ({
  getAllReserv: jest.fn(),
  getReservationById: jest.fn(),
  creatReservation: jest.fn(),
  updateReservation: jest.fn(),
  deleteReservation: jest.fn(),
}))

const reservationService = await import('../../services/reservationService.js')
const { updateReservation } = await import('../../controllers/reservationController.js')
const { ErrorHttp } = await import('../../server/erreurs.js')

function updateMockRes() {
  const res = { statusCode: null, body: null }
  res.status = (code) => { res.statusCode = code; return res }
  res.json = (payload) => { res.body = payload; return res }
  return res
}

const VALID_BODY = {
  date_reservation: '2026-12-05T20:00:00',
  places_reservation: 6,
  room_id: 3,
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('updateReservation : validation', () => {
  it.each([
    ['id absent', undefined],
    ['id non numérique', 'abc'],
    ['id à 0', '0'],
    ['id négatif', '-3'],
  ])('appelle next avec une ErrorHttp si : %s', async (_nom, id) => {
    const res = updateMockRes()
    const next = jest.fn()

    await updateReservation({ params: { id }, body: { ...VALID_BODY } }, res, next)

    expect(next.mock.calls[0][0]).toBeInstanceOf(ErrorHttp)
    expect(reservationService.updateReservation).not.toHaveBeenCalled()
    expect(res.statusCode).toBeNull()
  })

  it.each([
    ['date vide', { date_reservation: ' ' }],
    ['places manquantes', { places_reservation: null }],
    ['room manquante', { room_id: null }],
  ])('appelle next avec une ErrorHttp si le body est invalide : %s', async (_nom, champ) => {
    const res = updateMockRes()
    const next = jest.fn()

    await updateReservation({ params: { id: '2' }, body: { ...VALID_BODY, ...champ } }, res, next)

    expect(next.mock.calls[0][0]).toBeInstanceOf(ErrorHttp)
    expect(reservationService.updateReservation).not.toHaveBeenCalled()
    expect(res.statusCode).toBeNull()
  })
})

describe('updateReservation : modification', () => {
  it('renvoie 200 avec la réservation modifiée', async () => {
    const res = updateMockRes()
    const next = jest.fn()
    reservationService.updateReservation.mockResolvedValue(UPDATED_RESERVATION)

    await updateReservation({ params: { id: '2' }, body: { ...VALID_BODY } }, res, next)

    expect(reservationService.updateReservation).toHaveBeenCalledWith(2, VALID_BODY)
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(UPDATED_RESERVATION)
    expect(next).not.toHaveBeenCalled()
  })

  it('renvoie 404 si la réservation est introuvable', async () => {
    const res = updateMockRes()
    reservationService.updateReservation.mockResolvedValue(null)

    await updateReservation({ params: { id: '99' }, body: { ...VALID_BODY } }, res, jest.fn())

    expect(res.statusCode).toBe(404)
    expect(res.body).toEqual({ message: 'Reservation introuvable' })
  })

  it("transmet à next l'erreur levée par le service", async () => {
    const res = updateMockRes()
    const next = jest.fn()
    const erreur = new Error('DB down')
    reservationService.updateReservation.mockRejectedValue(erreur)

    await updateReservation({ params: { id: '2' }, body: { ...VALID_BODY } }, res, next)

    expect(next).toHaveBeenCalledWith(erreur)
    expect(res.statusCode).toBeNull()
  })
})