import { QueryClient, QueryClientProvider } from "react-query";
import Lists from "./components/lists/Lists";
import ProductForm from "./components/Products/ProductForm";
import ProductsList from "./components/Products/ProductsList";
import { useItemsService } from "./services/items/item-service";

function App() {
  const queryClient = new QueryClient();
  const items = useItemsService("6245df58d3657c109b66e668");

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <p>Hokofast</p>
        <Lists />
        <ProductsList products={items ?? []} />
        <ProductForm />
      </div>
    </QueryClientProvider>
  );
}

export default App;
