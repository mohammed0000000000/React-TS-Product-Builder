export interface IProduct {
    id?: string | undefined;
    title: string;
    description: string;
    imageURL: string;
    price: string;
    colors: string[];
    category: {
        id?: string | undefined;
        name: string;
        imageURL: string;
    }
}
export interface IFormInput {
    id: string;
    name: 'title' | "description" | "price" | "imageURL";
    label: string;
    type: string
}

export interface ICategory {
    id?: string | undefined;
    name: string;
    imageURL: string;
}