import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/styles/Title.styles";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import WhiteBox from "@/styles/WhiteBox.styles";
import ProductImages from "@/components/ProductImages";
import CartIcon from "@/components/icons/CartIcon";
import FlyingButton from "@/components/FlyingButton";
import ProductReviews from "@/components/ProductReviews";
import { ColWrapper, Description, Price, PriceRow } from "@/styles/Product[id].styles";


export default function ProductPage({product}) {
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <Description>{product.description}</Description>
            <PriceRow>
              <div>
                <Price>{product.price} ₽</Price>
              </div>
              <div>
                <FlyingButton main _id={product._id} src={product.images?.[0]}>
                  <CartIcon />
                </FlyingButton>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
        <ProductReviews product={product} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
}