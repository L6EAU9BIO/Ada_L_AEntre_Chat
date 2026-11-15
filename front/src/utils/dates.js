export function heureDe(dateTexte) {
    const heure = new Date(dateTexte).getHours()
    return `${String(heure).padStart(2, "0")}:00`
}

export function formaterDate(dateTexte) {
    return new Date(`${dateTexte}T00:00`).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}

export function aujourdhui() {
    return new Date().toISOString().slice(0,10)
}