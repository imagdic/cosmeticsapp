export class Products {
    id!: number;
    price!:number;
    name!:string;
    brand!: string;
    favorite: boolean = false;
    star: number = 0;
    tags?: string[];
    imageUrl!: string;
}