import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TokenContext } from "../../context/context";
import Footer from "../Footer";
import Header from "../Header";
import Loading from "../Loading";

export default function Profile() {
  const { REACT_APP_API_URL } = process.env;
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const { token } = useContext(TokenContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      return navigate("/sign-in");
    }
    const res = axios.get(`${REACT_APP_API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.then((res) => {
      setOrders(res.data.order);
      setName(res.data.name);
      setLoading(true);
    });
    res.catch(() => {
      console.log("Error");
    });
  }, [REACT_APP_API_URL, navigate, token]);
  function date(date) {
    const year = date.split("-")[0];
    const month = date.split("-")[1];
    const day = date.split("-")[2].split("T")[0];
    return `${day}/${month}/${year}`;
  }
  if (!loading) {
    return <Loading />;
  }
  return (
    <ContainerStyle>
      <Header />
      <main>
        <h1>Olá, {name}</h1>
        {orders.length === 0 ? (
          <aside>
            <article>Você não fez nenhuma compra conosco ainda.</article>{" "}
            <article onClick={() => navigate("/")}>Voltar para a home?</article>
          </aside>
        ) : (
          <>
            {orders.map((o, index) => (
              <nav key={index}>
                <div>
                  <div>
                    Pedido #{index + 1} - Data: {date(o.date)}
                  </div>
                </div>
                <div>
                  {o.orders.map((i) => (
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
                        <h2>
                          R${" "}
                          {i.valueItem.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </h2>
                      </div>
                    </ItemStyle>
                  ))}
                </div>
              </nav>
            ))}
          </>
        )}
      </main>
      <Footer />
    </ContainerStyle>
  );
}

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  main {
    padding: 100px;
  }
  main h1 {
    color: #f9d342;
  }
  nav > div:first-child {
    padding: 10px 0 10px 0;
    display: flex;
    box-shadow: 0px 3px 2px 2px rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;
    cursor: pointer;
  }
  nav > div:first-child > div:last-child {
    margin-left: 20px;
    cursor: pointer;
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
    main {
      padding: 60px 10px 50px 10px;
    }
    h3 {
      font-size: 12px;
    }
  }
`;

const ItemStyle = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
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
