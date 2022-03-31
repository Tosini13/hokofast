import { TProduct } from "../../types/products";

type TProductsListProps = {
  products: TProduct[];
};

const ProductsList: React.FC<TProductsListProps> = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <p key={product.id} style={{ backgroundColor: "gray", padding: "3px" }}>
          {product.name}
        </p>
      ))}
    </>
  );
};

export default ProductsList;
