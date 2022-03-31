import { useState } from "react";
import { useProductService } from "../../services/product-service/product-service";
import { TProduct } from "../../types/products";

export type TProductFormData = Omit<TProduct, "id">;

type TProductFormProps = {};

const ProductForm: React.FC<TProductFormProps> = () => {
  const { createProduct } = useProductService();
  const [name, setName] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProduct("6245df58d3657c109b66e668", { name });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default ProductForm;
