import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FcCancel } from "react-icons/fc";
import { BsTrash } from "react-icons/bs";
import { TokenContext } from "../../context/context";
import Footer from "../Footer";
import Header from "../Header";
import Loading from "../Loading";
import Swal from "sweetalert2";

export default function Cart() {
  const { REACT_APP_API_URL } = process.env;
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(TokenContext);
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
      setTotal(res.data.totalOrder);
      setLoading(true);
    });
    res.catch(() => {
      console.log("Error");
    });
  }, [REACT_APP_API_URL, navigate, token]);
  async function payCart() {
    setLoading(false);
    try {
      await axios.post(
        `${REACT_APP_API_URL}/cart-payment`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire({ title: "Obrigado por comprar conosco!", icon: "success" });
      setLoading(true);
      navigate("/profile");
    } catch (res) {
      Swal.fire({
        title: "Houve um problema com o seu pagamento.",
        text: `Error ${res.response.status}: ${res.response.data}`,
        icon: "error",
      });
      setLoading(true);
    }
  }
  function deleteExpense(id) {
    Swal.fire({
      title: "Quer mesmo retirar este item?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim!",
      confirmButtonColor: "green",
      cancelButtonText: "Não.",
      cancelButtonColor: "red",
    }).then(async (result) => {
      if (!result.isConfirmed) {
        return Swal.close();
      } else {
        setLoading(true);
        try {
          const res = await axios.delete(`${REACT_APP_API_URL}/cart/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const newCart = res.data;
          setLoading(false);
          setCart(newCart);
          setTotal(res.data.totalOrder);
        } catch (res) {
          Swal.fire({
            title: "Houve um problema com o seu pagamento.",
            text: `Error ${res.response.status}: ${res.response.data}`,
            icon: "error",
          });
          setLoading(false);
        }
        return;
      }
    });
  }
  function clearCart() {
    Swal.fire({
      title: "Quer esvaziar o seu carrinho?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim!",
      confirmButtonColor: "green",
      cancelButtonText: "Não.",
      cancelButtonColor: "red",
    }).then(async (result) => {
      if (!result.isConfirmed) {
        return Swal.close();
      } else {
        setLoading(true);
        try {
          const res = await axios.delete(`${REACT_APP_API_URL}/cart`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const newCart = res.data;
          setLoading(false);
          setCart(newCart);
          setTotal(res.data.totalOrder);
        } catch (res) {
          Swal.fire({
            title: "Houve um problema com o seu pagamento.",
            text: `Error ${res.response.status}: ${res.response.data}`,
            icon: "error",
          });
          setLoading(false);
        }
        return;
      }
    });
  }
  if (!loading) {
    return <Loading />;
  }
  return (
    <ContainerStyle>
      <Header />
      {cart.order.length === 0 ? (
        <aside>
          <article>Você não selecionou nenhum item ainda!</article>{" "}
          <article onClick={() => navigate("/")}>Voltar para a home?</article>
        </aside>
      ) : (
        <>
          <aside>
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
                  <h2>
                    R${" "}
                    {i.valueItem.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </h2>
                </div>
                <div>
                  <FcCancel
                    onClick={() => {
                      deleteExpense(i.idItem);
                    }}
                  />
                </div>
              </ItemStyle>
            ))}
          </aside>
          <main>
            <button>
              <h1 onClick={() => payCart()}>PAGAR!</h1>
            </button>
            <h3>
              TOTAL: R${" "}
              {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </h3>
            <div>
              <BsTrash
                onClick={() => {
                  clearCart();
                }}
              />
            </div>
          </main>
        </>
      )}
      <Footer />
    </ContainerStyle>
  );
}

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 150px);
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
  button {
    box-shadow: 0px 3px 2px 2px rgba(0, 0, 0, 0.3);
    background-color: #f9d342;
    color: #292826;
    border: none;
    height: fit-content;
    width: 30%;
    padding-top: 10px;
    margin: 10px;
    border-radius: 10px;
    cursor: pointer;
  }
  button:hover {
    box-shadow: 0px 3px 2px 2px rgba(0, 0, 0, 0.6);
  }
  aside {
    flex-direction: column;
    justify-content: center;
  }
  main {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  main div {
    cursor: pointer;
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
