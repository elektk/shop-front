import Header from "@/components/Header";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { RevealWrapper } from "next-reveal";
import { useSession } from "next-auth/react";
import { debounce } from "lodash";
import { Box, CityHolder, ColumnsWrapper, ProductImageBox, ProductInfoCell, QuantityLabel, ErrorMessage } from "@/styles/Cart.styles";
import Image from "next/image";

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
  const [errors, setErrors] = useState({});

  const debouncedValidateField = debounce(validateField, 300);

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
  }, [clearCart]);

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
      });
  }, [session]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  function validateField(fieldName, value) {
    const newErrors = { ...errors };
    switch (fieldName) {
      case 'name':
        if (!value.trim()) newErrors.name = "Пожалуйста, введите имя";
        else delete newErrors.name;
        break;
      case 'email':
        if (!value.trim()) newErrors.email = "Пожалуйста, введите email";
        else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = "Некорректный email";
        else delete newErrors.email;
        break;
      case 'city':
        if (!value.trim()) newErrors.city = "Пожалуйста, введите город";
        else delete newErrors.city;
        break;
      case 'postalCode':
        if (!value.trim()) newErrors.postalCode = "Пожалуйста, введите почтовый индекс";
        else delete newErrors.postalCode;
        break;
      case 'streetAddress':
        if (!value.trim()) newErrors.streetAddress = "Пожалуйста, введите адрес";
        else delete newErrors.streetAddress;
        break;
      case 'country':
        if (!value.trim()) newErrors.country = "Пожалуйста, введите страну";
        else delete newErrors.country;
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateAllFields() {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Введите имя";
    if (!email.trim()) newErrors.email = "Введите email";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Некорректный email";
    if (!city.trim()) newErrors.city = "Введите город";
    if (!postalCode.trim()) newErrors.postalCode = "Введите почтовый индекс";
    if (!streetAddress.trim()) newErrors.streetAddress = "Введите адрес";
    if (!country.trim()) newErrors.country = "Введите страну";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function goToPayment() {
    if (!validateAllFields()) {
      return;
    }
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
                          <Image src={product.images[0]} alt={product.title} width={80} height={80} quality={75} />
                          </ProductImageBox>
                          {product.title}
                        </ProductInfoCell>
                        <td>
                          <Button onClick={() => lessOfThisProduct(product._id)}>−</Button>
                          <QuantityLabel>
                            {cartProducts.filter(id => id === product._id).length}
                          </QuantityLabel>
                          <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                        </td>
                        <td>
                          {cartProducts.filter(id => id === product._id).length * product.price} ₽
                        </td>
                      </tr>
                    ))}
                    <tr className="subtotal">
                      <td colSpan={2}>Продукт</td>
                      <td>{productsTotal} ₽</td>
                    </tr>
                    <tr className="subtotal">
                      <td colSpan={2}>Доставка</td>
                      <td>{shippingFee} ₽</td>
                    </tr>
                    <tr className="subtotal total">
                      <td colSpan={2}>Итого</td>
                      <td>{productsTotal + parseInt(shippingFee || 0)} ₽</td>
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
                <Input
                  type="text"
                  placeholder="Имя"
                  value={name}
                  name="name"
                  onChange={ev => {
                    setName(ev.target.value);
                    debouncedValidateField('name', ev.target.value);
                  }}
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                <Input
                  type="text"
                  placeholder="Емеил"
                  value={email}
                  name="email"
                  onChange={ev => {
                    setEmail(ev.target.value);
                    debouncedValidateField('email', ev.target.value);
                  }}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="Город"
                    value={city}
                    name="city"
                    onChange={ev => {
                      setCity(ev.target.value);
                      debouncedValidateField('city', ev.target.value);
                    }}
                  />
                  {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
                  <Input
                    type="text"
                    placeholder="Индекс"
                    value={postalCode}
                    name="postalCode"
                    onChange={ev => {
                      setPostalCode(ev.target.value);
                      debouncedValidateField('postalCode', ev.target.value);
                    }}
                  />
                  {errors.postalCode && <ErrorMessage>{errors.postalCode}</ErrorMessage>}
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Улица, дом"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={ev => {
                    setStreetAddress(ev.target.value);
                    debouncedValidateField('streetAddress', ev.target.value);
                  }}
                />
                {errors.streetAddress && <ErrorMessage>{errors.streetAddress}</ErrorMessage>}
                <Input
                  type="text"
                  placeholder="Страна"
                  value={country}
                  name="country"
                  onChange={ev => {
                    setCountry(ev.target.value);
                    debouncedValidateField('country', ev.target.value);
                  }}
                />
                {errors.country && <ErrorMessage>{errors.country}</ErrorMessage>}
                <Button black block onClick={goToPayment}>
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