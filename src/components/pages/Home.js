import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer";
import Header from "../Header";

export default function Home() {
  const { REACT_APP_API_URL } = process.env;
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const res = axios.get(`${REACT_APP_API_URL}/items`);
    res.then((res) => {
      setItems(res.data);
    });
    res.catch(() => {
      console.log("Error");
    });
  }, [REACT_APP_API_URL]);
  return (
    <ContainerStyle>
      <Header />
      {items.map((i) => (
        <ItemStyle
          key={i._id}
          onClick={() => {
            navigate(`/${i._id}`);
          }}>
          <img src={i.imageItem} alt={i.nameItem} />
          <div>
            <h2>
              <span>{i.nameItem}</span>
            </h2>
            <h2>R$ {i.valueItem}</h2>
          </div>
        </ItemStyle>
      ))}
      <Footer />
    </ContainerStyle>
  );
}

const ContainerStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
`;

const ItemStyle = styled.div`
  width: 300px;
  margin: 10px;
  box-shadow: 0px 3px 2px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  span {
    font-weight: 700;
  }
  img {
    width: 100%;
  }
  div {
    padding: 5px;
  }
`;
