import bcryct from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as loginModel from '../models/authModel.js'
import { ErrorHttp  } from '../server/erreurs.js';

const COUT_HASH = 10;

export async function inscrire({ prenom, nom, tel, email, motDePasse }) {
    const existe = await loginModel.trouverParEmail(email)
    if(existe){
        throw new ErrorHttp(409, "Un compte existe deja avec cet email")
    }
    
    const motDePasseHash = await bcryct.hash(motDePasse, COUT_HASH)
    
    try {
        return await loginModel.creat({prenom, nom, tel, email, motDePasseHash})
    } catch (error) {
        // 23505 = violation de UNIQUE : deux inscriptions au même instant
        if (error.code === "23505") {
            throw new ErrorHttp(409, "Un compte existe deja avec cet email")
        }
        throw error;
    }
}

const MESSAGE_ECHEC = "Email ou mot de passe incorrect"

export async function connecterStaff({email, motDePasse}) {
    const staff = await loginModel.trouverStaffParEmail(email)

    if (!staff || !staff.mot_de_passe_hash || staff.date_depart) {
        throw new ErrorHttp(401, MESSAGE_ECHEC)
    }

    const ok = await bcryct.compare(motDePasse, staff.mot_de_passe_hash)
    if(!ok) {
        throw new ErrorHttp(401, MESSAGE_ECHEC)
    }

    const token = jwt.sign(
        {sub: String(staff.id), role: staff.role},
        process.env.JWT_SECRET,
        {expiresIn: "8h"}
    )

    const {mot_de_passe_hash, date_depart, ...staffPublic} = staff
    return {token, staff: staffPublic}
}