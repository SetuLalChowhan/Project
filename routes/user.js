const router = require("express").Router();

const {
    home,
    userGet,
    userPost,
    userLoginGet,
    userLoginPost,
    userDashboard,
    logOut,
} = require("../controller/user");

const multer =require('multer');

const { uservalidation } = require("../middleware/schemaValidate/userValidate");

const { userSchema } = require("../schema/userSchema");


const { requireAuth, checkUser } = require("../middleware/protectRoutes/protectUserRoutes");
const { checkSeller } = require("../middleware/protectRoutes/protectSellerRoutes");
router.get("*", checkSeller);
router.get("*", checkUser);
router.get("/", home)
router.get("/userRegiistration", userGet);

const uploadFile = "./public/images/buyer";
const Storage = multer.diskStorage({
    destination:uploadFile,
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
        console.log(file)
    }
    
} );


const upload = multer({
    storage:Storage
})

router.post("/userRegiistration", upload.single('image'), uservalidation(userSchema), userPost);

router.get("/userLogin", userLoginGet);
router.post("/userLogin", userLoginPost);

router.get("/logOut", logOut);

router.get("/userDashboard", requireAuth, userDashboard);

module.exports = router;