const Restaurant = require('../models/Restaurant');





module.exports={
    addRestaurant: async(req , res)=>{
        const restaurant = new Restaurant(req.body);
        try{
            await restaurant.save();

            res.status(201).json({
                status: true , 
                message :'Restaurant created successfuly'
            })

        }catch(error){

            res.status(500).json({ status: false ,  message: 'Error creating restaurant' });
        }
    } ,
    serviceAvailabilite :  async(req , res)=>{
        const restaurantId = req.params;
        try{
            const restaurant = await Restaurant.findById(restaurantId);

            if(!restaurant){
                return res.status(404).json({
                    status : false  , 
                    message : 'Restaurant not found'
                })
            }

            restaurant.isAvailable = !restaurant.isAvailable  ; 
            await restaurant.save();
            

            res.status(200).json({
                status: true , 
                message :'Availability updated successfuly',
                isAvailable : restaurant.isAvailable
            })

        }catch(error){

            res.status(500).json({ status: false ,  message: 'Error on updating restaurant availability ' });
        }
    } ,

    deleteRestaurant: async(req , res)=>{
        const restaurantId = req.params;
        try{
            const restaurant = await Restaurant.findById(restaurantId);

            if(!restaurant){
                return res.status(404).json({
                    status : false  , 
                    message : 'Restaurant not found'
                })
            }

            await Restaurant.findByIdAndDelete(restaurantId);


            res.status(201).json({
                status: true , 
                message :'Restaurant deleted successfuly'
            })

        }catch(error){

            res.status(500).json({ status: false ,  message: 'Error deleting restaurant' });
        }
    } ,
    getRestaurant: async(req , res)=>{
        const restaurantId = req.params;
        try{
            const restaurant = await Restaurant.findById(restaurantId);

            if(!restaurant){
                return res.status(404).json({
                    status : false  , 
                    message : 'Restaurant not found'
                })
            }

            res.status(200).json({
                status: true ,
                restaurant :restaurant,
            })

        }catch(error){

            res.status(500).json({ status: false ,  message: 'Error on retrieving restaurant' });
        }
    } ,
    getRandomRestaurant : async (req , rest)=>{
        try{
            let randomRestaurant =[];
            

            
        }catch(error){}
    }
}