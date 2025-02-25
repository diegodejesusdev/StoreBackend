const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');

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
      image: faker.image.url(),
      isBlock: faker.datatype.boolean()
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
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound('Product not found');
    }else if(product.isBlock){
      throw boom.conflict('Product is blocked');
    }else{
      return product;
    }
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }else if(this.products[index].isBlock){
      throw boom.conflict('Product is blocked');
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
      throw boom.notFound('Product not found');
    }else{
      this.products.splice(index, 1);
    }
  }
}

module.exports = ProductService;
