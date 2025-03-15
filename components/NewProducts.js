import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/styles/Title.styles";

export default function NewProducts({products,wishedProducts}) {
  return (
    <Center>
      <Title>Новые предложения</Title>
      <ProductsGrid products={products} wishedProducts={wishedProducts} />
    </Center>
  );
}