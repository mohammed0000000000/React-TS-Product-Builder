// ? product Object === validation object [title, describe]


/**
 * par
 */

export const productValidation = (product: { title: string, description: string, imageURL: string, price: string }) => {
  // ** Return Error Object
  const errors: { title: string, description: string, imageURL: string, price: string } = {
    title: '',
    description: '',
    imageURL: "",
    price: '',
  }
  const regex = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|\d{1,3}(\.\d{1,3}){3})(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[a-z\d_-]*)?$/i;

  if (!product.title.trim() || product.title.length < 10 || product.title.length > 80)
    errors.title = "Product Title must be between 10 - 80 characters!";
  if (!product.description.trim() || product.description.length < 10 || product.description.length > 900)
    errors.description = "Product Title must be between 10 - 900 characters!";
  // if (!product.description.trim() || !regex.test(product.imageURL))
  //   errors.imageURL = "You Must Provide Valid URL for Image!.."
  if (!product.price.trim() || isNaN(Number(product.price)) || Number(product.price) < 0)
    errors.price = "UnValid Price...";

  return errors;

}