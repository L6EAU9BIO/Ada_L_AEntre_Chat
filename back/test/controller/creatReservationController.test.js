import { describe, it, expect, jest, beforeEach } from '@jest/globals'

const CREATE_RESERVATION = {
  id: 2,
  date_reservation: '2026-12-01T19:00:00',
  places_reservation: 4,
  customer_id: null,
  staff_id: 2,
  room_id: 3,
}

// Mock du service : pas de vraie BDD
jest.unstable_mockModule('../../services/reservationService.js', () => ({
  getAllReserv: jest.fn(),
  getReservationById: jest.fn(),
  creatReservation: jest.fn(),
  updateReservation: jest.fn(),
  deleteReservation: jest.fn(),
}))

// Imports APRÈS le mock
const reservationService = await import('../../services/reservationService.js')
const { creatReservation } = await import('../../controllers/reservationController.js')
const { ErrorHttp } = await import('../../server/erreurs.js')

function creatMockRes() {
  const res = { statusCode: null, body: null }
  res.status = (code) => { res.statusCode = code; return res }
  res.json = (payload) => { res.body = payload; return res }
  return res
}

const UTILISATEUR = { id: 2 }
const VALID_BODY = {
  date_reservation: '2026-12-01T19:00:00',
  places_reservation: 4,
  customer_id: null,
  room_id: 3,
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe("creatReservation : validation des champs", () => {
  it.each([
    ['date vide', { date_reservation: ' ' }],
    ['date invalide', { date_reservation: 'pas-une-date' }],
    ['places manquantes', { places_reservation: null }],
    ['places à 0', { places_reservation: 0 }],
    ['room manquante', { room_id: null }],
  ])('appelle next avec une ErrorHttp si : %s', async (_nom, champ) => {
    const req = { body: { ...VALID_BODY, ...champ }, utilisateur: UTILISATEUR }
    const res = creatMockRes()
    const next = jest.fn()

    await creatReservation(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    const err = next.mock.calls[0][0]
    expect(err).toBeInstanceOf(ErrorHttp)
    expect(err.message).toBe('Données invalides')
    expect(reservationService.creatReservation).not.toHaveBeenCalled()
    expect(res.statusCode).toBeNull()
  })

  it('appelle next avec une ErrorHttp si req.body est undefined', async () => {
    const next = jest.fn()

    await creatReservation({ utilisateur: UTILISATEUR }, creatMockRes(), next)

    expect(next.mock.calls[0][0]).toBeInstanceOf(ErrorHttp)
  })
})

describe("creatReservation : création", () => {
  it('renvoie 201 avec la réservation créée', async () => {
    const req = { body: { ...VALID_BODY }, utilisateur: UTILISATEUR }
    const res = creatMockRes()
    const next = jest.fn()
    reservationService.creatReservation.mockResolvedValue(CREATE_RESERVATION)

    await creatReservation(req, res, next)

    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual(CREATE_RESERVATION)
    expect(next).not.toHaveBeenCalled()
  })

  it("utilise le staff_id de l'utilisateur connecté, pas celui du body", async () => {
    const req = { body: { ...VALID_BODY, staff_id: 999 }, utilisateur: UTILISATEUR }
    reservationService.creatReservation.mockResolvedValue(CREATE_RESERVATION)

    await creatReservation(req, creatMockRes(), jest.fn())

    expect(reservationService.creatReservation).toHaveBeenCalledWith({
      ...VALID_BODY,
      staff_id: 2,
    })
  })

  it("transmet à next l'erreur levée par le service", async () => {
    const res = creatMockRes()
    const next = jest.fn()
    const erreur = new Error('DB down')
    reservationService.creatReservation.mockRejectedValue(erreur)

    await creatReservation({ body: { ...VALID_BODY }, utilisateur: UTILISATEUR }, res, next)

    expect(next).toHaveBeenCalledWith(erreur)
    expect(res.statusCode).toBeNull()
  })
})