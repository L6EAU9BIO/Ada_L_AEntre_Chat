import bcryct from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as loginModel from '../models/authModel.js'
import { ErreurHttp  } from '../server/erreurs.js';

const COUT_HASH = 10;

export async function inscrire({ prenom, nom, tel, email, motDePasse }) {
    const existe = await loginModel.trouverParEmail(email)
    if(existe){
        throw new ErreurHttp(409, "Un compte existe deja avec cet email")
    }

    const motDePasseHash = await bcryct.hash(motDePasse, COUT_HASH)

    try {
        return await loginModel.creat({prenom, nom, tel, email, motDePasseHash})
    } catch (error) {
        // 23505 = violation de UNIQUE : deux inscriptions au même instant
        if (error.code === "23503") {
            throw new ErreurHttp(409, "Un compte existe deja avec cet email")
        }
        throw error;
    }
}