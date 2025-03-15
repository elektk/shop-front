import Center from "@/components/Center";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import FlyingButton from "@/components/FlyingButton";
import {RevealWrapper} from 'next-reveal'
import { Bg, ButtonsWrapper, CenterImg, Column, ContentWrapper, Desc, ImgColumn, Title, ColumnsWrapper } from "@/styles/Featured.styles";


export default function Featured({product}) {
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <RevealWrapper origin={'left'} delay={0}>
                <ContentWrapper>
                  <Title>{product.title}</Title>
                  <Desc>{product.description}</Desc>
                  <ButtonsWrapper>
                    <ButtonLink href={'/product/'+product._id} outline={1} white={1}>Подробнее</ButtonLink>
                    <FlyingButton white={1} _id={product._id} src={product.images?.[0]}>
                      <CartIcon />
                      В корзину
                    </FlyingButton>
                  </ButtonsWrapper>
                </ContentWrapper>
              </RevealWrapper>
            </div>
          </Column>
          <ImgColumn>
            <RevealWrapper delay={0}>
              <CenterImg>
                <img className={'main'} src={product.images?.[0]} alt=""/>
              </CenterImg>
            </RevealWrapper>
          </ImgColumn>
        </ColumnsWrapper>
      </Center>

    </Bg>
  );
}