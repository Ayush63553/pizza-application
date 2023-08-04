// containing the logic for fetching,adding,sorting,searching,deletion, updation
/* It talk to network layer to bringing the JSON,
   and convert JSON into Objects vice-versa
*/

import makeNetworkCall from "../services/api-client.js"
import Product from "../models/product.js";

const productOperations = {
    products: [],
    // carts:[],
    getProductsInCart() {
        const productInBasket = this.products.filter(product => product.isAddedInCart);
        return productInBasket;
    },
    // addToCart(product){
    //     this.carts.push(product)
    // },
    removeProductsInCart() {
        const productInBasket = this.products.filter(product => !product.isAddedInCart);
        return productInBasket;
    },
    // removeFromCart(product){
    //     this.carts=this.carts.filter(pizza=>pizza.id!=product.id)
    // },
   

    searchProducts(pizzaId) {
        const searched = this.products.find(currentproducts => currentproducts.id == pizzaId);
        console.log('product found', searched);
        // searched.isAddedInCart = true;
        console.log("Array", this.products)
        return searched;
    },
    async loadProducts() {
        const pizzas = await makeNetworkCall();
        const pizzaArray = pizzas['Vegetarian'];
        const productsArray = pizzaArray.map(pizza => {
            const currentPizza = new Product(pizza.id,
                pizza.name,
                pizza.menu_description,
                pizza.price,
                pizza.assets.product_details_page[0].url
            );
            return currentPizza;
        })
        console.log("Product Array ", productsArray);
        this.products = productsArray;
        return productsArray; //Wrap in Promise
    },
    sortProducts() {

    },

    
}
export default productOperations;