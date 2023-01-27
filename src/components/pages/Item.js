import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer";
import Header from "../Header";
import Loading from "../Loading";

export default function Item() {
  const { idItem } = useParams();
  const { REACT_APP_API_URL } = process.env;
  const [items, setItems] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const res = axios.get(`${REACT_APP_API_URL}/items/${idItem}`);
    res.then((res) => {
      setItems(res.data);
      setLoading(true);
    });
    res.catch(() => {
      console.log("Error");
    });
  }, []);
  if (!loading) {
    return <Loading />;
  }
  return (
    <ContainerStyle>
      <Header />
      <ItemStyle key={items._id}>
        <img src={items.imageItem} alt={items.nameItem} />
        <div>
          <h2>
            <span>{items.nameItem}</span>
          </h2>
          <h2>R$ {items.valueItem}</h2>
        </div>
      </ItemStyle>
      <Footer />
    </ContainerStyle>
  );
}

const ContainerStyle = styled.div`
  display: flex;
  margin-top: 50px;
`;

const ItemStyle = styled.div`
  width: 100%;
  margin: 10px;
  cursor: pointer;
  span {
    font-weight: 700;
  }
  img {
    width: 100%;
  }
  h2 {
    font-size: 30px;
  }
  div {
    padding: 5px;
  }
`;
