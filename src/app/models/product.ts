export interface Product {

    id: number;
    unit: string;
    category: number;
    name: string;
    discount: number,
    comments: string,
    owner: string,
    price: number,
    price_on_sale: number,
    sale: boolean; 
    availability: boolean,
    quantityInStock : number,
    nb_modifie : number 
    discount_modifie : number   
}
