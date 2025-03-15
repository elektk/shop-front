import Header from "@/components/Header";
import Center from "@/components/Center";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/Button";
import WhiteBox from "@/styles/WhiteBox.styles";
import { RevealWrapper } from "next-reveal";
import Input from "@/components/Input";
import { useEffect, useState, useContext } from "react";
import Spinner from "@/components/Spinner";
import ProductBox from "@/components/ProductBox";
import Tabs from "@/components/Tabs";
import SingleOrder from "@/components/SingleOrder";
import { ColsWrapper, WishedProductsGrid } from "@/styles/Account.styles";
import { CityHolder } from "@/styles/Cart.styles";
import { WishlistContext } from "@/components/WishlistContext";
import axios from "axios";

export default function AccountPage() {
  const { data: session } = useSession();
  const { wishlistProducts } = useContext(WishlistContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishedProductsDetails, setWishedProductsDetails] = useState([]);
  const [activeTab, setActiveTab] = useState('Заказы');
  const [orders, setOrders] = useState([]);

  const isGuest = session?.user?.name?.includes("Guest");

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  async function login() {
    await signIn('google');
  }

  function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country };
    axios.put('/api/address', data);
  }

  useEffect(() => {
    if (!session) {
      setAddressLoaded(true);
      setWishlistLoaded(true);
      setOrderLoaded(true);
      return;
    }

    setAddressLoaded(false);
    setWishlistLoaded(false);
    setOrderLoaded(false);

    axios.get('/api/address')
      .then(response => {
        const addressData = response.data || {};
        setName(addressData.name || '');
        setEmail(addressData.email || '');
        setCity(addressData.city || '');
        setPostalCode(addressData.postalCode || '');
        setStreetAddress(addressData.streetAddress || '');
        setCountry(addressData.country || '');
        setAddressLoaded(true);
      });

    if (wishlistProducts.length > 0) {
      axios.post('/api/cart', { ids: wishlistProducts })
        .then(response => {
          setWishedProductsDetails(response.data);
          setWishlistLoaded(true);
        })
        .catch(error => {
          console.error('Ошибка при загрузке деталей wishlist:', error);
          setWishlistLoaded(true);
        });
    } else {
      setWishedProductsDetails([]);
      setWishlistLoaded(true);
    }

    axios.get('/api/orders').then(response => {
      setOrders(response.data || []);
      setOrderLoaded(true);
    });
  }, [session, wishlistProducts]);

  function productRemovedFromWishlist(idToRemove) {
    setWishedProductsDetails(prev => prev.filter(p => p._id !== idToRemove));
  }

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <Tabs
                  tabs={['Заказы', 'Избранное']}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {activeTab === 'Заказы' && (
                  <>
                    {!orderLoaded && <Spinner fullWidth={true} />}
                    {orderLoaded && (
                      <div>
                        {orders.length === 0 && <p>Войдите, чтобы увидеть ваши заказы</p>}
                        {orders.length > 0 && orders.map(o => (
                          <SingleOrder key={o._id} {...o} />
                        ))}
                      </div>
                    )}
                  </>
                )}
                {activeTab === 'Избранное' && (
                  <>
                    {!wishlistLoaded && <Spinner fullWidth={true} />}
                    {wishlistLoaded && (
                      <>
                        <WishedProductsGrid>
                          {wishedProductsDetails.length > 0 && wishedProductsDetails.map(wp => (
                            <ProductBox
                              key={wp._id}
                              {...wp}
                              wished={wishlistProducts.includes(wp._id)}
                              onRemoveFromWishlist={productRemovedFromWishlist}
                            />
                          ))}
                        </WishedProductsGrid>
                        {wishedProductsDetails.length === 0 && (
                          <p>В избранном пусто</p>
                        )}
                      </>
                    )}
                  </>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                <h2>{session && !isGuest ? 'Реквизиты счета' : 'Войти'}</h2>
                {!addressLoaded && <Spinner fullWidth={true} />}
                {addressLoaded && session && !isGuest && (
                  <>
                    <Input type="text"
                          placeholder="Name"
                          value={name}
                          name="name"
                          onChange={ev => setName(ev.target.value)} />
                    <Input type="text"
                          placeholder="Email"
                          value={email}
                          name="email"
                          onChange={ev => setEmail(ev.target.value)} />
                    <CityHolder>
                      <Input type="text"
                            placeholder="City"
                            value={city}
                            name="city"
                            onChange={ev => setCity(ev.target.value)} />
                      <Input type="text"
                            placeholder="Postal Code"
                            value={postalCode}
                            name="postalCode"
                            onChange={ev => setPostalCode(ev.target.value)} />
                    </CityHolder>
                    <Input type="text"
                          placeholder="Street Address"
                          value={streetAddress}
                          name="streetAddress"
                          onChange={ev => setStreetAddress(ev.target.value)} />
                    <Input type="text"
                          placeholder="Country"
                          value={country}
                          name="country"
                          onChange={ev => setCountry(ev.target.value)} />
                    <Button black block onClick={saveAddress}>
                      Сохранить
                    </Button>
                    <hr />
                  </>
                )}
                {(!session || isGuest) && (
                  <Button primary onClick={login}>Войти c Google</Button>
                )}
                {session && !isGuest && (
                  <Button primary onClick={logout}>Выйти</Button>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>
    </>
  );
}