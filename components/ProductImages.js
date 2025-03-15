import { useState, useEffect } from "react";
import {
  BigImageWrapper,
  BigImage,
  ImageButtons,
  ImageButton,
  Image,
  ModalOverlay,
  ModalContent,
  LeftArrow,
  ModalImage,
  RightArrow
} from '@/styles/ProductImages.styles'


export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0] || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);


  const nextImage = () => {
    const currentIndex = images.indexOf(activeImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setActiveImage(images[nextIndex]);
  };


  const prevImage = () => {
    const currentIndex = images.indexOf(activeImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setActiveImage(images[prevIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isModalOpen) return;
      if (event.key === "Escape") {
        setIsModalOpen(false);
      } else if (event.key === "ArrowRight") {
        nextImage();
      } else if (event.key === "ArrowLeft") {
        prevImage();
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, activeImage, images]);

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} onClick={toggleModal} />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>


      {isModalOpen && (
        <ModalOverlay onClick={toggleModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <LeftArrow onClick={prevImage}>←</LeftArrow>
            <ModalImage src={activeImage} alt="Full-size preview" />
            <RightArrow onClick={nextImage}>→</RightArrow>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}