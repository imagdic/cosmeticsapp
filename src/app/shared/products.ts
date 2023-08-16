export class Products {
    id!: number;
    price!:number;
    name!:string;
    description!:string;
    brand!: string;
    favorite: boolean = false;
    rating: number = 0;
    category!: string;
    tags?: string[];
    imageUrl!: string;
}