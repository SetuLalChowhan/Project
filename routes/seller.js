const router = require("express").Router();

const {
    home,
    sellerGet,
    sellerPost,
    sellerLoginGet,
    sellerLoginPost,
    sellerDashboard,
    logOut,
} = require("../controller/sellerController");

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
const Storage = multer.diskStorage({
    destination: uploadFile,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        console.log(file);
    },
});

const upload = multer({
    storage: Storage,
});

router.post("/sellerRegiistration",upload.single("image"), sellervalidation(sellerSchema), sellerPost);

router.get("/sellerLogin", sellerLoginGet);
router.post("/sellerLogin", sellerLoginPost);

router.get("/logOut", logOut);

router.get("/sellerDashboard", requireAuth, sellerDashboard);

module.exports = router,upload;
