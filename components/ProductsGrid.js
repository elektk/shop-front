import { StyledProductsGrid } from "@/styles/ProductsGrid.styles";
import ProductBox from "@/components/ProductBox";
import { RevealWrapper } from "next-reveal";

export default function ProductsGrid({ products, wishedProducts = [] }) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 &&
        products.map((product, index) => (
          <RevealWrapper key={product._id} delay={index * 50}>
            <ProductBox 
              {...product} 
              wished={wishedProducts.includes(product._id)} 
            />
          </RevealWrapper>
        ))}
    </StyledProductsGrid>
  );
}
