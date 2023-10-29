import styles from "./Login.module.css";
import { useState } from "react";
import { MdEmail, MdVpnKey } from "react-icons/md";
import { Link } from 'react-router-dom';
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Loading_Snipper/Loading_Snipper";


function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erroLogin, setErroLogin] = useState("");
  const { userLogin } = useAuth();
  const handleLogin = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    const response = await userLogin(email, senha);
   
    switch (response.status) {
      case 200:
        window.location.href = "/user/profile";
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

    <div className={styles.contPrimario}>
      <div className={styles.imgLogin}>
        <img src="/imgLoginAdm.png" alt="" />
      </div>
      <div className={styles.containerDireita}>

        <div className={styles.imgContainer}>
          <img src="/screen.png" alt="" />
        </div>
        <h1 className={styles.titLogin}>Bem vindo</h1>
        <div className={styles.forEsquerda}>
          <form className={styles.forContainer} onSubmit={handleLogin}>

            <div className={styles.icon}>
              <label htmlFor="email">e-mail</label>
              <div>
                <MdEmail />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="digite seu email"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className={styles.icon}>
              <label htmlFor="password">senha</label>
              <div>
                <MdVpnKey />
                <input
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="digite sua senha"
                />
              </div>

            </div>
            <div className={styles.registerLink}>
              <p>
                Não tem cadastro? <Link to="/user/register">Cadastre-se</Link>
              </p>
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
      </div>
    </div>
  )
}

export default Login
