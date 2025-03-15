import { memo } from "react";
import { useState, useContext, useEffect } from "react";
import { WishlistContext } from "@/components/WishlistContext";
import dynamic from "next/dynamic";
import HeartOutlineIcon from "@/components/icons/HeartOutlineIcon";
import HeartSolidIcon from "@/components/icons/HeartSolidIcon";
import {
  ProductWrapper,
  WhiteBox,
  Title,
  ProductInfoBox,
  PriceRow,
  Price,
  WishlistButton
} from "@/styles/ProductBox.styles";


export default memo(function ProductBox({ _id, title, price, images, onRemoveFromWishlist = () => {} }) {
  const { wishlistProducts, addProduct, removeProduct } = useContext(WishlistContext);
  const [isWished, setIsWished] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const FlyingButton = dynamic(() => import("@/components/FlyingButton"), { ssr: false });

  useEffect(() => {
    setIsHydrated(true);
    setIsWished(wishlistProducts.includes(_id));
  }, [wishlistProducts, _id]);

  function toggleWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    if (nextValue) {
      addProduct(_id);
    } else {
      removeProduct(_id);
      onRemoveFromWishlist(_id);
    }
    setIsWished(nextValue);
  }

  const url = '/product/' + _id;

  if (!isHydrated) {
    return null;
  }

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <WishlistButton wished={isWished} onClick={toggleWishlist}>
            {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
          </WishlistButton>
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>{price} ₽</Price>
          <FlyingButton _id={_id} src={images?.[0]}>В корзину</FlyingButton>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
});