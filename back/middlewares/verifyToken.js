import jwt from 'jsonwebtoken';
import { ErrorHttp } from '../server/erreurs.js';

// À placer devant toute route réservée aux personnes connectées
export function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    throw new ErrorHttp(401, 'Connexion requise');
  }
  try {
    const contenu = jwt.verify(token, process.env.JWT_SECRET);
    req.utilisateur = { id: contenu.sub, role: contenu.role };
    next();
  } catch {
    throw new ErrorHttp(401, 'Session expirée ou invalide');
  }
}