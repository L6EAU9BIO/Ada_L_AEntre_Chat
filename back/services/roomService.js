import * as roomModel from "../models/roomModel.js"

export async function getAllRooms() {
    return roomModel.findAll()
}