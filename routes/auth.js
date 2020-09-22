var express = require('express')
var router = express.Router()
const { check } = require('express-validator');
const {signout,signup,signin,isSignedIn} = require("../controllers/auth")


router.post("/signup",[
    check("name","should be min 3 char").isLength({min : 3}),
    check("email","mail required").isEmail(),
    check("password","should be min 3 char").isLength({min : 3})
],signup)
router.post("/signin",[
    check("name","should be min 3 char").isLength({min : 3}),
    check("email","mail required").isEmail(),
    check("password","should be min 3 char").isLength({min : 3})
],signin)
router.get("/signout",signout)

router.get("/testroute",isSignedIn,(req,res)=>{
    res.json(req.auth)
})


module.exports = router;