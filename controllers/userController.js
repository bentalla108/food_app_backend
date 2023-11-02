const User = require('../models/User');

/**
 * Récupère les informations de l'utilisateur actuellement authentifié.
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 */
async function getUser(req, res) {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId, { password: 0, __v: 0, createdAt: 0, updatedAt: 0 });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
}

/**
 * Supprime l'utilisateur actuellement authentifié.
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 */
async function deleteUser(req, res) {
  const userId = req.user.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.status(200).json({
      status: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
}

/**
 * Met à jour les informations de l'utilisateur actuellement authentifié.
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 */
async function updateUser(req, res) {
  const userId = req.user.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: 'User updated successfully',
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
}

module.exports = {
  getUser,
  deleteUser,
  updateUser,
};
