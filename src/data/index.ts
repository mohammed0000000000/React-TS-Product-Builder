import { IProduct, IFormInput, ICategory } from '../interface/index';
import { v4 as uuid } from 'uuid';


export const productList: IProduct[] = [

    {
        id: uuid(),
        title: "2023 Genesis GV70: Nominee",
        description: 'As luxury brands go, South koreas Genesis is still in its infancy, having sold its first cars as an independent Hyunda',
        imageURL: '/images/dhiva-unsplash.jpg',
        price: '50000',
        colors: ["#FF0032", "#2563eb", "#FF6E31"],
        category: {
            name: 'Cars',
            imageURL: '/images/dhiva-unsplash.jpg'
        }
    }
]
export const formInputsList: IFormInput[] = [
    {
        id: "title",
        name: "title",
        label: "Product Title",
        type: "text",
    },
    {
        id: "description",
        name: "description",
        label: "Product Description",
        type: "text",
    },
    {
        id: "image",
        name: "imageURL",
        label: "Product Image URL",
        type: "text",
    },
    {
        id: "price",
        name: "price",
        label: "Product price",
        type: "text",
    },
]

export const colors: string[] = [
    "#a855f7",
    "#2563eb",
    "#84D2C5",
    "#13005A",
    "#A31ACB",
    "#FF6E31",
    "#3C2A21",
    "#6C4AB6",
    "#CB1C8D",
    "#000000",
    "#645CBB",
    "#1F8A70",
    "#820000",
    "#FF0032",
]

export const categories: ICategory[] = [
    {
        id: uuid(),
        name: "Car",
        imageURL: "/images/dhiva-unsplash.jpg"
    },
    {
        id: uuid(),
        name: "T-Shirt",
        imageURL: "/images/wu-unsplash.jpg"
    },
    {
        id: uuid(),
        name: "Clothes",
        imageURL: "/images/fujiphilm-unsplash.jpg"
    },
    {
        id: uuid(),
        name: "PC Desktop",
        imageURL: "/images/itadaki-unsplash.jpg",
    },
]