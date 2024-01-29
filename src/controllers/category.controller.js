import {category,mainCategory,subcategory,singleCategory} from '../models/category.model.js'
import path from 'path';


const CreatePost = async (req, res) => {
    try {
      const { RestrauntName, ratings, address, serviceReview, enqueries, type ,categoryType} = req.body;
       const imageFilenames=req.files;
      // Check if files were uploaded
        console.log(imageFilenames)

      if ( req.files.length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
      }
  
         const imageUrls = imageFilenames.map(file => file.originalname)
  
      // Create a new restaurant instance using the data from the request body
      const newRestaurant = new category({
        RestrauntName,
        ratings,
        address,
        serviceReview,
        enqueries,
        type,
        categoryType,
        ImageUrl:imageUrls
      });
  

      // Save the new restaurant to the database
      const savedRestaurant = await newRestaurant.save();
       
      // Respond with the saved restaurant data
      res.status(201).json(savedRestaurant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  
  // const getImages= async(req, res) => {
  //   const { filename } = req.params;
  //   res.sendFile(path.join(new URL(import.meta.url).pathname, 'uploads', filename));

  // };
  
  const CreateCategoryList = async (req, res) => {
    try {
      const { CategoryName } = req.body;
      const Image = req.file;
  
      if (!CategoryName) {
        return res.status(400).json({ error: "CategoryName is required" });
      }
  
      // Assuming you are saving only the filename to the database
  
      const category = {
        CategoryName,
        Image:Image.filename,
      };
  
      const createCategory = await mainCategory.create(category);
  
      return res.status(200).json({ status: "success", data: createCategory });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  

  const SubCategory=async(req,res)=>{
try {
  const {subCategoryName,categoryId}=req.body;
  if(!subCategoryName||!categoryId) return res.status(400).json({error:"data should not be empty"})
    console.log(categoryId)
  let category=await mainCategory.findById(categoryId)
  if(!category)return res.status(404).json({error:"No such category found"})

const subcat={
  subCategoryName,
  categoryId
}

  const createSubCategory=await subcategory.create(subcat)
  return res.status(201).json({status:"success",data:createSubCategory})

} catch (error) {
  return res.status(500).json({error:error.message})
}

  }


  const SingleImageCategory=async(req,res)=>{
try {
  const { Name, ratings, address, serviceReview, enqueries, type ,categoryType} = req.body;
  const ImageUrl=req.file;
// if(!Name|| !ratings||!address ||!serviceReview||!enqueries||!type||!categoryType||imageFilenames){
//   return res.status(400).json({error:'Data is missing'});
// }

const url=ImageUrl.filename
const newSingle = new singleCategory({
  Name,
  ratings,
  address,
  serviceReview,
  enqueries,
  type,
  categoryType,
  ImageUrl:url
});


const createSingleCat=await singleCategory.create(newSingle)
return res.status(200).json({status:"success",data:createSingleCat})

} catch (error) {
  return res.status(500).json({error:error.message})

}

  }

  

export {
    CreatePost,CreateCategoryList,SubCategory,SingleImageCategory
}