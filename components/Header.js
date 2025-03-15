import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import { 
  StyledHeader, 
  Logo, 
  Wrapper, 
  StyledNav, 
  NavLink, 
  NavButton, 
  SideIcons 
} from '@/styles/Header.styles';

import BarsIcon from "@/components/icons/Bars";
import SearchIcon from "@/components/icons/SearchIcon";
import Center from "@/components/Center";
import Link from "next/link";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>Авада-кедавра</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'}>Домой</NavLink>
            <NavLink href={'/products'}>Все продукты</NavLink>
            <NavLink href={'/categories'}>Категории</NavLink>
            <NavLink href={'/account'}>Аккаунт</NavLink>
            <NavLink href={'/cart'}>Корзина ({cartProducts.length})</NavLink>
          </StyledNav>
          <SideIcons>
            <Link href={'/search'}><SearchIcon /></Link>
            <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
              <BarsIcon />
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
