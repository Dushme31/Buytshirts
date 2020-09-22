const express = require("express")
const router = express.Router()
const {getUserById}= require("../controllers/user")
const {isAdmin,isAuthenticated,isSignedIn}= require("../controllers/auth")
const {getCategoryById,createCategory,getAllCategory,getCategory,updateCategory,removeCategory}= require("../controllers/category")

//params
router.param("userId", getUserById)
router.param("categoryId", getCategoryById)

// routes
//create
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory)

// read
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategory)
//update
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory)
//delete
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory)



module.exports = router