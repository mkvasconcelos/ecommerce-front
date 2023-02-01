import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer";
import Header from "../Header";
import Loading from "../Loading";
import { TokenContext } from "../../context/context";
import Swal from "sweetalert2";

export default function Item() {
  const { idItem } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  const { REACT_APP_API_URL } = process.env;
  const [items, setItems] = useState("");
  const [otherItems, setOtherItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const res = axios.get(`${REACT_APP_API_URL}/items/${idItem}`);
    res.then((res) => {
      setLoading(true);
      setItems(res.data);
    });
    res.catch(() => {
      console.log("Error");
    });
    const res2 = axios.get(`${REACT_APP_API_URL}/items`);
    res2.then((res) => {
      setOtherItems(res.data);
    });
    res2.catch((res) => {
      console.log(res.status);
    });
  }, [REACT_APP_API_URL, idItem]);
  async function chooseItem() {
    setLoading(false);
    if (!token) {
      return navigate("/sign-in", { state: { idItem } });
    }
    try {
      await axios.post(
        `${REACT_APP_API_URL}/cart/${idItem}`,
        {
          quantityItem: 1,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/cart");
      setLoading(true);
    } catch (err) {
      Swal.fire({
        title: "Houve um problema.",
        text: `Error ${err}`,
        icon: "error",
      });
      setLoading(true);
    }
  }
  if (!loading) {
    return <Loading />;
  }
  return (
    <ContainerStyle>
      <Header />
      <main>
        <ItemStyle key={items._id}>
          <img src={items.imageItem} alt={items.nameItem} />
          <div>
            <div>
              <h2>
                <span>{items.nameItem}</span>
              </h2>
              <h2>
                R${" "}
                {items.valueItem.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </h2>
            </div>
            <button>
              <h1 onClick={chooseItem}>SELECIONAR!</h1>
            </button>
          </div>
        </ItemStyle>
        <aside>
          {otherItems.map((i) => (
            <OtherItemStyle
              key={i._id}
              disabled={i.quantityItem === 0}
              onClick={() => {
                navigate(`/${i._id}`);
              }}>
              <img src={i.imageItem} alt={i.nameItem} />
              <div>
                <h2>
                  <span>{i.nameItem}</span>
                </h2>
              </div>
            </OtherItemStyle>
          ))}
        </aside>
      </main>
      <Footer />
    </ContainerStyle>
  );
}

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  main {
    padding: 50px 0 50px 0;
  }
  aside {
    display: flex;
    width: 100%;
    overflow-x: scroll;
  }
`;

const ItemStyle = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  span {
    font-weight: 700;
  }
  img {
    width: 100%;
    border-radius: 10px;
  }
  h2 {
    font-size: 30px;
  }
  div {
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  div div {
    display: block;
  }
  button {
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
  @media (max-width: 400px) {
    button h1 {
      font-size: 20px;
    }
    h2 {
      font-size: 16px;
    }
  }
`;

const OtherItemStyle = styled.div`
  width: 100px;
  margin: 10px;
  box-shadow: 0px 3px 2px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  span {
    font-weight: 700;
  }
  img {
    width: 100%;
  }
  div {
    padding: 5px;
  }
  :hover {
    box-shadow: 0px 3px 2px 2px rgba(0, 0, 0, 0.5);
  }
`;
