import { useEffect } from "react";
import Header from "@/components/Header";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/styles/Title.styles";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";

export default function ProductsPage({ products, wishedProducts }) {
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("scrollPosition");
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll, 10));
      sessionStorage.removeItem("scrollPosition");
    }
  }, []);

  const handleProductClick = (event) => {
    const link = event.target.closest("a");
    if (link && link.href.includes("/product/")) {
      sessionStorage.setItem("scrollPosition", window.scrollY);
    }
  };

  return (
    <>
      <Header />
      <Center>
        <Title>Все продукты</Title>
        <div onClick={handleProductClick}>
          <ProductsGrid products={products} wishedProducts={wishedProducts} />
        </div>
      </Center>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: products.map((p) => p._id.toString()),
      })
    : [];

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      wishedProducts: wishedProducts.map((i) => i.product.toString()),
    },
  };
}