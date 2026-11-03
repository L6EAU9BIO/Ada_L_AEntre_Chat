// middleware/errorHandler.js
export function errorHandler(err, req, res, next) {
  const status = err.status ?? 500;
  res.status(status).json({
    message: err.message || "Erreur interne du serveur",
    ...(err.details && { details: err.details }),
  });
}