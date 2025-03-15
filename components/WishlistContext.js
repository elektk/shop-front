import { createContext, useState, useEffect } from "react";
import { debounce } from "lodash";

export const WishlistContext = createContext({});

export function WishlistContextProvider({ children }) {
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedWishlist = localStorage.getItem("wishlist");
      if (storedWishlist) {
        setWishlistProducts(JSON.parse(storedWishlist));
      }
    }
  }, []);

  const saveWishlist = debounce(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (wishlistProducts.length > 0) {
        localStorage.setItem("wishlist", JSON.stringify(wishlistProducts));
      } else {
        localStorage.removeItem("wishlist");
      }
    }
  }, 500);

  useEffect(() => {
    saveWishlist();
  }, [wishlistProducts]);

  function addProduct(productId) {
    setWishlistProducts(prev => (!prev.includes(productId) ? [...prev, productId] : prev));
  }

  function removeProduct(productId) {
    setWishlistProducts(prev => prev.filter(id => id !== productId));
  }

  function clearWishlist() {
    setWishlistProducts([]);
  }

  return (
    <WishlistContext.Provider value={{ wishlistProducts, setWishlistProducts, addProduct, removeProduct, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}