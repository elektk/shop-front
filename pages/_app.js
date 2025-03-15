import { CartContextProvider } from "@/components/CartContext";
import { WishlistContextProvider } from "@/components/WishlistContext";
import { GlobalStyles } from "@/styles/GlobalStyles.styles";
import { SessionProvider } from "next-auth/react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import AuthHandler from "@/components/AuthSession";


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <HelmetProvider>
      <Helmet>
      </Helmet>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <WishlistContextProvider>
            <AuthHandler/>
            <Component {...pageProps} />
          </WishlistContextProvider>
        </CartContextProvider>
      </SessionProvider>
    </HelmetProvider>
  );
}