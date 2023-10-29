import { useState } from "react";
import useApi from "../../../hooks/useApi";
import styles from "./RegisterUser.module.css";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import ErroModal from "../../../components/Modal/ErroModal/ErroModal";


const RegisterUser = () => {
    const [cpf, setCpf] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [zip, setZip] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [erro, setErro] = useState({
        erro: false,
        mensagem: "",
    });
    const { signupUser } = useApi();
    const { getCep } = useApi();
    const navigate = useNavigate();

    const handleAssUser = () => {
        setCpf("");
        setBirthDate("");
        setFullName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setZip("");
        setState("");
        setCity("");
        setNeighborhood("");
        setStreet("");
        setNumber("");
        setComplement("");
        setLatitude("");
        setLongitude("");
    };

    const handleCepChange = async () => {
        const response = await getCep(zip.split("-").join(""));
        console.log(response);
        if (response) {
            setState(response.state);
            setCity(response.city);
            setNeighborhood(response.neighborhood);
            setStreet(response.street);
            setLatitude(response.location.coordinates.latitude);
            setLongitude(response.location.coordinates.longitude);
        } else {
            alert("Invalid response:", response);
        }
    };

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isPasswordValid(password)) {
            return setErro({
                erro: true,
                typeErro: "Senha invalida",
                mensagem: "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número",
               });
        }

        const newUser = {
            user: {
                cpf: cpf.replace(/[^0-9]/g, ""),
                birthDate: birthDate.split("/").reverse().join("-"),
                fullName: fullName,
                email: email,
                phone: phone.replace(/\D/g, ""),
                password: password,
            },
            addresses: [
                {
                    zip: zip.split("-").join(""),
                    state: state,
                    city: city,
                    neighborhood: neighborhood,
                    street: street,
                    numberStreet: number,
                    ...(complement ? { complement } : {}),
                    lat: latitude,
                    long: longitude,
                },
            ],
        };



        const registerUser = await signupUser(newUser);
        console.log(registerUser.data);

        switch (registerUser.status) {
            case 201:
                handleAssUser();
                navigate("/");
                break;
            case 400:
                setErro({
                    erro: true,
                    typeErro: "Solicitação invalida",
                    mensagem: "Dados enviados incorretamente",
                   });
                break;
            case 409:
                setErro({
                    erro: true,
                    typeErro: "Dados enviados ja cadastrado",
                    mensagem: "Email ou cpf ja cadastrado",
                });
                break;
            case 422:
                setErro({
                    erro: true,
                    typeErro: "Erro de validação",
                    mensagem: "Verifique os dados enviados e tente novamente",
                });
                break;
            default:
                setErro({
                    erro: true,
                    mensagem: "Erro desconhecido",
                });
                break;
        }
    };

    return (
        <div className={styles.formUser}>
            <div>
                <h2 className={styles.titulo}>Cadastro do Usuário</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <div className={styles.grup1}>

                        <h4 className={styles.dataUser}>Dados do usuário</h4>

                        <div>
                            <label htmlFor="fullName">
                                Nome Completo
                            </label>
                            <input

                                type="text"
                                id="fullName"
                                value={fullName}
                                placeholder="Nome completo"
                                onChange={(event) => setFullName(event.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.groupInput}>
                            <div>
                                <label
                                    htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    placeholder="email@email.com"
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="phone">
                                    Telefone
                                </label>
                                <InputMask
                                    mask="(99)99999-9999"
                                    maskChar=""
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    placeholder="(48)99999-9999"
                                    id="phone"
                                    type="text"

                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.groupInput}>
                            <div>
                                <label htmlFor="cpf">
                                    CPF
                                </label>
                                <InputMask
                                    mask="999.999.999-99"
                                    maskChar=""
                                    value={cpf}
                                    onChange={(event) => setCpf(event.target.value)}
                                    placeholder="000.000.000-00"
                                    id="cpf"
                                    type="text"

                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="birthDate">
                                    Data Nascimento
                                </label>
                                <InputMask
                                    mask="99/99/9999"
                                    maskChar=""
                                    value={birthDate}
                                    onChange={(event) => setBirthDate(event.target.value)}
                                    placeholder="DD/MM/AAAA"
                                    id="birthDate"
                                    type="text"

                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password">
                                Senha
                            </label>
                            <input

                                type="password"
                                id="password"
                                value={password}
                                placeholder="Senha"
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>

                    </div>
                    <div className={styles.addresses}>
                        <div>
                            <h4 >Endereço Usuário</h4>
                        </div>
                        <div>
                            <label htmlFor="zip">
                                CEP
                            </label>
                            <InputMask

                                mask="99999-999"
                                maskChar=""
                                value={zip}
                                onChange={(event) => setZip(event.target.value)}
                                placeholder="88888-888"
                                id="zip"
                                type="text"
                                required
                                onBlur={handleCepChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="street">
                                Logradouro
                            </label>
                            <input

                                type="text"
                                id="street"
                                value={street}
                                placeholder="Logradouro"
                                onChange={(event) => setStreet(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="complement">
                                Complemento
                            </label>
                            <input

                                type="text"
                                id="complement"
                                value={complement}
                                placeholder="Complemento"
                                onChange={(event) => setComplement(event.target.value)}
                            />
                        </div>
                        <div className={styles.groupInput} >
                            <div>
                                <label htmlFor="neighborhood">
                                    Bairro
                                </label>
                                <input

                                    type="text"
                                    id="neighborhood"
                                    value={neighborhood}
                                    placeholder="Bairro"
                                    onChange={(event) => setNeighborhood(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="number">
                                    Número
                                </label>
                                <input

                                    type="text"
                                    id="number"
                                    value={number}
                                    placeholder="Número"
                                    onChange={(event) => setNumber(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles.groupInput}>
                            <div>
                                <label htmlFor="state">
                                    Estado
                                </label>
                                <input
                                    type="text"
                                    id="state"
                                    value={state}
                                    placeholder="Estado"
                                    onChange={(event) => setState(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="city">
                                    Cidade
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    value={city}
                                    placeholder="Cidade"
                                    onChange={(event) => setCity(event.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.groupInput}>

                            <div>
                                <label htmlFor="latitude">
                                    Latitude
                                </label>
                                <input

                                    type="text"
                                    id="latitude"
                                    value={latitude}
                                    placeholder="Latitude"
                                    onChange={(event) => setLatitude(event.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="longitude">
                                    Longitude
                                </label>
                                <input
                                    type="text"
                                    id="longitude"
                                    value={longitude}
                                    placeholder="Longitude"
                                    onChange={(event) => setLongitude(event.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.containerBtn}>
                    <button type="submit" className={styles.buttonUser}>
                        Cadastrar
                    </button>
                </div>
            </form>
            {erro.erro && (
                <ErroModal
                    mensagem={erro.mensagem}
                    typeErro={erro.typeErro}
                    onClose={() => setErro({ erro: false, mensagem: "" })}
                />)}
                
        </div>
    );
};

export default RegisterUser;
