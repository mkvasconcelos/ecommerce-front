import React, { useContext, useState } from "react";
import Loading from "../Loading";
import Input from "../Input";
import Submit from "../Submit";
import { ContainerSignStyled, FormStyled } from "./styles";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { TokenContext } from "../../context/context";
import Swal from "sweetalert2";
import Header from "../Header";
import Footer from "../Footer";

export default function SignIn() {
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(TokenContext);
  const { state } = useLocation();
  let idItem = "";
  if (state) {
    idItem = state.idItem;
  }
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${REACT_APP_API_URL}/sign-in`, {
        email,
        pwd,
      });
      setLoading(false);
      setToken(res.data.token);
      if (idItem) {
        await axios.post(
          `${REACT_APP_API_URL}/cart/${idItem}`,
          {
            quantityItem: 1,
          },
          { headers: { Authorization: `Bearer ${res.data.token}` } }
        );
        navigate("/cart");
      } else {
        navigate("/");
      }
    } catch (res) {
      Swal.fire({
        title: "Houve um problema com o seu acesso.",
        text: `Error ${res.response.status}: ${res.response.data}`,
        icon: "error",
      });
      setLoading(false);
    }

    return;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <ContainerSignStyled>
      <Header />
      <FormStyled onSubmit={submit}>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          value={email}
          setValue={setEmail}
        />
        <Input
          type={"password"}
          placeholder={"Senha"}
          value={pwd}
          setValue={setPwd}
        />
        <Submit type="submit" value={"Entrar"}></Submit>
      </FormStyled>
      <h2 onClick={() => navigate("/sign-up", { state: { idItem } })}>
        Primeira vez? Cadastre-se!
      </h2>
      <Footer />
    </ContainerSignStyled>
  );
}
