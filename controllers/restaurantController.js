const Restaurant = require('../models/Restaurant');

module.exports = {
    // Ajoute un nouveau restaurant
    addRestaurant: async(req , res) => {
        const restaurant = new Restaurant(req.body);
        try {
            await restaurant.save();
            // Répond avec un statut 201 et un message de succès
            res.status(201).json({ status: true , message: 'Restaurant created successfully' });
        } catch(error) {
            // En cas d'erreur, répond avec un statut 500 et un message d'erreur
            res.status(500).json({ status: false ,  message: 'Error creating restaurant' });
        }
    },

    // Met à jour la disponibilité du service d'un restaurant
    serviceAvailabilite: async(req , res) => {
        const restaurantId = req.params.id;
        try {
            const restaurant = await Restaurant.findById(restaurantId);

            if (!restaurant) {
                // Si le restaurant n'est pas trouvé, répond avec un statut 404 et un message
                return res.status(404).json({ status: false  , message: 'Restaurant not found' });
            }

            // Inverse la disponibilité du service du restaurant
            restaurant.isAvailable = !restaurant.isAvailable;
            // Enregistre les modifications dans la base de données
            await restaurant.save();

            // Répond avec un statut 200, un message de succès, et l'état de disponibilité mis à jour
            res.status(200).json({
                status: true , 
                message: 'Availability updated successfully',
                isAvailable: restaurant.isAvailable
            });
        } catch(error) {
            // En cas d'erreur, répond avec un statut 500 et un message d'erreur
            res.status(500).json({ status: false ,  message: 'Error updating restaurant availability' });
        }
    },

    // Supprime un restaurant
    deleteRestaurant: async(req , res) => {
        const restaurantId = req.params.id;
        try {
            const restaurant = await Restaurant.findById(restaurantId);

            if (!restaurant) {
                // Si le restaurant n'est pas trouvé, répond avec un statut 404 et un message
                return res.status(404).json({ status: false  , message: 'Restaurant not found' });
            }

            // Supprime le restaurant de la base de données
            await Restaurant.findByIdAndDelete(restaurantId);

            // Répond avec un statut 201 et un message de succès
            res.status(201).json({ status: true , message: 'Restaurant deleted successfully' });
        } catch(error) {
            // En cas d'erreur, répond avec un statut 500 et un message d'erreur
            res.status(500).json({ status: false ,  message: 'Error deleting restaurant' });
        }
    },

    // Récupère les détails d'un restaurant spécifique
    getRestaurant: async(req , res) => {
        const restaurantId = req.params.id;
        try {
            const restaurant = await Restaurant.findById(restaurantId);

            if (!restaurant) {
                // Si le restaurant n'est pas trouvé, répond avec un statut 404 et un message
                return res.status(404).json({ status: false  , message: 'Restaurant not found' });
            }

            // Répond avec un statut 200 et les détails du restaurant
            res.status(200).json({
                status: true ,
                restaurant: restaurant,
            });
        } catch(error) {
            // En cas d'erreur, répond avec un statut 500 et un message d'erreur
            res.status(500).json({ status: false ,  message: 'Error on retrieving restaurant' });
        }
    },

    // Sélectionne aléatoirement des restaurants
    getRandomRestaurant: async (req, res) => {
        try {
            let randomRestaurants = []; 
    
            if (req.params.code) {

                // Sélectionne aléatoirement jusqu'à 5 restaurants ayant le code spécifié
                randomRestaurants = await Restaurant.aggregate([
                    {
                        $match: {
                            code: req.params.code
                        }
                    },
                    {
                        $sample: { size: 5 }
                    },
                    {
                        $project: { __v: 0 }
                    }
                ]);
            }

            if (!randomRestaurants.length) {
                // Si aucun restaurant n'est sélectionné, choisit aléatoirement jusqu'à 5 restaurants
                randomRestaurants = await Restaurant.aggregate([
                    {
                        $sample: { size: 5 }
                    },
                    {
                        $project: { __v: 0 }
                    }
                ]);
            }

            if (randomRestaurants.length) {
                // Répond avec un statut 200 et les restaurants sélectionnés
                return res.status(200).json(randomRestaurants);
            }
    
        } catch (error) {
            // En cas d'erreur, répond avec un statut 500 et un message d'erreur
            return res.status(500).json({ status: false , error: 'Error on retrieving restaurant' });
        }
    }
};
