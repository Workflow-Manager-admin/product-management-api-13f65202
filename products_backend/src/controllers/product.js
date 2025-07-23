const productService = require('../services/product');

/**
 * ProductController handles incoming HTTP requests for CRUD operations.
 */
class ProductController {
  // PUBLIC_INTERFACE
  async getAll(req, res, next) {
    /** Get all products */
    try {
      const products = productService.getAllProducts();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  // PUBLIC_INTERFACE
  async getOne(req, res, next) {
    /** Get a product by id */
    try {
      const product = productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  // PUBLIC_INTERFACE
  async create(req, res, next) {
    /** Create a new product */
    try {
      const product = productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      if (err.status) {
        return res.status(err.status).json({ message: err.message });
      }
      next(err);
    }
  }

  // PUBLIC_INTERFACE
  async update(req, res, next) {
    /** Update existing product */
    try {
      const updated = productService.updateProduct(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      res.json(updated);
    } catch (err) {
      if (err.status) {
        return res.status(err.status).json({ message: err.message });
      }
      next(err);
    }
  }

  // PUBLIC_INTERFACE
  async remove(req, res, next) {
    /** Delete a product */
    try {
      productService.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (err) {
      if (err.status) {
        return res.status(err.status).json({ message: err.message });
      }
      next(err);
    }
  }
}

module.exports = new ProductController();
