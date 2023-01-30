import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NameContext, TokenContext } from "../../context/context";
import Footer from "../Footer";
import Header from "../Header";
import Loading from "../Loading";

export default function Profile() {
  const { REACT_APP_API_URL } = process.env;
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(TokenContext);
  const { name } = useContext(NameContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      return navigate("/sign-in");
    }
    const res = axios.get(`${REACT_APP_API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.then((res) => {
      setCart(res.data);
      setLoading(true);
    });
    res.catch(() => {
      console.log("Error");
    });
  }, [REACT_APP_API_URL, navigate, token]);
  if (!loading) {
    return <Loading />;
  }
  return (
    <ContainerStyle>
      <Header />
      <h1>Olá, {name}</h1>
      {cart.order.length === 0 ? (
        <aside>
          <article>Você não fez nenhuma compra conosco ainda.</article>{" "}
          <article onClick={() => navigate("/")}>Voltar para a home?</article>
        </aside>
      ) : (
        <>
          {cart.order.map((i) => (
            <ItemStyle key={i._id}>
              <img src={i.imageItem} alt={i.nameItem} />
              <div>
                <h2>
                  <span>{i.nameItem}</span>
                </h2>
              </div>
              <div>
                <h2>Qtd: {i.quantityItem}</h2>
              </div>
              <div>
                <h2>R$ {i.valueItem}</h2>
              </div>
            </ItemStyle>
          ))}
        </>
      )}
      <Footer />
    </ContainerStyle>
  );
}

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  margin-top: 100px;
  aside {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  article {
    margin-bottom: 10px;
  }
  article:last-child {
    cursor: pointer;
    color: #f9d342;
    text-decoration: underline;
  }

  h3 {
    margin: 10px;
    font-size: 20px;
  }
  @media (max-width: 400px) {
    button h1 {
      font-size: 20px;
    }
    h3 {
      font-size: 12px;
    }
  }
`;

const ItemStyle = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  box-shadow: 0px 3px 2px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  span {
    font-weight: 700;
  }
  img {
    width: 150px;
  }
  div {
    padding: 5px;
    display: flex;
    width: calc((90% - 150px) / 3);
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  div:last-child {
    width: 10%;
  }
  h2 {
    font-size: 20px;
  }
  @media (max-width: 400px) {
    img {
      width: 100px;
    }
    div {
      width: calc((90% - 50px) / 3);
    }
    h2 {
      font-size: 12px;
    }
  }
`;
