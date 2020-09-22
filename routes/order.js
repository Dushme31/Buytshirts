const express = require("express")
const router = express.Router()
const {getUserById,pushOrderInPurchaseList}= require("../controllers/user")
const {isAdmin,isAuthenticated,isSignedIn}= require("../controllers/auth")
const {updateStock} = require("../controllers/product")
const {getOrderById,createOrder,getAllOrder,getOrderStatus,updateStatus} = require("../controllers/order")

//param
router.param("userId",getUserById)
router.param("orderId",getOrderById)

//
//create
router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder)

//read
router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrder)

//status of order
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus)





module.exports = router