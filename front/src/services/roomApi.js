import { request } from "./api.js"

export function listerSalles(){
    return request("/rooms")
}