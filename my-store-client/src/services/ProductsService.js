export default class ProductService {
    constructor() {
      this.apiUrl = "http://localhost:1616/products";
    }
  
    async get() {
      try {
        const response = await fetch(this.apiUrl);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    }
  
    async getById(id) {
      try {
        const response = await fetch(`${this.apiUrl}/${id}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
      }
    }
  
    async post(id, product) {
      try {
        const response = await fetch(`${this.apiUrl}/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error creating product with ID ${id}:`, error);
        throw error;
      }
    }
  
    async delete(id) {
      try {
        const response = await fetch(`${this.apiUrl}/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error deleting product with ID ${id}:`, error);
        throw error;
      }
    }
  }