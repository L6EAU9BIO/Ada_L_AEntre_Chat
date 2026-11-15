export const PLACES_PAR_TABLES = 2


export function placesBloquees(personnes) {
    return Math.ceil(personnes / PLACES_PAR_TABLES) * PLACES_PAR_TABLES
}

export const HEURE_OUVERTURE = 10
export const HEURE_FERMETURE = 18
export const DUREE_CRENEAU = 1

export const HORAIRES = Array.from(
    {length: (HEURE_FERMETURE - HEURE_OUVERTURE) / DUREE_CRENEAU},
    (_, i) => `${String(HEURE_OUVERTURE + i * DUREE_CRENEAU).padStart(2, "0")}:00`
)