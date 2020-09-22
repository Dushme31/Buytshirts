const Product = require("../models/product")
const formidable = require("formidable")
const _  = require("lodash")
const fs = require("fs")
const product = require("../models/product")

exports.getProductById = (req,res, next,id)=>{
        Product.findById(id)
        .populate("category")
        .exec((err,product)=>{
            if(err){
                return res.status(400).json({
                    error : "Product Not found"
                })
            }
            req.product = product
            next()
        })
}

exports.createProduct=  (req,res)=>{
            
    let form = new formidable.IncomingForm()
    form.keepExtensions  = true

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            })
        }
        const {name,price,description,stock,category} =  fields
        if(!name || !price || !description || !stock || !category){
                    return res.status(400).json({
                        error:"Input all fields "
                    })
        }


        let product = new Product(fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File is too big !!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        //save in db
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({

                    error: " saving tshirt in db failed"
                })
            }
            res.json(product)
        })
    })

}
exports.getProduct = (req,res)=>{
    req.product.photo  = undefined
    return res.json(req.product)
}
exports.photo = (req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}
exports.deleteProduct = (req,res) =>{
    product = req.product
    product.remove((err,deletedProduct) =>{
        if(err){
            return res.status(400).json({
                error:"uable to remove product in db"
            })
        }
        res.json({
            message:"deleted the Product successfully",
           
        })
    })
}
exports.updateProduct  = (req,res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions  = true

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            })
        }
     //updation code
        let product = req.product
        product = _.extend(product,fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File is too big !!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        //save in db
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({

                    error: " upadtion of tshirt in db failed"
                })
            }
            res.json(product)
        })
    })

}
exports.getAllProducts = (req,res) => {
     sortBy = req.query.sortBy ? req.query.sortBy : "_id"
      limit = req.query.limit ? parseInt(req.query.limit) : 8
      Product.find()
      .select("-photo")
      .populate("category")
      .sort([[sortBy,"asc"]])
      .limit(limit)
      .exec((err,products)=>{
          if(err){
              return res.status(400).json({
                  error:"no products found"
              })
          }
          res.json(products)
      })  
}
exports.getAlluniqueCategories = (req,res)=>{
    Product.distinct("category",{},(err,categories)=>{
        if(err){
            return res.status(400).json({

                error: "No categories found"
            })
        }
        res.json(categories)
    })
}


exports.updateStock = (req,res,next)=>{
    let myOperations = req.body.order.products.map(prod =>{
        return {
            updateOne : {
                filter : {_id : prod._id},
                update : {$inc :{stock : -prod.count ,sold : +prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error:"Bulk operation failed"
            })
        }
        next();
    })
}

