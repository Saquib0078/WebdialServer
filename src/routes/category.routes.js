const{CreateCategoryList, CreatePost,SingleImageCategory,SubCategory,getCategory,getBroadcastMedia,getSubCategory
,getData,getBottomSheetCategory,getCategoryRec,Travel} =require( '../controllers/category.controller.js')
const { Router } =require( "express");
// const { upload } =require( '../middlewares/multer.middleware.js';
const multer =require( 'multer')
const { generateRandomID } =require('../utils/appHelper.js');
const { categoryPath } = require('../managers/fileManager.js');
// const {upload} =require( '../middlewares/multer.middleware.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, categoryPath + "/");
  }, filename: (req, file, cb) => {
      let tempFilename = file.originalname;
      let id = generateRandomID();
      let type = tempFilename.substring(tempFilename.lastIndexOf(".") + 1);
      let filename = id + "." + type;
      req.body.id = id;
      req.body.type = type;
      req.body.filename = filename;
      cb(null, filename);

  },
});
const upload = multer({storage: storage});

const router = Router()



router.post("/upload-category",upload.array('ImageUrl',3),CreatePost)
router.post('/upload-categorylist',upload.single('Image'),CreateCategoryList)

router.post("/upload-Singlecategory",upload.single('ImageUrl'),SingleImageCategory)
router.post("/upload-SubCategory",SubCategory);
router.get("/get-maincategory",getCategory);
router.get("/getSubCategory/:categoryId",getSubCategory);

router.get('/category-data/:id',getData)
router.get("/getBroadcastMedia/:broadcastMediaID", getBroadcastMedia);
router.get('/getBottomSheetCategory',getBottomSheetCategory)
router.get('/getCategoryRec',getCategoryRec)
router.get('/Travel',Travel)



// router.get('/images/:filename',getImages)


module.exports=  router;