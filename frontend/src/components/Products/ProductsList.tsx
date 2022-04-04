import { deleteItem } from "../../services/items/item-service";
import { TItem } from "../../types/items";

type TProductsListProps = {
  products: TItem[];
};

const ProductsList: React.FC<TProductsListProps> = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <div key={product.id} style={{ display: "flex" }}>
          <p
            style={{
              backgroundColor: "gray",
              padding: "3px",
              width: "fit-content",
            }}
          >
            {product.name}
          </p>
          <p
            style={{
              marginLeft: "5px",
              border: "black 1px solid",
              cursor: "pointer",
            }}
            onClick={() => deleteItem(product.list, product.id)}
          >
            DEL
          </p>
        </div>
      ))}
    </>
  );
};

export default ProductsList;
