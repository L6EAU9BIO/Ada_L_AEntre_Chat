import * as loginService from "../services/authService.js"
import { ErrorHttp } from "../server/erreurs.js";

// Validation : valider les champs ( retourne un objet d'erreur vide si tout est OK)
const EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9-]*\.)+[a-z]{2,}$/;

  function validerInscription({prenom}) {
    const error = {}
    if(typeof prenom !== "string" || prenom.trim() === "") {
        error.prenom = "Le prénom est obligatoire"
    }
    return error;
  };

  const normEmail = (email) => email.trim().toLowerCase()

// Inscription 
export async function inscription(req, res, next) {
   try{ 
    const body = req.body ?? {}
    const error = validerInscription(body)
    if (Object.keys(error).length > 0) {
        throw new ErrorHttp(422, "Données invalides", error)
    }

    const user = await loginService.inscrire({
        nom: body.nom.trim(),
        prenom: body.prenom.trim(),
        email: normEmail(body.email),
        tel: body.tel.trim(),
        motDePasse: body.motDePasse
    });
    res.status(201).json({ message: "Compte crée avec suscès", user })
} catch(error) {
      next(error)
}
}

const DUREE_SESSION = 8 * 60 * 60 * 1000

export async function connexion(req,res, next) {
    try {
        const {email, motDePasse} = req.body ?? {}

        if(typeof email !== "string" || typeof motDePasse !== "string" || !email.trim() || !motDePasse) {
            throw new ErrorHttp(422, "Email et mot de passe obligatoires")
        }

        const { token, staff } = await loginService.connecterStaff({
            email: normEmail(email),
            motDePasse
        })

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: DUREE_SESSION
        })
        res.json({ staff })
    } catch (error) {
        next(error)
    }
    
}