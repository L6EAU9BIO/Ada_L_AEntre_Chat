const API_URL = "http://localhost:3000/api"

export async function request(path, otpions = {} ){
    const response = await fetch(`${API_URL}${path}`, {
        credentials: "include",
        headers: {"Content-Type": "application/json"}, ...otpions,
    })

    if(response.status ===204) return null

    const data = await response.json()
    
    if(!response.ok) {
        throw new Error(data.message || "Erreur serveur")
    }
    return data 
}