const router = require("express").Router();

const {
    home,
    sellerGet,
    sellerPost,
    sellerLoginGet,
    sellerLoginPost,
    sellerDashboard,
    logOut,
    userPosttwo,
    newsFeed
} = require("../controller/sellerController");
// const {userPosttwo,newsFeed} =require('../controller/user')

const multer = require("multer");

const { sellervalidation } = require("../middleware/schemaValidate/sellerValidate");

const { sellerSchema } = require("../schema/sellerSchema");

const { requireAuth, checkSeller } = require("../middleware/protectRoutes/protectSellerRoutes");
const { checkUser } = require("../middleware/protectRoutes/protectUserRoutes");
router.get("*", checkSeller);
router.get("*", checkUser);
router.get("/", home);

router.get("/sellerRegiistration", sellerGet);

const uploadFile = "./public/images/seller";
const uploadPost = "./public/images/userPost";
const Storage = multer.diskStorage({
    destination: uploadPost,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        console.log(file);
    },
});
const Storagetwo = multer.diskStorage({
    destination: uploadPost,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        console.log(file);
    },
});

const upload = multer({
    storage: Storagetwo,
});
const uploadtwo = multer({
    storage: Storagetwo,
});

router.post("/sellerRegiistration",upload.single("image"), sellervalidation(sellerSchema), sellerPost);

router.get("/sellerLogin", sellerLoginGet);
router.post("/sellerLogin", sellerLoginPost);

router.get("/logOut", logOut);

router.get("/sellerDashboard", requireAuth, sellerDashboard);
router.get("/newsfeed",newsFeed );
router.post("/sellerDashboard",uploadtwo.single('image') ,userPosttwo);

module.exports = router,upload;
