import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import ProductCard from "./components/ProductCard";
import Model from "./components/Ui/Model";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/Ui/Button";
import Input from "./components/Ui/Input";
import { ICategory, IProduct } from "./interface";
import { productValidation } from "./validation";
import ErrorMsg from "./components/Error";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/Ui/SelectMenu";
import DialogComponent from "./components/Ui/Dialog";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const defaultProductObjct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  /* --------- State ---------- */
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [product, setProduct] = useState<IProduct>(defaultProductObjct);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObjct);

  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    categories[0]
  );
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  // temp State
  const [tempColors, setTempColors] = useState<string[]>([]);

  /* handler */
  const openModel = () => setIsOpen(true);
  const closeModel = () => setIsOpen(false);
  const openModelEdit = () => setIsOpenEdit(true);
  const closeModelEdit = () => setIsOpenEdit(false);
  const openDialog = () => setIsOpenDialog(true);
  const closeDialog = () => setIsOpenDialog(false);
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const onCancel = (): void => {
    console.log();
    setProduct(defaultProductObjct);
    closeModel();
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const errors = productValidation({
      title: product.title,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
    });
    console.log(errors);
    const hasErrorMsg =
      Object.values(errors).some((value) => value == "") &&
      Object.values(errors).every((value) => value == "");
    console.log(hasErrorMsg);
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: { ...tempColors },
        category: selectedCategory,
      },
      ...prev,
    ]);
    console.log(product);
    setProduct(defaultProductObjct);
    setTempColors([]);
    closeModel();
    toast("Add Product Successfully!.");
  };

  const editHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const errors = productValidation({
      title: productToEdit.title,
      description: productToEdit.description,
      imageURL: productToEdit.imageURL,
      price: productToEdit.price,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value == "") &&
      Object.values(errors).every((value) => value == "");
    console.log(hasErrorMsg);
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    const updateProducts = [...products];
    updateProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setProducts(updateProducts);

    setProduct(defaultProductObjct);
    setTempColors([]);
    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
    });
    closeModelEdit();
    toast("Update Product Successfully!.");
  };
  const removeProductHandler = (): void => {
    const filtered = products.filter(
      (product) => product.id != productToEdit.id
    );
    setProducts(filtered);
    closeDialog();
    toast("Remove Product Successfully!.");
  };
  // const setSelectedCategory = (selectedCategory: ICategory): void => {
  //   selectedCategory =
  // }
  // ** Renders ** //

  // ------- Render Proucts ----------------
  const renderProductList = () => {
    return products.map((product, idx) => (
      <ProductCard
        idx={idx}
        setProductToEditIdx={setProductToEditIdx}
        product={product}
        key={product.id}
        setProducToEdit={setProductToEdit}
        openEditModel={openModelEdit}
        openDialog={openDialog}
      />
    ));
  };
  // ---- Render FormInput ---- //
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col mb-4" key={input.id}>
      <label htmlFor={input.id} className="">
        {input.label}
      </label>
      <Input
        id={input.id}
        type={input.type}
        name={input.name}
        value={product[input.name]}
        onChange={(e) => {
          onChangeHandler(e);
        }}
      />
      <ErrorMsg msg={errors[input.name]}></ErrorMsg>
    </div>
  ));

  // -------- Render Product Color -------------//
  const renderProductColors = (colors: string[]): ReactNode[] => {
    return colors.map((color) => {
      return (
        <CircleColor
          color={color}
          key={color}
          onClick={() => {
            if (tempColors.includes(color)) {
              setTempColors((prev) => prev.filter((c) => c !== color));
              return;
            }
            if (productToEdit.colors.includes(color)) {
              setTempColors((prev) => prev.filter((c) => c !== color));
              return;
            }
            setTempColors((prev) => [...prev, color]);
          }}
        />
      );
    });
  };
  // -------- Render Choose Color ----------- \\
  const renderColors = (colors: string[]): ReactNode[] => {
    return colors.map((color) => {
      return (
        <span
          key={color}
          style={{ backgroundColor: color }}
          className="text-white text-sm rounded-md"
        >
          {color}
        </span>
      );
    });
  };

  const renderProductEditWithErrorMsg = (): ReactNode => {
    return formInputsList.map((input) => {
      return (
        <div className="flex flex-col mb-4">
          <label htmlFor={input.name} key={input.id} className="">
            {input.label}
          </label>
          <Input
            id={input.id}
            type={input.type}
            name={input.name}
            value={productToEdit[input.name]}
            onChange={(e) => {
              onChangeEditHandler(e);
            }}
          />
          <ErrorMsg msg={errors[input.name]}></ErrorMsg>
        </div>
      );
    });
  };

  const renderselectedColorsToEdit = (): ReactNode => {
    return tempColors.concat(productToEdit.colors).map((color) => {
      return (
        <span
          key={color}
          style={{ backgroundColor: color, margin: "2px" }}
          className="text-white text-sm rounded-md"
        >
          {color}
        </span>
      );
    });
  };

  // Function return
  return (
    <main className="container">
      <div className="text-center my-5">
        <Button
          className="text-white bg-blue-700 p-2 max-w-fit"
          onClick={openModel}
          childern={"Build A Product"}
        ></Button>
      </div>
      <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md">
        {renderProductList()}
      </div>

      {/* Model to Add */}
      <Model isOpen={isOpen} closeModel={closeModel} title="ADD A NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex flex-row items-center space-x-1  space-y-1 flex-wrap">
            {renderColors(tempColors)}
          </div>
          <div className="flex flex-row items-center space-x-1 ">
            {renderProductColors(colors)}
          </div>
          <div className="flex flex-row item-center space-x-3">
            <Button
              className="bg-indigo-600 hover:bg-indigo-800 text-white"
              childern={"Submit"}
            ></Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500 text-white"
              childern={"Cancel"}
              onClick={onCancel}
            ></Button>
          </div>
        </form>
      </Model>
      {/* Model to Edit */}
      <Model
        isOpen={isOpenEdit}
        closeModel={closeModelEdit}
        title="EDIT PRODUCT"
      >
        <form className="space-y-3" onSubmit={editHandler}>
          {renderProductEditWithErrorMsg()}
          {/* {renderFormInputList} */}
          <Select
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />
          <div className="flex flex-row items-center space-x-1 space-y-1 flex-wrap">
            {renderselectedColorsToEdit()}
          </div>
          <div className="flex flex-row items-center content-between space-x-1 flex-wrap">
            {renderProductColors(colors)}
          </div>
          <div className="flex flex-row item-center space-x-3">
            <Button
              className="bg-indigo-600 hover:bg-indigo-800 text-white"
              childern={"UPDATE"}
            ></Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500 text-white"
              childern={"Cancel"}
              onClick={closeModelEdit}
            ></Button>
          </div>
        </form>
      </Model>
      <DialogComponent isOpen={isOpenDialog} open={openDialog}>
        <div className="flex flex-row space-x-2">
          <Button
            childern={"Yes, remove"}
            className="bg-red-600 hover:bg-red-700"
            onClick={removeProductHandler}
          ></Button>
          <Button
            childern={"Cancel"}
            className="bg-gray-400 hover:bg-gray-600 text-black"
            onClick={closeDialog}
          ></Button>
        </div>
      </DialogComponent>
      <Toaster />
    </main>
  );
};

export default App;
