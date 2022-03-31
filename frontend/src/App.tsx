import ProductForm from "./components/Products/ProductForm";
import ProductsList from "./components/Products/ProductsList";
import { useProductService } from "./services/product-service/product-service";

function App() {
  const { products } = useProductService();

  console.log("products", products);

  return (
    <div>
      <p>Hokofast</p>
      <ProductsList products={products} />
      <ProductForm />
    </div>
  );
}

export default App;
