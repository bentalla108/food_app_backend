const jwt = require('jsonwebtoken');

// Middleware d'authentification
const verifyToken = (req, res, next) => {
  // Récupération de l'en-tête 'Authorization' de la requête
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Extraction du jeton JWT à partir de l'en-tête 'Authorization'
    const token = authHeader.split(' ')[1];

    // Vérification du jeton JWT
    jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
      if (err) {
        // Si le jeton est invalide, renvoyer une réponse avec le statut 403
        res.status(403).json({ status: false, message: 'Invalid token' });
      }

      // Si le jeton est valide, stocker les informations de l'utilisateur dans l'objet 'req'
      req.user = user;

      // Appel à la fonction 'next()' pour passer au middleware ou à la route suivante
      next();
    });
  } else {
    // Si l'en-tête 'Authorization' n'est pas présent, renvoyer une réponse avec le statut 403
    res.status(403).json({ status: false, message: 'Authorization header is missing' });
  }
};


const verifyAndAuthorization = (req, res, next) => {
    // Utilisation du middleware de vérification du jeton
    verifyToken(req, res, () => {
      // Vérification du type d'utilisateur autorisé
      if (
        req.user.userType === 'Client' ||
        req.user.userType === 'Vendor' ||
        req.user.userType === 'Admin' ||
        req.user.userType === 'Driver'
      ) {
        // Si l'utilisateur est autorisé, appeler la fonction 'next()' pour passer au middleware ou à la route suivante
        next();
      } else {
        // Si l'utilisateur n'est pas autorisé, renvoyer une réponse avec le statut 403
        res.status(403).json({ status: false, message: 'You are not authorized' });
      }
    });
  };
const verifyVendor = (req, res, next) => {
    // Utilisation du middleware de vérification du jeton
    verifyToken(req, res, () => {
      // Vérification du type d'utilisateur autorisé
      if (
       
        req.user.userType === 'Vendor' ||
        req.user.userType === 'Admin'
       
      ) {
        // Si l'utilisateur est autorisé, appeler la fonction 'next()' pour passer au middleware ou à la route suivante
        next();
      } else {
        // Si l'utilisateur n'est pas autorisé, renvoyer une réponse avec le statut 403
        res.status(403).json({ status: false, message: 'You are not authorized' });
      }
    });
  };
const verifyDriver = (req, res, next) => {
    // Utilisation du middleware de vérification du jeton
    verifyToken(req, res, () => {
      // Vérification du type d'utilisateur autorisé
      if (
       
        req.user.userType === 'Driver' ||
        req.user.userType === 'Admin'
       
      ) {
        // Si l'utilisateur est autorisé, appeler la fonction 'next()' pour passer au middleware ou à la route suivante
        next();
      } else {
        // Si l'utilisateur n'est pas autorisé, renvoyer une réponse avec le statut 403
        res.status(403).json({ status: false, message: 'You are not authorized' });
      }
    });
  };

const verifyAdmin = (req, res, next) => {
    // Utilisation du middleware de vérification du jeton
    verifyToken(req, res, () => {
      // Vérification du type d'utilisateur autorisé
      if (
        req.user.userType === 'Admin'
       
      ) {
        // Si l'utilisateur est autorisé, appeler la fonction 'next()' pour passer au middleware ou à la route suivante
        next();
      } else {
        // Si l'utilisateur n'est pas autorisé, renvoyer une réponse avec le statut 403
        res.status(403).json({ status: false, message: 'You are not authorized' });
      }
    });
  };
  
  module.exports = verifyAndAuthorization;
  

module.exports = {verifyToken , 
    verifyAndAuthorization ,
     verifyAdmin , 
     verifyVendor ,
     verifyDriver};
