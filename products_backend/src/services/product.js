const store = require('../models/product');

/**
 * ProductService encapsulates business logic and validation.
 */
class ProductService {
  // PUBLIC_INTERFACE
  getAllProducts() {
    /** Get all products */
    return store.getAll();
  }

  // PUBLIC_INTERFACE
  getProductById(id) {
    /** Get product by ID */
    return store.getById(id);
  }

  // PUBLIC_INTERFACE
  createProduct(data) {
    /** Validate and create a new product */
    const { name, price, description } = data;
    if (typeof name !== 'string' || !name.trim()) {
      throw { status: 400, message: 'Product "name" is required.' };
    }
    if (typeof price !== 'number' || isNaN(price)) {
      throw { status: 400, message: 'Product "price" must be a valid number.' };
    }
    const product = {
      name: name.trim(),
      price,
      description: typeof description === 'string' ? description.trim() : '',
    };
    return store.create(product);
  }

  // PUBLIC_INTERFACE
  updateProduct(id, updates) {
    /** Validate and update an existing product */
    const existing = store.getById(id);
    if (!existing) {
      throw { status: 404, message: 'Product not found.' };
    }
    const allowed = {};
    if ('name' in updates) {
      if (typeof updates.name !== 'string' || !updates.name.trim()) {
        throw { status: 400, message: 'Product "name" is required.' };
      }
      allowed.name = updates.name.trim();
    }
    if ('price' in updates) {
      if (typeof updates.price !== 'number' || isNaN(updates.price)) {
        throw { status: 400, message: 'Product "price" must be a valid number.' };
      }
      allowed.price = updates.price;
    }
    if ('description' in updates) {
      allowed.description = typeof updates.description === 'string' ? updates.description.trim() : '';
    }
    return store.update(id, allowed);
  }

  // PUBLIC_INTERFACE
  deleteProduct(id) {
    /** Delete product by ID */
    const result = store.delete(id);
    if (!result) {
      throw { status: 404, message: 'Product not found.' };
    }
    return true;
  }
}

module.exports = new ProductService();
