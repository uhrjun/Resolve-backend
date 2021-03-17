import React from "react";
import styled, { keyframes } from "styled-components";
import { FiX } from "react-icons/fi";

const fadeIn = keyframes`
  0% {
    opacity:0;
    }
  100% {
    opacity:1;
    }
  `;

const scaleIn = keyframes`
  0%{transform: scale(0);}
  100%{transform: scale(1);}
  `;

const Overlay = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 0;
  animation: ${fadeIn} ease 0.3s;
`;
const Content = styled.div`
  transform: translate(0%, 0%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: fit-content;
  padding: 2em;
  background-color: white;
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.02);
  box-shadow: 0 15px 20px rgb(0 0 0 / 50%);
  z-index: 1;
  animation: ${scaleIn} linear 0.15s;
`;

const Modal = (props) => {
  const { closeModal } = props;
  const closeicon = () => (
    <FiX
      onClick={closeModal}
      style={{
        fontWeight: "bold",
        fontSize: "20px",
        color: "#000",
        padding: "10px",
        cursor: "pointer",
        backgroundColor: "transparent",
        border: 0,
        position: "absolute",
        top: "0%",
        right: "0%",
      }}
    />
  );

  return (
    <Overlay>
      <Content>
        {closeicon()}
        {props.children}
      </Content>
    </Overlay>
  );
};

export default Modal;
