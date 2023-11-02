const User = require('../models/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');

/**
 * Fonction asynchrone pour créer un nouvel utilisateur.
 * @param {Object} req - Objet représentant la requête HTTP.
 * @param {Object} res - Objet représentant la réponse HTTP.
 */
async function createUser(req, res) {
  const user = req.body;  // Extraction de l'objet user à partir du corps de la requête HTTP

  try {
    // Tentative de récupérer un utilisateur par son email à partir de Firebase
    await admin.auth().getUserByEmail(user.email);

    // Si l'utilisateur existe, renvoyer une réponse avec le statut 400 (Bad Request)
    res.status(400).json({ message: 'Email already registered.' });

  } catch (error) {

    try {
      // Si l'erreur est que l'utilisateur n'est pas trouvé
      if (error.code === 'auth/user-not-found') {
        // Création d'un nouvel utilisateur dans Firebase
        const userResponse = await admin.auth().createUser({
          email: user.email,
          password: user.password,
          emailVerified: false,
          disabled: false
        });

        // Création d'une nouvelle instance de l'utilisateur
        // dans la base de données MongoDB à l'aide du modèle User
        const newUser = new User({
          username: user.username,
          email: user.email,
          // Chiffrement du mot de passe à l'aide de CryptoJs avant de le stocker dans la base de données
          password: CryptoJs.AES.encrypt(user.password, process.env.SECRET).toString(),
          uid: userResponse.uid,  // Utilisation de l'UID généré par Firebase
          userType: 'Client'
        });

        // Enregistrement du nouvel utilisateur dans la base de données MongoDB
        const serverResponse = await newUser.save();

        // Envoi d'une réponse avec le statut 201 (Created) et un message de succès
        const message = 'User created successfully.';
        res.status(201).json({ status: true, message });
      }
    } catch (error) {
      // En cas d'erreur lors de la création de l'utilisateur,
      // renvoyer une réponse avec le statut 500 (Internal Server Error)
      console.log(error)
      res.status(500).json({ status: false, error: 'Error creating user' });
    }
  }
}

/**
 * Fonction asynchrone pour gérer l'authentification des utilisateurs.
 * @param {Object} req - Objet représentant la requête HTTP.
 * @param {Object} res - Objet représentant la réponse HTTP.
 */
async function loginUser(req, res) {

  try {
    // Recherche de l'utilisateur dans la base de données par son adresse e-mail
    const user = await User.findOne({ email: req.body.email }, { __v: 0, createdAt: 0, updatedAt: 0 });

    // Si l'utilisateur n'est pas trouvé, renvoyer une réponse avec le statut 401
        // -  !user&& res.status(401).json('Wrong credentials');
    if (!user) {
      return res.status(401).json('Wrong credentials');
      
    }

    // Décryptage du mot de passe et comparaison avec celui fourni dans la requête
    const decryptedPassword = CryptoJs.AES.decrypt(user.password, process.env.SECRET);
    const decrypted = decryptedPassword.toString(CryptoJs.enc.Utf8);

    // Si le mot de passe ne correspond pas, renvoyer une réponse avec le statut 401
        // -  decrypted !== req.body.password && res.status(401).json('Wrong password!');
    
    if (decrypted !== req.body.password) {
      return res.status(401).json('Wrong password!');
    }

    // Création d'un jeton JWT (JSON Web Token) avec certaines informations de l'utilisateur
    const userToken = jwt.sign({
      id: user._id,
      userType: user.userType,
      email: user.email
    }, process.env.JWT_SEC,
      {
        expiresIn: "21d",
      });


    // Extraction des données utilisateur à envoyer dans la réponse
    const { password, email, ...otherUserData } = user._doc;

    // Envoi d'une réponse avec le statut 200 et les données utilisateur et le jeton
    res.status(200).json({ ...otherUserData, userToken });

  } catch (error) {
    // En cas d'erreur, renvoyer une réponse avec le statut 500 et un message d'erreur
    res.status(500).json({ status: false, message: error.message });
  }
}

// Exportation des fonctions pour les rendre disponibles pour d'autres parties de l'application
module.exports = {
  createUser,
  loginUser
};
