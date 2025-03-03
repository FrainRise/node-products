const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { findEntityById } = require("../utils/findEntityById");
const { verifyUniqueProduct } = require("../utils/verifyProductsRoute");

const PRODUCTS_FILE_ROUTE = `${__dirname}/../data/products.json`;
const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE_ROUTE, "utf-8"));

const getAllProducts = (req, res) => {
  if (!Array.isArray(products)) {
    res.status(500).json({
      status: "error",
      message: "Server Error: Data Not Found",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    data: products,
  });
};
const createProduct = (req, res) => {
    verifyUniqueProduct(res, req.body.name, products);

  const newProduct = {
    ...req.body,
    id: uuidv4()
  };

  products.push(newProduct);

  fs.writeFile(PRODUCTS_FILE_ROUTE, JSON.stringify(products), (err) => {
    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  });
};
const getProduct = (req, res) => {
  const currentProduct = findEntityById(res, req.params.id, products);
  if (!currentProduct) return;

  res.status(200).json({
    status: "success",
    data: currentProduct,
  });
};
const updateProduct = (req, res) => {
  const currentProduct = findEntityById(res, req.params.id, products);
  if (!currentProduct) return;

  const newData = {
    ...currentProduct,
    ...req.body,
    id: currentProduct.id,
  }

  const updatedProducts = products.map(product => 
    product.id === currentProduct.id ? newData : product
  );

  fs.writeFile(PRODUCTS_FILE_ROUTE, JSON.stringify(updatedProducts), (err) => {
    res.status(201).json({
      status: 'success',
      data: newData,
    });
  });

}
const deleteProduct = (req, res) => {
  const currentProduct = findEntityById(res, req.params.id, products);
  if (!currentProduct) return;

  const newEntity = products.filter((product) => product.id !== currentProduct.id);

  fs.writeFile(PRODUCTS_FILE_ROUTE, JSON.stringify(newEntity), (err) => {
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};

module.exports = {
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}