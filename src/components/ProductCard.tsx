import { IProduct } from "../interface";
import Image from "./Image";
import Button from "./Ui/Button";
import { textSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
interface IProps {
  product: IProduct;
  setProducToEdit: (prduct: IProduct) => void;
  openEditModel: () => void;
  idx: number;
  setProductToEditIdx: (value: number) => void;
  openDialog: () => void;
}

const ProductCard = ({
  product,
  setProducToEdit,
  openEditModel,
  idx,
  setProductToEditIdx,
  openDialog,
}: IProps) => {
  const { title, description, imageURL, colors, price, category } = product;

  // --------- Handler ------------- \\
  const onEdit = () => {
    setProducToEdit(product);
    openEditModel();
    setProductToEditIdx(idx);
  };
  const onRemove = () => {
    setProducToEdit(product);
  };
  return (
    <>
      <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex-col">
        <Image
          imageURL={imageURL}
          alt={"Product name"}
          className="rounded-md"
        />

        <h3 className="font-medium">{title}</h3>
        <p className="font-sm text-left">{textSlicer(description)}</p>
        <div className="product-color flex items-center my-2 space-x-2 flex-wrap">
          {colors.length == 0
            ? "No Available Colors"
            : Object.values(colors).map((color, idx) => (
                <CircleColor key={idx} color={color} />
              ))}
        </div>
        <div className="details flex items-center justify-between">
          <span className="inline-block text-blue-600 font-medium">
            {"$" + price}
          </span>
          <div className="flex flex-row space-x-2 items-center">
            <span className="block text-black-600 font-medium">
              {category.name}
            </span>
            <Image
              imageURL={category.imageURL}
              alt={category.name}
              className="w-10 h-10 rounded-full object-contain"
            />
          </div>
        </div>
        <div className="flex justify-between space-x-2 mt-2">
          <Button
            childern={"Edit"}
            className="bg-blue-600"
            // onBlur={() => {}}
            onClick={() => {
              onEdit();
            }}
          ></Button>
          <Button
            className="bg-red-600"
            childern={"Remove"}
            onClick={openDialog}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
