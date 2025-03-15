import {CartContext} from "@/components/CartContext";
import { FlyingButtonWrapper } from "@/styles/FlyingButton.styles";
import {useContext, useEffect, useRef} from "react";


export default function FlyingButton(props) {
  const {addProduct} = useContext(CartContext);
  const imgRef = useRef();
  function sendImageToCart(ev) {
    imgRef.current.style.display = 'inline-block';
    imgRef.current.style.left = (ev.clientX-50) + 'px';
    imgRef.current.style.top = (ev.clientY-50) + 'px';
    setTimeout(() => {
      imgRef.current.style.display = 'none';
    }, 1000);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const reveal = imgRef.current?.closest('div[data-sr-id]');
      if (reveal?.style.opacity === '1') {
        reveal.style.transform = 'none';
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <FlyingButtonWrapper
        white={props.white}
        main={props.main}
        onClick={() => addProduct(props._id)}>
        <img src={props.src} alt="" ref={imgRef} />
        <button onClick={ev => sendImageToCart(ev)} {...{...props, main: undefined}}>
          В корзину
        </button>
      </FlyingButtonWrapper>
    </>
  );
}
