//Structure(),blueprint
//product js contain the structure of pizza object
//pizza object-Id,Name,Desc,Price,Rating

class Product{
    constructor(id,name,desc,price,url){
        //this - keyword(Contains current calling object reference)
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.price=price*80;
        this.url=url;
        this.isAddedInCart=false;
    }
}
export default Product;