const express = require("express")
const router = express.Router()
const {getUserById}= require("../controllers/user")
const {isAdmin,isAuthenticated,isSignedIn}= require("../controllers/auth")
const {getProductById,createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProducts,getAlluniqueCategories} = require("../controllers/product")
//params

router.param("userId", getUserById)
router.param("productId", getProductById)
//create
router.post("/product/create/:userId", createProduct)
//read
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)

//update
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)


//delete
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)

//listing
router.get("/products",getAllProducts)

router.get("/products/categories",getAlluniqueCategories)
module.exports = router