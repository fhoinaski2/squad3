import { useState } from "react";
import PropTypes from "prop-types";
import { isPasswordValid, isFormValid } from "../../Services/PasswordValidate";
import { isCPFValid } from "../../Services/CpfValidate";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import InputMask from "react-input-mask";
import styles from "./UserForm.module.css";

const UserForm = ({
  user,
  handleSearchCep,
  handleSubmit,
  handleInputChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [touchedConfirmPassword, setTouchedConfirmPassword] = useState(false);
  const [ageError, setAgeError] = useState("");
  const [cpfError, setCPFError] = useState("");
  const [error, setError] = useState({
    cpf: "",
    password: "",
    confirmPassword: "",
  });

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordBlur = () => {
    setTouchedConfirmPassword(true);
  };

  const handleConfirmPasswordChange = (event) => {
    handleInputChange(event);
    setTouchedConfirmPassword(true);
  };

  const handleDateChange = (e) => {
    const dob = new Date(e.target.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    handleInputChange({
      ...e,
      target: { ...e.target, value: e.target.value },
    });

    if (age < 18) {
      setAgeError("Usuário deve ter pelo menos 18 anos.");
    } else {
      setAgeError("");
    }
  };

  const handleCPFChange = (e) => {
    const isValid = isCPFValid(e.target.value);
    handleInputChange({
      ...e,
      target: { ...e.target, value: e.target.value },
    });

    if (!isValid) {
      setCPFError("CPF inválido");
    } else {
      setCPFError("");
    }
  };

  const handlePhoneChange = (e) => {
    handleInputChange({
      ...e,
      target: { ...e.target, value: e.target.value },
    });
  };

  const handleCadastroClick = async () => {
    const cpfWithoutMask = user.cpf.replace(/[\D]/g, "");
    const phoneWithoutMask = user.phone.replace(/[\D]/g, "");

    if (
      isFormValid(user) &&
      isCPFValid(cpfWithoutMask) &&
      isPasswordValid(user.password)
    ) {
      const formattedUser = {
        user: {
          fullName: user.fullName,
          email: user.email,
          cpf: cpfWithoutMask,
          birthDate: user.birthDate,
          phone: phoneWithoutMask,
          password: user.password,
          typeUser: user.userType,
        },
        addresses: [
          {
            street: user.street,
            numberStreet: user.number,
            neighborhood: user.neighborhood,
            city: user.city,
            state: user.state,
            zip: user.zip.replace(/[\D]/g, ""), // Remove a formatação do CEP
            lat: user.latitude,
            long: user.longitude,
            ...(user.complement && { complement: user.complement }),
          },
        ],
      };

      try {
        await handleSubmit(formattedUser);
      } catch (error) {
        setError({ ...error, form: "Erro ao cadastrar usuário." });
      }
    } else {
      setError({
        cpf: !isCPFValid(cpfWithoutMask) ? "CPF inválido" : "",
        password: !isPasswordValid(user.password) ? "Senha inválida" : "",
        confirmPassword:
          user.password !== user.confirmPassword
            ? "As senhas não coincidem"
            : "",
        form: "Por favor, verifique os campos do formulário.",
      });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleCadastroClick();
          }}
        >
          {error.form && (
            <div className={styles.error_message2}>{error.form}</div>
          )}
          <div className={styles.flex_container}>
            <div className={styles.user_container}>
              <h3>Dados pessoais</h3>
              <div className={styles.input_group}>
                <div className={styles.input_box}>
                  <label htmlFor="fullName" className={styles.label}>
                    Nome Completo:
                  </label>

                  <input
                    className={styles.input_bigger}
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleInputChange}
                    placeholder="Nome Completo"
                    required
                  />
                </div>
                <div className={styles.input_box}>
                  <label htmlFor="email" className={styles.label}>
                    E-mail:
                  </label>
                  <input
                    className={styles.input_bigger}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email@email.com"
                    value={user.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.input_double}>
                  <div className={styles.input_box2}>
                    <label htmlFor="cpf">CPF:</label>
                    <InputMask
                      mask="999.999.999-99"
                      maskPlaceholder={null}
                      placeholder="somente números"
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={user.cpf}
                      onBlur={handleCPFChange}
                      onChange={handleInputChange}
                      required
                    />
                    {cpfError && (
                      <span className={`${styles.error_message}`}>
                        {cpfError}
                      </span>
                    )}
                  </div>
                  <div className={styles.input_box2}>
                    <label htmlFor="birthDate">Data de Nascimento:</label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={user.birthDate}
                      onBlur={handleDateChange}
                      onChange={handleInputChange}
                    />
                    {ageError && (
                      <span className={`${styles.error_message}`}>
                        {ageError}
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.input_box}>
                  <label htmlFor="phone" className={styles.label}>
                    Telefone:
                  </label>
                  <InputMask
                    className={styles.input_smaller}
                    mask="(99) 99999-9999"
                    maskPlaceholder={null}
                    placeholder="(99) 99999-9999"
                    type="text"
                    id="phone"
                    name="phone"
                    value={user.phone}
                    onBlur={handlePhoneChange}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.input_box}>
                  <label htmlFor="userType" className={styles.label}>
                    Tipo de Usuário:
                  </label>
                  <select
                    className={styles.select}
                    id="userType"
                    name="userType"
                    value={user.userType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="#">Selecione</option>
                    <option value="ADMIN">Administrador</option>
                    <option value="BUYER">Comprador</option>
                  </select>
                </div>
                <div className={styles.input_double}>
                  <div className={styles.input_box2}>
                    <label htmlFor="password">Senha:</label>
                    <div className={styles.input_password}>
                      <input
                        className={styles.input}
                        type={showPassword ? "text" : "password"}
                        placeholder="Senha"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={(e) => {
                          handleInputChange(e);
                          if (e.target.value) {
                            isPasswordValid(e.target.value);
                          }
                        }}
                        required
                      />
                      <span
                        className={styles.icon}
                        onClick={handleClick}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                      </span>
                    </div>

                    {!isPasswordValid(user.password) && user.password && (
                      <span className={styles.error_message}>
                        A Senha deve conter no mínimo 8 caracteres
                        incluindo:letra maiúscula, letra minúscula, número e
                        caractere especial.
                      </span>
                    )}
                  </div>
                  <div className={styles.input_box2}>
                    <label htmlFor="confirmPassword">Confirmar Senha:</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirmar Senha"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={user.confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      onBlur={handleConfirmPasswordBlur}
                    />
                  </div>
                  <div className={styles.messagePass}>
                    {touchedConfirmPassword &&
                      user.password !== user.confirmPassword && (
                        <div className={styles.error_container}>
                          <span className={styles.error_message}>
                            As senhas não coincidem
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.address_container}>
              <h3>Dados de endereço</h3>
              <div className={styles.input_group}>
                <div className={styles.input_box}>
                  <label htmlFor="zip" className={styles.label}>
                    CEP:
                  </label>
                  <InputMask
                    className={styles.input_smaller}
                    mask="99999-999"
                    maskPlaceholder={null}
                    placeholder="somente números"
                    type="text"
                    id="zip"
                    name="zip"
                    value={user.zip}
                    onChange={handleInputChange}
                    onBlur={handleSearchCep}
                    required
                  />
                </div>
                <div className={styles.input_box}>
                  <label className={styles.label}>Logradouro:</label>
                  <input
                    className={styles.input_bigger}
                    type="text"
                    id="street"
                    name="street"
                    value={user.street}
                    onChange={handleInputChange}
                    placeholder="Rua, Avenida, etc."
                    required
                  />
                </div>
                <div className={styles.input_box}>
                  <label className={styles.label}>Complemento:</label>
                  <input
                    className={styles.input_bigger}
                    type="text"
                    id="complement"
                    name="complement"
                    value={user.complement}
                    onChange={handleInputChange}
                    placeholder="Complemento"
                  />
                </div>
                <div className={styles.input_double}>
                  <div className={styles.input_box2}>
                    <label>Número:</label>
                    <input
                      type="text"
                      id="number"
                      name="number"
                      value={user.number}
                      onChange={handleInputChange}
                      placeholder="Número"
                      required
                    />
                  </div>
                  <div className={styles.input_box2}>
                    <label>Bairro:</label>
                    <input
                      type="text"
                      id="neighborhood"
                      name="neighborhood"
                      value={user.neighborhood}
                      onChange={handleInputChange}
                      placeholder="Bairro"
                      required
                    />
                  </div>
                </div>
                <div className={styles.input_double}>
                  <div className={styles.input_box2}>
                    <label>Cidade:</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={user.city}
                      onChange={handleInputChange}
                      placeholder="Cidade"
                      required
                    />
                  </div>
                  <div className={styles.input_box2}>
                    <label>Estado:</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={user.state}
                      onChange={handleInputChange}
                      placeholder="Estado"
                      required
                    />
                  </div>
                </div>
                <div className={styles.input_double}>
                  <div className={styles.input_box2}>
                    <label>Latitude:</label>
                    <input
                      type="text"
                      id="latitude"
                      name="latitude"
                      value={user.latitude}
                      onChange={handleInputChange}
                      placeholder="Latitude"
                    />
                  </div>
                  <div className={styles.input_box2}>
                    <label>Longitude:</label>
                    <input
                      type="text"
                      id="longitude"
                      name="longitude"
                      value={user.longitude}
                      onChange={handleInputChange}
                      placeholder="Longitude"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button_signup}>
            <button type="button" onClick={handleCadastroClick}>
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
  handleSearchCep: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default UserForm;
