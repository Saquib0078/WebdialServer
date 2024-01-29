import { business } from "../models/business.model.js";
import { ResponseUtility } from "../utils/ApiError.js";

const CreateBusiness= async(req,res)=>{

try {
   const {BusinessName,Pincode,BuildingName,Colony,Area,Landmark,City,State,owner}=req.body

   let BusinessData = new business({
    BusinessName,
    Pincode,
    BuildingName,
    Colony,
    Area,
    Landmark,
    City,
    State,
    owner

   })

   const Create=await business.create(BusinessData)
   return ResponseUtility.successResponse(res, Create);

} catch (error) {
    return ResponseUtility.errorResponse(res,error)
}

}


const UpdateBusiness = async (req, res) => {
    try {
      const { businessId } = req.params;
      const updateData = req.body;
  
      const updatedBusiness = await business.findByIdAndUpdate(
        businessId,
        updateData,
        { new: true }
      );
  
      if (!updatedBusiness) {
        return ResponseUtility.errorResponse(res, 'Business not found', 404);
      }
  
      return ResponseUtility.successResponse(res, updatedBusiness);
    } catch (error) {
      return ResponseUtility.errorResponse(res, error);
    }
  };

  const DeleteBusiness = async (req, res) => {
    try {
      const { businessId } = req.params;
  
      const deletedBusiness = await business.findByIdAndDelete(businessId);
  
      if (!deletedBusiness) {
        return ResponseUtility.errorResponse(res, 'Business not found', 404);
      }
  
      return ResponseUtility.successResponse(
        res,
        'Business deleted successfully'
      );
    } catch (error) {
      return ResponseUtility.errorResponse(res, error);
    }
  };
  const GetBusiness = async (req, res) => {
    try {
      const { businessId } = req.params;
  
      const retrievedBusiness = await business.findById(businessId);
  
      if (!retrievedBusiness) {
        return ResponseUtility.errorResponse(res, 'Business not found', 404);
      }
  
      return ResponseUtility.successResponse(res, retrievedBusiness);
    } catch (error) {
      return ResponseUtility.errorResponse(res, error);
    }
  };
    


export{CreateBusiness,DeleteBusiness,UpdateBusiness,GetBusiness}