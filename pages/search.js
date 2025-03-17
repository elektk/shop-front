import Header from "@/components/Header";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import { debounce } from "lodash";
import Spinner from "@/components/Spinner";
import { SearchInput, InputWrapper } from "@/styles/Search.styles";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function SearchPage() {
  const [phrase, setPhrase] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useCallback(
    debounce((phrase) => {
      axios.get('/api/products?phrase=' + encodeURIComponent(phrase)).then(response => {
        setProducts(response.data);
        setIsLoading(false);
      });
    }, 500),
    []
  );
  
  

  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase, debouncedSearch]);

  return (
    <>
      <Header />
      <Center>
        <InputWrapper>
          <SearchInput
            autoFocus
            value={phrase}
            onChange={ev => setPhrase(ev.target.value)}
            placeholder="Поиск продукта..."
          />
        </InputWrapper>
        {!isLoading && phrase !== '' && products.length === 0 && (
          <h2>По запросу не найдено ни одного продукта &quot;{phrase}&quot;</h2>
        )}
        {isLoading && <Spinner fullWidth />}
        {!isLoading && products.length > 0 && <ProductsGrid products={products} />}
      </Center>
    </>
  );
}