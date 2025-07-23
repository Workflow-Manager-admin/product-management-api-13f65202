const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = process.env.PRODUCTS_FILE || path.join(__dirname, '../../data/products.json');

/**
 * File-based ProductStore for persistence between server restarts.
 */
class ProductStore {
  constructor() {
    this.products = [];
    this.filePath = PRODUCTS_FILE;
    this._initStore();
  }

  // Initialize products from file or create an empty one if missing.
  _initStore() {
    try {
      if (!fs.existsSync(this.filePath)) {
        fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
        fs.writeFileSync(this.filePath, JSON.stringify([]));
      }
      const data = fs.readFileSync(this.filePath, 'utf8');
      this.products = JSON.parse(data || '[]');
    } catch (err) {
      console.error('Error initializing product store:', err);
      this.products = [];
    }
  }

  _save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
  }

  // PUBLIC_INTERFACE
  getAll() {
    /** Returns all products */
    return this.products;
  }

  // PUBLIC_INTERFACE
  getById(id) {
    /** Finds a product by id */
    return this.products.find((p) => p.id === id);
  }

  // PUBLIC_INTERFACE
  create(product) {
    /** Creates and saves a new product with a unique ID */
    const id = String(Date.now());
    const newProduct = { ...product, id };
    this.products.push(newProduct);
    this._save();
    return newProduct;
  }

  // PUBLIC_INTERFACE
  update(id, updates) {
    /** Updates and saves an existing product */
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...updates, id }; // Don't allow id overwrite
    this._save();
    return this.products[idx];
  }

  // PUBLIC_INTERFACE
  delete(id) {
    /** Deletes and persists removal of a product by id */
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    this.products.splice(idx, 1);
    this._save();
    return true;
  }
}

module.exports = new ProductStore();
