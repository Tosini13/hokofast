import { TItem } from "../../types/items";

type TProductsListProps = {
  products: TItem[];
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
