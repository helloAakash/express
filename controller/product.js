
const Product = require('../model/productModel')

exports.postProduct = (req, res) => {
    let product = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_quantity: req.body.product_quantity,
        product_rating: req.body.product_rating,
        category: req.body.category,
        product_description: req.body.product_description,
        product_image:req.file.path

    })
    product.save((error, products) => {
        if (error || !products) {
            return res.status(400).json({ error: "Something went wrong" })
        }
        res.json(products)
    })
}

exports.productList = (req, res) => {
    let order=req.query.order ?req.query.order :'asc'
    let sortBy=req.query.order ?req.query.sortBy :'_id'
    let limit=req.query.order ? parseInt(req.query.limit) :6
	 
 	Product.find()
     .populate('category')
    .sort([[sortBy,order]])
    .limit(limit)

 	.exec((error,products)=>{
 		if(error || !products){
 		return res.status(400).json({
 			error:'product not found'
 		});
 		}
 		
          res.json(products)
 		
 		
 	});
    
}

//product by id
exports.ProductById = (req, res, next, id) => {
    Product.findById(id).exec((error, product) => {
        if (error || !product) {
            return res.status(400).json({ error: "Product not found" })
        }
        req.product = product
        next()
    })
}

//to show single product
exports.read=(req, res)=>{
    res.json(req.product)
}

//to delete product
exports.deleteProduct=(req,res)=>{
    const product=req.product
    product.remove((error,result)=>{
        if(error || !result){
            return res.status(400).json({ error: "failed to delete product"})
        }
        res.json({messsage:"Product deleted"})
    })
}

//to update Product
exports.updateProduct=(req,res)=>{
    let product = req.product
    product.product_name = req.body.product_name,
    product.product_price = req.body.product_price,
    product.product_quantity = req.body.product_quantity,
    product.product_description = req.body.product_description,
    product.category = req.body.category

    product.save((error,result)=>{
      if(error || !result){
        return res.status(400).json({error:"failed to update"})
      }
      res.json({product})
    })
}


/**
 * it will find the products based on the req product category
 * other products that has the same category,will be returned
 */


 exports.listRelated=(req,res)=>{
    let limit=req.query.limit ? parseInt(req.query.limit):6
    
    Product.find({_id:{$ne:req.product},category:req.product.category})
    .limit(limit)
    .populate('category','category_name')
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:'Products not found'
            });
        }
      res.json(products);
    });
 
 };
 

 //filter by category and price range
 exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "product_price") {
                // gte -  greater than price [0-1000]
                // lte - less than
                findArgs[key] = {
                   
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};
