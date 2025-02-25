const { faker } = require("@faker-js/faker");

class ProductService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 50;
    for(let i = 0; i < limit; i++){
    this.products.push({
      id: faker.string.alphanumeric(5),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url()
    })
  }
  }

  async create(data){
    const newProduct = {
      id: faker.string.alphanumeric(5),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async findAll(){
    return this.products;
  }

  async findById(id){
    return this.products.find(item => item.id === id);
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Product not found');
    }else{
      const product = this.products[index];
      this.products[index] = {
        ...product,
        ...changes
      };
      return this.products[index];
    }
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Product not found');
    }else{
      this.products.splice(index, 1);
    }
  }
}

module.exports = ProductService;
