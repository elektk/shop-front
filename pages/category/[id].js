import Header from "@/components/Header";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { CategoryHeader, Filter, FiltersWrapper } from "@/styles/Category[id].styles";

export default function CategoryPage({ category, subCategories, products: originalProducts }) {
  const defaultSorting = "_id-desc";

  const defaultFilterValues = useMemo(() => 
    category.properties.map((p) => ({ name: p.name, value: "all" })), 
    [category.properties]
  );

  const [products, setProducts] = useState(originalProducts);
  const [filtersValues, setFiltersValues] = useState(defaultFilterValues);
  const [sort, setSort] = useState(defaultSorting);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const catIds = useMemo(() => [category._id, ...(subCategories?.map((c) => c._id) || [])], [category, subCategories]);

  const handleFilterChange = useCallback((filterName, filterValue) => {
    setFiltersValues((prev) => 
      prev.map((p) => (p.name === filterName ? { ...p, value: filterValue } : p))
    );
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingProducts(true);
      const params = new URLSearchParams();
      params.set("categories", catIds.join(","));
      params.set("sort", sort);
      filtersValues.forEach((f) => {
        if (f.value !== "all") {
          params.set(f.name, f.value);
        }
      });

      axios.get(`/api/products?${params.toString()}`).then((res) => {
        setProducts(res.data);
        setLoadingProducts(false);
      });
    }, 300); // Дебаунс 300 мс

    return () => clearTimeout(timeout);
  }, [filtersValues, sort, catIds]);

  return (
    <>
      <Header />
      <Center>
        <CategoryHeader>
          <h1>{category.name}</h1>
          <FiltersWrapper>
            {category.properties.map((prop) => (
              <Filter key={prop.name}>
                <span>{prop.name}:</span>
                <select
                  onChange={(ev) => handleFilterChange(prop.name, ev.target.value)}
                  value={filtersValues.find((f) => f.name === prop.name)?.value || "all"}
                >
                  <option value="all">All</option>
                  {prop.values.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </Filter>
            ))}
            <Filter>
              <span>Sort:</span>
              <select
                value={sort}
                onChange={(ev) => setSort(ev.target.value)}
              >
                <option value="price-asc">price, lowest first</option>
                <option value="price-desc">price, highest first</option>
                <option value="_id-desc">newest first</option>
                <option value="_id-asc">oldest first</option>
              </select>
            </Filter>
          </FiltersWrapper>
        </CategoryHeader>
        {loadingProducts ? <Spinner fullWidth /> : products.length ? <ProductsGrid products={products} /> : <div>Sorry, no products found</div>}
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const category = await Category.findById(context.query.id).lean();
  const subCategories = await Category.find({ parent: category._id }).lean();
  const catIds = [category._id, ...subCategories.map((c) => c._id)];
  const products = await Product.find({ category: { $in: catIds } })
    .select("name price image")
    .lean();

  return {
    props: {
      category,
      subCategories,
      products,
    },
  };
}
