// Product Controller - It is a glue between View and Model
// Controller- I/O View Layer
// Data Exchange B/w View and Model

// window.addEventListener(
//     'load',bindevents()
// )
// function bindevents(){
//     document.getElementById("clickme").addEventListener(
//         "click",
//         () => {
//             alert("hello")
//         }
//     )
// }

import productOperations from "../services/product-operations.js"

async function loadPizzas() {
    const pizza = await productOperations.loadProducts();
    console.log("Pizzas are-", pizza);

    // const rowdiv = document.getElementById('loaddata')


    // pizza[0].url="https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/awesome-american-cheesy.17f198e5a73db40c367ddfe96da54a4c.1.jpg?width=251"
    // pizza[1].url="https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/momo-mia-non-veg.bfd96b4a31f0246703333a3feac75f4c.1.jpg?width=251"
    // pizza[2].url="https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/mexican-fiesta.559a1961ca021b8fb90367c6918e50f1.1.jpg?width=251"
    for (let i of pizza) {
        preparePizzaCard(i);
    }
    // prepareCart()
}
loadPizzas();
// let pizzalen = pizza.length;

// for (let index = 0; index < pizzalen; index++) {
//     const col= document.createElement('div');
//     col.classList.add('col-4');
//     col.innerHTML=`
//     <div class="card" style="width: 15rem;">
//     <img src="${pizza[index].url}" class="card-img-top" alt="...">
//     <div class="card-body">
//         <h5 class="card-title">${pizza[index].name}</h5>
//         <p class="card-text">${pizza[index].desc}</p>
//         <a href="#" class="btn btn-primary">add for ${pizza[pizza.indexOf(element)].price}$</a>
//     </div>
// </div>`;
// rowdiv.appendChild(col);
// }

// pizza.forEach(element=>{
//     const col = document.createElement('div');
//     col.classList.add('col-4');
//     col.innerHTML = `
//     <div class="card" style="width: 15rem;">
//     <img src="${pizza[pizza.indexOf(element)].url}" class="card-img-top" alt="...">
//     <div class="card-body">
//         <h5 class="card-title">${pizza[pizza.indexOf(element)].name}</h5>
//         <p class="card-text">${pizza[pizza.indexOf(element)].desc}</p>
//         <a href="#" class="btn btn-primary">add for ${pizza[pizza.indexOf(element)].price}$</a>
//     </div>
// </div>`
//     rowdiv.appendChild(col);
// });

// pizza.map(element=>{
//     const col = document.createElement('div');
//     col.classList.add('col-4');
//     col.innerHTML = `
//     <div class="card" style="width: 15rem;">
//     <img src="${pizza[pizza.indexOf(element)].url}" class="card-img-top" alt="...">
//     <div class="card-body">
//         <h5 class="card-title">${pizza[pizza.indexOf(element)].name}</h5>
//         <p class="card-text">${pizza[pizza.indexOf(element)].desc}</p>
//         <a href="#" class="btn btn-primary">add for ${pizza[pizza.indexOf(element)].price}$</a>
//     </div>
// </div>`
//     rowdiv.appendChild(col);
// });

function addpizzaToCart(){
    console.log('Current Button Clicked',this);
    const currentButton=this;
    const pizzaId=this.getAttribute('product-id');
    console.log('Current Button Clicked',pizzaId);
    const pizza=productOperations.searchProducts(pizzaId);
    console.log("Pizza",pizza);
    pizza.isAddedInCart=!pizza.isAddedInCart;
    if(pizza.isAddedInCart){
        this.className='btn btn-danger';
        this.innerText='Remove from Cart';
        productOperations.getProductsInCart();
    }
    else{
        this.className='btn btn-primary';
        this.innerText='Add in Cart';
        productOperations.removeProductsInCart();
    }
    printBasket();
};

function printBasket() {
    const cartProducts= productOperations.getProductsInCart();
    const basket = document.querySelector('#basket')
    basket.innerHTML='';
    for (let product of cartProducts){
        const li=document.createElement('li')
        li.innerText=`${product.name} ${product.price}`
        li.className="alert alert-light"
        li.style="width:20rem"
        basket.appendChild(li);
    }    
    const Total=document.createElement('div')
    Total.innerText=`Taxes=${getTotal().gst}
    Total=${getTotal().Total}`
    basket.appendChild(Total)
}
function getTotal() {
    const Items= productOperations.getProductsInCart();
    const Total= Items.reduce((sum,item)=>{return sum+item.price},0);
    const gst=Total*0.18
    // Total=Total+gst;

    return {Total,gst};
}

function preparePizzaCard(pizza) {
    const outputDiv = document.querySelector('#loaddata');
    const colDiv = document.createElement('div');
    colDiv.className = 'col-4';
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card'
    cardDiv.style = "width:15rem;"
    colDiv.appendChild(cardDiv);
    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = 'card-img-top';
    cardDiv.appendChild(img);
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDiv.appendChild(cardBody);
    const h5 = document.createElement('h5');
    h5.className = 'card-title'
    h5.innerText = pizza.name;
    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerText = pizza.desc;
    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.setAttribute('product-id',pizza.id);
    button.addEventListener('click',addpizzaToCart);//Event Bind
    // button.innerText = "Add for:" + pizza.price + "$->";
    button.innerText = "Add in Cart";
    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    cardBody.appendChild(button);
    outputDiv.appendChild(colDiv);
}



/* <div class="col-4 border border-1">
                <h3 class="alert alert-info">Total Bill</h3>
                <div class="card " style="width: 22rem;">
                    Pizza 1
                    Pizza 2
                    Pizza 3
                </div>
                <div class="card" style="width: 22rem;">
                    Total Pizza:3<span></span>
                    pizza amount:<span>12000</span>
                    gst:<span>107.71</span>
                </div>
                <div class="card alert alert-success" style="width: 22rem;">
                    Total amount:12107.7
                </div>
                <button id= "clickme" class="btn btn-dark w-100 mt-2">Checkout Rs.12107.71</button>
            </div> */


// function prepareCart(pizza) {
//     const outputDiv = document.querySelector('#dataload');
//     const colDiv = document.createElement('div');
//     colDiv.className = 'col-4';
//     const h3 = document.createElement('h3');
//     h3.className = 'alert alert-info'
//     h3.innerText= 'Total Bill';
//     h3.style="width:22rem;"
//     colDiv.appendChild(h3);
//     const items = document.createElement('div');
//     items.style = "width:22rem;"
//     items.className='card';
//     items.innerText=''; 
//     // pizza.forEach(Element => {
//     //     console.log(element)
//     // });
//     colDiv.appendChild(items);
//     const Bill = document.createElement('div');
//     Bill.className = 'card'
//     Bill.style = "width:22rem;"
//     colDiv.appendChild(Bill)
//     const Total = document.createElement('div');
//     Total.className = 'card alert alert-success'
//     Total.style = "width:22rem;"
//     colDiv.appendChild(Total)
//     const button = document.createElement('button');
//     button.className = 'btn btn-dark w-100 mt-2';
//     button.innerText = "";
//     colDiv.appendChild(button);
//     outputDiv.appendChild(colDiv);
// }