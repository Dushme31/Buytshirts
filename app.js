require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express")
const app= express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const authRoutes = require("./routes/auth.js")
const userRoutes = require("./routes/user.js")
const categoryRoutes = require("./routes/category.js")
const productRoutes = require("./routes/product.js")
const orderRoutes = require("./routes/order.js")
const path= require('path')




//db conncetions
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("DB connected")
})

//middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//my routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);




app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//por
const port = process.env.PORT || 8000;


//starting server
app.listen(port,()=>{
    console.log(`app is runnning at ${port}`);
})