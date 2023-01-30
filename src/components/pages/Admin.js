import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IncomeContext } from "../../context/context";
import Footer from "../Footer";
import Header from "../Header";
import Loading from "../Loading";
import { BsFillPlusSquareFill } from "react-icons/bs";

export default function Admin() {
  const { REACT_APP_API_URL } = process.env;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { income } = useContext(IncomeContext);
  const navigate = useNavigate();
  useEffect(() => {
    const res = axios.get(`${REACT_APP_API_URL}/items`);
    res.then((res) => {
      setItems(res.data);
      setLoading(true);
    });
    res.catch(() => {
      console.log("Error");
    });
  }, [REACT_APP_API_URL, navigate]);
  if (!loading) {
    return <Loading />;
  }
  return (
    <ContainerStyle>
      <Header />
      <main>
        <h2>Faturamento: R$ {income}</h2>
        {items.map((i) => (
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
            <div>
              <BsFillPlusSquareFill
                onClick={() => {
                  navigate("/admin-update", {
                    state: {
                      idItem: i._id,
                      nameItem: i.nameItem,
                      valueItem: i.valueItem,
                      imageItem: i.imageItem,
                    },
                  });
                }}
              />
            </div>
          </ItemStyle>
        ))}

        <div>
          <button>
            <h1
              onClick={() => {
                navigate("/admin-add");
              }}>
              ADICIONAR OUTROS MODELOS!
            </h1>
          </button>
        </div>
      </main>
      <Footer />
    </ContainerStyle>
  );
}

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    font-size: 30px;
    margin: 10px 0 10px 0;
  }
  main {
    padding: 60px 0 60px 0;
  }
  main div:last-child {
    display: flex;
  }
  button {
    margin: 20px auto 10px auto;
    box-shadow: 0px 3px 2px 2px rgba(0, 0, 0, 0.3);
    background-color: #f9d342;
    color: #292826;
    border: none;
    height: fit-content;
    padding-top: 10px;
    border-radius: 10px;
    cursor: pointer;
  }
  button:hover {
    box-shadow: 0px 3px 2px 2px rgba(0, 0, 0, 0.6);
  }
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
    width: 5%;
    cursor: pointer;
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
