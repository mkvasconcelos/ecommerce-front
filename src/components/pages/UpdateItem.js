import React, { useState } from "react";
import Loading from "../Loading";
import Input from "../Input";
import Submit from "../Submit";
import { ContainerSignStyled, FormStyled } from "./styles";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../Header";
import Footer from "../Footer";

export default function UpdateItems() {
  const { state } = useLocation();
  const [nameItem, setNameItem] = useState(state.nameItem);
  const [valueItem, setValueItem] = useState(state.valueItem);
  const [quantityItem, setQuantityItem] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${REACT_APP_API_URL}/items/${state.idItem}`, {
        nameItem,
        valueItem,
        imageItem: state.imageItem,
        quantityItem,
      });
      setLoading(false);
      Swal.fire({
        title: "Atualização concluído com sucesso!",
        icon: "success",
      });
      navigate("/admin");
    } catch (res) {
      Swal.fire({
        title: "Houve um problema.",
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
          type={"text"}
          placeholder={"Nome do modelo"}
          value={nameItem}
          setValue={setNameItem}
        />
        <Input
          type={"number"}
          placeholder={"Valor do modelo"}
          value={valueItem}
          setValue={setValueItem}
        />
        <Input
          type={"number"}
          placeholder={"Adição no estoque"}
          value={quantityItem}
          setValue={setQuantityItem}
        />
        <Submit type="submit" value={"Atualizar"}></Submit>
      </FormStyled>
      <Footer />
    </ContainerSignStyled>
  );
}
