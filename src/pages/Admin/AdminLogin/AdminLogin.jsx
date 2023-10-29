import styles from "./AdminLogin.module.css";
import { useState } from "react";
import { MdEmail, MdVpnKey } from "react-icons/md";
import useAuth from "../../../hooks/useAuth"
import LoadingSpinner from "../../../components/Loading_Snipper/Loading_Snipper";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroLogin, setErroLogin] = useState("");

  const [loading, setLoading] = useState(false);

  const { adminLogin } = useAuth();



  async function HandleLogin(e) {
    e.preventDefault();


    setLoading(true);
    const response = await adminLogin(email, senha);
    switch (response.status) {
      case 200:
        window.location.href = "/admin/dashboard/resumo";
        setLoading(false);
        break;
      case 401:
        setErroLogin(response.data.cause);
        setLoading(false);
        break;
      case 400:
        setErroLogin(response.data.cause);
        setLoading(false);
        break;
      case 403:
        setErroLogin(response.data.cause);
        setLoading(false);
        break;
      default:
        break;

    }
  }


  return (
    <div className={styles.containerPrimario}>
      <div className={styles.imagemContainer}>
        <img src="/screen.png" alt="" />
      </div>
      <h1 className={styles.tituloLogin}>Bem vindo</h1>
      <form className={styles.formContainer} onSubmit={HandleLogin}>
        <label htmlFor="email">e-mail</label>

        <div className={styles.icons}>
          <MdEmail />
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErroLogin("")
            }}
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email"
            autoComplete="off"
          />

        </div>
        <label htmlFor="password">senha</label>
        <div className={styles.icons}>
          <MdVpnKey />
          <input
            required
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
              setErroLogin("");
            }}
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
          />

        </div>

        {erroLogin && <p className={styles.erroLogin}>{erroLogin}</p>}

        {loading ? (

          <LoadingSpinner />
        ) : (
          <button className={styles.enviarLogin} type="submit" value="Entrar">
            Entrar
          </button>
        )}
      </form>

    </div>
  );
}

export default AdminLogin;
