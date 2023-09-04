export class Products {
    id!: string;
    price!:number;
    name!:string;
    description!:string;
    brand!: string;
    favorite: boolean = false;
    rating: number = 0;
    category!: string;
    imageUrl!: string;
}