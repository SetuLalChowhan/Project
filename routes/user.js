const router = require("express").Router();

const {
    home,
    userGet,
    userPost,
    userLoginGet,
    userLoginPost,
    userDashboard,
    logOut,
    userPosttwo,
    newsFeed,
    userpostGet,
    userPostUpdate,
    userPostDelete
} = require("../controller/user");

const multer =require('multer');

const { uservalidation } = require("../middleware/schemaValidate/userValidate");

const { userSchema } = require("../schema/userSchema");


const { requireAuth, checkUser } = require("../middleware/protectRoutes/protectUserRoutes");
const { checkSeller } = require("../middleware/protectRoutes/protectSellerRoutes");
const { route } = require("./seller");
router.get("*", checkSeller);
router.get("*", checkUser);
router.get("/", home)
router.get("/userRegiistration", userGet);

const uploadFile = "./public/images/buyer";
const uploadPost = "./public/images/userPost";
const Storage = multer.diskStorage({
    destination:uploadFile,
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
        console.log(file)
    }
    
} );
const Storagetwo = multer.diskStorage({
    destination:uploadPost,
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
        console.log(file)
    }
    
} );


const upload = multer({
    storage:Storage
})
const uploadtwo = multer({
    storage:Storagetwo
})

router.post("/userRegiistration", upload.single('image'), uservalidation(userSchema), userPost);

router.get("/userLogin", userLoginGet);
router.post("/userLogin", userLoginPost);

router.get("/logOut", logOut);

router.get("/userDashboard", requireAuth, userDashboard);
router.get("/newsfeed",newsFeed );
router.post("/userDashboard",uploadtwo.single('image') ,userPosttwo);
// router.get("/userDashboard" ,userpostGet);
router.patch("/userDashboard/:id", uploadtwo.single('image'),userPostUpdate);
router.delete("/userDashboard/:id",userPostDelete);
router.get('/cart',(req,res)=>{
    res.render('cart');
})

module.exports = router;