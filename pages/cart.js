import Header from "@/components/Header";
import Center from "@/components/Center";
import Button from "@/components/Button";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import {RevealWrapper} from "next-reveal";
import {useSession} from "next-auth/react";
import { Box, CityHolder, ColumnsWrapper, ProductImageBox, ProductInfoCell, QuantityLabel } from "@/styles/Cart.styles";



export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [shippingFee, setShippingFee] = useState(null);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts })
        .then(response => {
          setProducts(response.data);
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
    axios.get('/api/settings?name=shippingFee').then(res => {
      setShippingFee(res.data.value);
    });
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }
    axios.get('/api/address')
      .then(response => {
        const addressData = response.data;
        if (addressData) {
          setName(addressData.name || ''); 
          setEmail(addressData.email || '');
          setCity(addressData.city || '');
          setPostalCode(addressData.postalCode || '');
          setStreetAddress(addressData.streetAddress || '');
          setCountry(addressData.country || '');
        }
      })
  }, [session]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let productsTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    productsTotal += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Спасибо за ваш заказ!</h1>
              <p>Мы сообщим вам по электронной почте, когда ваш заказ будет отправлен.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <RevealWrapper delay={0}>
            <Box>
              <h2>Корзина</h2>
              {!cartProducts?.length && (
                <div>Ваша корзина пуста</div>
              )}
              {products?.length > 0 && (
                <Table>
                  <thead>
                  <tr>
                    <th>Продукт</th>
                    <th>Количество</th>
                    <th>Цена</th>
                  </tr>
                  </thead>
                  <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt=""/>
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() => lessOfThisProduct(product._id)}>&minus;</Button>
                        <QuantityLabel>
                          {cartProducts.filter(id => id === product._id).length}
                        </QuantityLabel>
                        <Button
                          onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>
                        {cartProducts.filter(id => id === product._id).length * product.price}&nbsp;₽
                      </td>
                    </tr>
                  ))}
                  <tr className="subtotal">
                    <td colSpan={2}>Продукт</td>
                    <td>{productsTotal}&nbsp;₽</td>
                  </tr>
                  <tr className="subtotal">
                    <td colSpan={2}>Доставка</td>
                    <td>{shippingFee}&nbsp;₽</td>
                  </tr>
                  <tr className="subtotal total">
                    <td colSpan={2}>Итого</td>
                    <td>{productsTotal + parseInt(shippingFee || 0)}&nbsp;₽</td>
                  </tr>
                  </tbody>
                </Table>
              )}
            </Box>
          </RevealWrapper>
          {!!cartProducts?.length && (
            <RevealWrapper delay={100}>
              <Box>
                <h2>Информация о заказе</h2>
                <Input type="text"
                       placeholder="Имя"
                       value={name}
                       name="name"
                       onChange={ev => setName(ev.target.value)} />
                <Input type="text"
                       placeholder="Емеил"
                       value={email}
                       name="email"
                       onChange={ev => setEmail(ev.target.value)}/>
                <CityHolder>
                  <Input type="text"
                         placeholder="Город"
                         value={city}
                         name="city"
                         onChange={ev => setCity(ev.target.value)}/>
                  <Input type="text"
                         placeholder="Индекс"
                         value={postalCode}
                         name="postalCode"
                         onChange={ev => setPostalCode(ev.target.value)}/>
                </CityHolder>
                <Input type="text"
                       placeholder="Улица, дом"
                       value={streetAddress}
                       name="streetAddress"
                       onChange={ev => setStreetAddress(ev.target.value)}/>
                <Input type="text"
                       placeholder="Страна"
                       value={country}
                       name="country"
                       onChange={ev => setCountry(ev.target.value)}/>
                <Button black block
                        onClick={goToPayment}>
                  Продолжить оплату
                </Button>
              </Box>
            </RevealWrapper>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
