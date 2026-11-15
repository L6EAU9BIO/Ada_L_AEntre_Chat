import * as loginService from "../services/authService.js"
import { ErrorHttp } from "../server/erreurs.js";

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

/**
 * @openapi
 * /api/auth/inscription:
 *   post:
 *     summary: Créer un compte
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/InscriptionInput' }
 *     responses:
 *       201:
 *         description: Compte créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Compte crée avec suscès }
 *                 user: { $ref: '#/components/schemas/Utilisateur' }
 *       422: { description: Données invalides }
 */
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
const OPTIONS_COOKIE = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
}

/**
 * @openapi
 * /api/auth/connexion:
 *   post:
 *     summary: Se connecter
 *     description: Pose un cookie httpOnly "token" valable 8 heures.
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ConnexionInput' }
 *     responses:
 *       200:
 *         description: Connexion réussie
 *             description: Cookie de session "token"
 *             schema: { type: string }
 *              properties:
 *                 staff: { $ref: '#/components/schemas/Utilisateur' }
 *       401: { description: Identifiants invalides }
 *       422: { description: Email ou mot de passe manquant }
 */
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
            ...OPTIONS_COOKIE,
            maxAge: DUREE_SESSION
        })
        res.json({ staff })
    } catch (error) {
        next(error)
    }    
}

/**
 * @openapi
 * /api/auth/deconnexion:
 *   post:
 *     summary: Se déconnecter
 *     description: Supprime le cookie "token".
 *     tags: [Authentification]
 *     responses:
 *       204: { description: Déconnecté (pas de contenu) }
 */
export function deconnexion(req,res){
    res.clearCookie("token", OPTIONS_COOKIE)
    res.status(204).end()
}

/**
 * @openapi
 * /api/auth/moi:
 *   get:
 *     summary: Récupérer l'utilisateur connecté
 *     tags: [Authentification]
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       200:
 *         description: Utilisateur connecté
 *                 utilisateur: { $ref: '#/components/schemas/Utilisateur' }
 *       401: { description: Non authentifié }
 */
export function moi(req,res){
    res.json({utilisateur: req.utilisateur})
}