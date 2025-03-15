import styled from "styled-components";

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;


export const BigImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;


export const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;


export const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${({ active }) =>
    active
      ? `
    border-color: #ccc;
  `
      : `
    border-color: transparent;
  `}
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;


export const BigImageWrapper = styled.div`
  text-align: center;
`;


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;


export const ModalContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;


export const ModalImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 10px;
`;


export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  font-size: 24px;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

export const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

export const RightArrow = styled(ArrowButton)`
  right: 10px;
`;