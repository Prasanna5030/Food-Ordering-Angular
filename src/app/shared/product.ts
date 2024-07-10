export interface Product{
   

    id: number;
    productName: string;
    price: number;
    description: string | null;
    status: string; 
    categoryId: number;
    category: string;
}

