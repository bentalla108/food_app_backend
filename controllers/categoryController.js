const Category = require('../models/Categories');



module.exports ={
    
    createCategory: async (req , res )=>{

const newCategory = new Category(req.body);

try{

    await newCategory.save();

     res.status(201).json({status : true , message : 'Category saved successfuly'})

}catch(error){

    res.status(500).json({status : false , message : error.message})
}

    },
    updateCategory: async (req , res )=>{


        const id = req.params.id;
        const {title , value , imageUrl} = req.body

    try{

    const updatedCategory = await Category.findByIdAndUpdate(id , {
        title:title,
        value:value,
        imageUrl:imageUrl

    } , {
        new:true
    }) ; 

    if(!updatedCategory){
        res.status(404).json({status : false , message : 'Category not found'})

    }

     res.status(201).json({status : true , message : 'Category updated successfuly'})

}catch(error){

    res.status(500).json({status : false , message : error.message})
}

    },
    deleteCategory: async (req , res )=>{

        const id = req.params.id;
try{

    const category = await Category.findByIde(id);
    if(!category){
       return  res.status(404).json({status : false , message : 'Category not found'})

    }else{
        await Category.findByIdAndDelete(id)
        res.status(200).json({status : true , message : 'Category deleted successfuly'})

    }
    

}catch(error){

    res.status(500).json({status : false , message : error.message})
}

    },
    
getCategory: async (req , res )=>{


        const id = req.params.id;
       

try{

    const category = await Category.findByIde(id);
    if(!category){
       return  res.status(404).json({status : false , message : 'Category not found'})

    }else{
        res.status(200).json(category)

    }

}catch(error){

    res.status(500).json({status : false , message : error.message})
}

    },
getAllCategory: async (req , res )=>{

try{

    const category = await Category.find({}, {'__v':0 , createdAt:0 , updatedAt :0 });
    if(!category){
       return  res.status(404).json({status : false , message : 'Category not found'})

    }
    
    res.status(200).json(category)

    

}catch(error){

    res.status(500).json({status : false , message : error.message})
}

    },

patchCategoryImage : async (req , res )=>{ // FIXME: Patch image should be editing to delete old category after making change ;
    const id = req.params.id ;
    const imageUrl = req.body; 

    try{

        const existingCategory = await Category.findById(id);

        const updatedCategory = new  Category( { imageUrl:imageUrl , 
            title : existingCategory.title,
            value : existingCategory.value

    
        } ) ; 

        await updatedCategory.save();
    
        if(!existingCategory){
            res.status(404).json({status : false , message : 'Category not found'})
    
        }
    
         res.status(201).json({status : true , message : 'Image updated successfuly'})
    
    }catch(error){
        res.status(500).json({status : false , message : error.message})

    }
}, 
getRandomCategory :async (req , res )=>{

    try{
        let categories =  await Category.aggregate([
            {
                $match :{
                    value : {$ne:'more'},
                }
            } ,
            
            {
                $sample :{size : 7 }
            }
    
        ]);
    
        const moreCategory = await Category.findOne({value : "more"} );
    
        if(moreCategory){
            categories.push(moreCategory);
        }

        res.status(200).json(categories)

    
    }catch(error){
          res.status(500).json({status : false , message : error.message})
    }

}
}
