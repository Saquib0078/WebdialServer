import { Router } from "express";
// import { upload } from '../middlewares/multer.middleware.js';
import multer from 'multer'
import { generateRandomID } from '../utils/appHelper.js';
// import {upload} from '../middlewares/multer.middleware.js'
import { CreateBusiness } from "../controllers/business.controller.js";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './data/business' + "/");
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

router.post('/createBusiness',CreateBusiness)


// router.get('/images/:filename',getImages)


export default router;