import * as loginService from "../services/loginService.js"


// Validation : valider les champs 
const EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9-]*\.)+[a-z]{2,}$/;

  function validerInscription({prenom}) {
    const error = {}
    if(typeof prenom !== "string" || prenom.trim() === "") {
        error.prenom = "Le prénom est obligatoire"
    }
  };

  const normEmail = (email) => email.trim().toLowerCase()

// Inscription 
export async function inscription(req, res) {
    const body = req.body ?? {}
    const error = validerInscription(body)
    if (Object.keys(error).length > 0) {
        throw new ErrorHttp(422, "Données invalides", error)
    }

    const user = await loginService.inscrire({
        nom: body.nom.trim(),
        prenom: body.prenom.trim(),
        email: normEmail(body.email),
        tel: body.tel,
        motDePasse: body.motDePasse
    })
}