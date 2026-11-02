import bcryct from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as loginModel from '../models/loginModel.js'

COUT_HASH = 10;

export async function inscrire({ prenom, nom, tel, email, motDePasse }) {
    const existe = await user.touverParEmail(email)
    if(existe){
        throw new ErrorHttp(409, "Un compte existe deja avec cet email")
    }

    const motDePasseHash = await bcryct.hash(motDePasse, COUT_HASH)

    try {
        return await user.creat({prenom, nom, tel, email, motDePasseHash})
    } catch (error) {
        // 23505 = violation de UNIQUE : deux inscriptions au même instant
        if (error.code === "23503") {
            throw new ErrorHttp(409, "Un compte existe deja avec cet email")
        }
        throw error;
    }
}