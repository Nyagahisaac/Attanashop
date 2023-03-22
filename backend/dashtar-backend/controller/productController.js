const Products = require('../models/Product');
const Sequelize = require('sequelize');
const connectDB = require('../config/db');
const { ValidationError } = require('sequelize');

const addProduct = async (req, res) => {
  try {
    const newProduct = new Products(req.body);
    await newProduct.save();
    res.status(200).send({
      message: 'Product Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addAllProducts = async (req, res) => {
  try {
    // await Products.deleteMany();
    await Products.bulkCreate(req.body);
    ValidationError: true;
    res.status(200).send({
      message: 'Product Added successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingProducts = async (req, res) => {
  try {
    const products = await Products.find({ status: 1 }).sort({ id: id });
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getDiscountedProducts = async (req, res) => {
  try {
    const products = await Products.find({ discount: { $gt: 5 } }).sort({
      id: -1,
    });
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll({});
   
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getStockOutProducts = async (req, res) => {
  try {
    const products = await Products.find({ quantity: { $lt: 1 } }).sort({
      id: -1,
    });

    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const product = await Products.findOne({ slug: req.params.slug });
    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: `Slug problem, ${err.message}`,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Products.findByPk(req.params.id);
    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Products.findByPk(req.params.id);
    if (product) {
      product.sku = req.body.sku;
      product.title = req.body.title;
      product.slug = req.body.slug;
      product.description = req.body.description;
      product.parent = req.body.parent;
      product.brand = req.body.brand;
      product.chidren = req.body.children;
      product.unit = req.body.unit;
      product.quantity = req.body.quantity;
      product.originalprice = req.body.originalprice;
      product.price = req.body.price;
      product.discount = req.body.discount;
      product.image = req.body.image;
      product.tag = req.body.tag;
      await product.save();
      res.send({ data: product, message: 'Product updated successfully!' });
    }
    // handleProductStock(product);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const updateStatus = (req, res, next) => {
  Products.update(req.body, {
    where : { id : req.params.id}
  }).then(function(product){
  res.json({
    status: 1,
    data: product
  })
}).catch(next);
};

const deleteProduct = async (req, res) => {
  try{
  console.log(req.params, typeof(req.params.id))
  const newId = Number(req.params.id)
  console.log(newId, typeof(newId))
  const response = await Products.destroy({ where: { id: newId } })
  console.log(response)
  res.status(200).send({
    message: 'Admin Deleted Successfully!',
  });
  }
  catch(e) {
    console.log(e)
    res.status(500).send({
     message: err.message,
})
}
};



module.exports = {
  addProduct,
  addAllProducts,
  getAllProducts,
  getShowingProducts,
  getDiscountedProducts,
  getStockOutProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  updateStatus,
  deleteProduct,
};
