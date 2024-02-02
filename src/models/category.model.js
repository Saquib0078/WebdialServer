const mongoose =require( "mongoose");
const { getIndianTime } =require ("../managers/timeManager.js");


// RestrauntName,ratings,address,timing,serviceReview,enqueries,type
const MainCategorySchema=new mongoose.Schema({

    CategoryName: {
        type: String,
        required: true,
        trim: true, 
    },
    Image: {
        type: String,
        required: true,
    },
},{
    timestamps:true
})

const SubCategorySchema=new mongoose.Schema({
    subCategoryName:{
        type: String,
        required: true,
        trim: true, 
    },
    categoryId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'MainCategory'
    }
},{
    timestamps:true
})

const categorySchemaSingle = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
            trim: true, 
        },
        ratings: {
            type: Number,
            required: true,
            trim: true, 
        },
        address: {
            type: String,
            required: true,
            trim: true, 
        },
        serviceReview: {
            type: String,
            required: true,
            trim: true, 
        },
        enqueries: {
            type: String,
            required: true,
            trim: true, 
        },
        type: {
            type: String,
            required: true,
            trim: true, 
        },
        ImageUrl: {
            type: String,
            required: true,
        },
        categoryType: {
            type: String,
            required: true,
        },
        time: {type: String, default:getIndianTime(), required: true}

    },
    {
        timestamps: true
    }
)


const categorySchema = new mongoose.Schema(
    {
        RestrauntName: {
            type: String,
            required: true,
            trim: true, 
        },
        ratings: {
            type: Number,
            required: true,
            trim: true, 
        },
        address: {
            type: String,
            required: true,
            trim: true, 
        },
        serviceReview: {
            type: String,
            required: true,
            trim: true, 
        },
        enqueries: {
            type: String,
            required: true,
            trim: true, 
        },
        type: {
            type: String,
            required: true,
            trim: true, 
        },
        ImageUrl: {
            type: [String],
           required: true,
        },
        categoryType: {
            type: mongoose.Schema.Types.ObjectId,
             ref:"subcategorylist",
        },
        time: {type: String, default:getIndianTime(), required: true}

    },
    {
        timestamps: true
    }
)


 const category = mongoose.model("Category", categorySchema)
const subcategory = new mongoose.model("subcategorylist", SubCategorySchema);
const singleCategory = new mongoose.model("subCategorySingle", categorySchemaSingle);
const categoryarray = new mongoose.model("subcategorylistarray", categorySchema);
const mainCategory = new mongoose.model("MainCategory", MainCategorySchema);


module.exports= {category,subcategory,singleCategory,categoryarray,mainCategory}
