export class Product {
    constructor(name = '', description = '', price = '', avatarUrl = '', categoryId = '', inStock = false) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.avatarUrl = avatarUrl;
        this.categoryId = categoryId;
        this.inStock = inStock;
    }
}