export const PLACES_PAR_TABLES = 2

export function placesBloquees(personnes){
    return Math.ceil(personnes / PLACES_PAR_TABLES) * PLACES_PAR_TABLES
}