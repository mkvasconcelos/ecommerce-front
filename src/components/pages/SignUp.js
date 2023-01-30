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

export default function SignUp() {
  const [pwd, setPwd] = useState("");
  const [repeatPwd, setRepeatPwd] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${REACT_APP_API_URL}/sign-up`, {
        email,
        name,
        phone,
        pwd,
        repeatPwd,
      });
      setLoading(false);
      Swal.fire({ title: "Cadastro concluído com sucesso!", icon: "success" });
      navigate("/sign-in");
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
          placeholder={"Nome"}
          value={name}
          setValue={setName}
        />
        <Input
          type={"email"}
          placeholder={"E-mail"}
          value={email}
          setValue={setEmail}
        />
        <Input
          type={"tel"}
          pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
          placeholder={"Telefone"}
          value={phone}
          setValue={setPhone}
        />
        <Input
          type={"password"}
          placeholder={"Senha"}
          value={pwd}
          setValue={setPwd}
        />
        <Input
          data-test="password"
          type={"password"}
          placeholder={"Confirme a senha"}
          value={repeatPwd}
          setValue={setRepeatPwd}
        />
        <Submit type="submit" value={"Cadastrar"}></Submit>
      </FormStyled>
      <h2 onClick={() => navigate("/sign-in")}>
        Já tem uma conta? Entre agora!
      </h2>
      <Footer />
    </ContainerSignStyled>
  );
}
