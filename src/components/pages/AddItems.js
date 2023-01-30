import React, { useState } from "react";
import Loading from "../Loading";
import Input from "../Input";
import Submit from "../Submit";
import { ContainerSignStyled, FormStyled } from "./styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../Header";
import Footer from "../Footer";

export default function AddItems() {
  const [nameItem, setNameItem] = useState("");
  const [imageItem, setImageItem] = useState("");
  const [valueItem, setValueItem] = useState("");
  const [quantityItem, setQuantityItem] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${REACT_APP_API_URL}/items`, {
        nameItem,
        imageItem,
        valueItem,
        quantityItem,
      });
      setLoading(false);
      Swal.fire({ title: "Cadastro concluído com sucesso!", icon: "success" });
      navigate("/admin");
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
          type={"text"}
          placeholder={"Nome do modelo"}
          value={nameItem}
          setValue={setNameItem}
        />
        <Input
          type={"url"}
          placeholder={"URL da imagem"}
          value={imageItem}
          setValue={setImageItem}
        />
        <Input
          type={"number"}
          placeholder={"Valor do modelo"}
          value={valueItem}
          setValue={setValueItem}
        />
        <Input
          type={"number"}
          placeholder={"Estoque"}
          value={quantityItem}
          setValue={setQuantityItem}
        />
        <Submit type="submit" value={"Cadastrar"}></Submit>
      </FormStyled>
      <Footer />
    </ContainerSignStyled>
  );
}
