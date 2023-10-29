import { useState } from "react";
import * as api from "../Services/api";
import validateToken from "../utils/validateToken";

export default function useApi() {
  const [token, setToken] = useState("");

  async function getTokenFromStorage() {
    const getTokneStorage = await validateToken.getToken();
    try {
      return getTokneStorage;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function loginUser(email, password) {
    const response = await api.loginUser(email, password);
    setToken(response.token);
    localStorage.setItem("token", response.token);
  }

  async function loginAdmin(email, password) {
    const response = await api.loginAdmin(email, password);
    setToken(response.token);
    localStorage.setItem("token", response.token);
  }

  /**
   * Cadastra um novo usuário.
   *
   * @param {Object} payload Informações do usuário e endereço
   * @param {Object} payload.user Informações pessoais do usuário
   * @param {string} payload.user.fullName Nome completo do usuário
   * @param {string} payload.user.email E-mail do usuário
   * @param {string} payload.user.cpf CPF do usuário
   * @param {string} payload.user.birthDate Data de nascimento
   * @param {string} payload.user.phone Telefone do usuário
   * @param {string} payload.user.password Senha do usuário
   *
   * @param {object[]} payload.addresses Lista de endereços do usuário
   * @param {object} payload.addresses[].address Rua do endereço
   * @param {string} payload.addresses[].street Rua do endereço
   * @param {number} payload.addresses[].numberStreet Número do endereço
   * @param {string} payload.addresses[].complement Complemento do endereço
   * @param {string} payload.addresses[].neighborhood Bairro
   * @param {string} payload.addresses[].city Cidade
   * @param {string} payload.addresses[].state Estado
   * @param {string} payload.addresses[].zip CEP
   * @param {string} payload.addresses[].lat Latitude do endereço (opcional)
   * @param {string} payload.addresses[].long Longitude do endereço (opcional)
   *
   * @returns {Promise} Uma promessa que representa o resultado da operação de cadastro.
   */
  async function signupUser(payload) {
    return await api.signupUser(payload);
  }

  /**
   * Cadastra um novo usuário.
   *
   * @param {Object} payload Informações do usuário e endereço
   * @param {Object} payload.user Informações pessoais do usuário
   * @param {string} payload.user.fullName Nome completo do usuário
   * @param {string} payload.user.email E-mail do usuário
   * @param {string} payload.user.cpf CPF do usuário
   * @param {string} payload.user.birthDate Data de nascimento
   * @param {string} payload.user.phone Telefone do usuário
   * @param {string} payload.user.password Senha do usuário
   * @param {string} payload.user.typeUser Tipo de usuário (por exemplo, "ADMIN").
   *
   * @param {object[]} payload.addresses Lista de endereços do usuário
   * @param {object} payload.addresses[].address Rua do endereço
   * @param {string} payload.addresses[].street Rua do endereço
   * @param {number} payload.addresses[].numberStreet Número do endereço
   * @param {string} payload.addresses[].complement Complemento do endereço
   * @param {string} payload.addresses[].neighborhood Bairro
   * @param {string} payload.addresses[].city Cidade
   * @param {string} payload.addresses[].state Estado
   * @param {string} payload.addresses[].zip CEP
   * @param {string} payload.addresses[].lat Latitude do endereço (opcional)
   * @param {string} payload.addresses[].long Longitude do endereço (opcional)
   *
   * @returns {Promise} Uma promessa que representa o resultado da operação de cadastro.
   */
  async function signupAdmin(payload) {
    const token = await getTokenFromStorage();
    return api.signupAdmin(token, payload);
  }

  async function getUserAddresses() {
    const token = await getTokenFromStorage();
    return api.getUserAddresses(token);
  }

  /**

   * @param {string} token - Token JWT de autenticação
   * @param {object} PageParams - Parâmetros da requisição- exemplo: {offset: 0, limit: 20}
   * @param {number} PageParams.offset - inicio da paginação
   * @param {number} PageParams.limit - fim da paginação
   */

  async function listUsers(PageParams) {
    const token = await getTokenFromStorage();
    return api.listUsers(token, PageParams);
  }

  async function getUserById(userId) {
    const token = await getTokenFromStorage();
    return api.getUserById(token, userId);
  }

  async function updateUser(dataUpdateUser) {
    const token = await getTokenFromStorage();
    return api.updateUser(token, dataUpdateUser);
  }


  /**
   * @param {Object} cadastrarProduto
   * @param {string} cadastrarProduto.name - Nome do laboratório.
   * @param {string} cadastrarProduto.imageLink - Link da imagem.
   * @param {string} cadastrarProduto.typeDosage - Tipo de dosagem.
   * @param {number} cadastrarProduto.dosage - Dosagem.
   * @param {number} cadastrarProduto.unitPrice - Preço unitário.
   * @param {string} cadastrarProduto.typeProduct - Tipo do produto- enum: ['Controlado', 'Não controlado']
   * @param {number} cadastrarProduto.totalStock - Estoque total.
   */
  async function cadastrarProduto(cadastrarProduto) {
    const token = await getTokenFromStorage();
    return api.cadastrarProduto(token, cadastrarProduto);
  }

  async function uploadImage(imageFile) {
    const token = await getTokenFromStorage();
    if (!token) return false;
    return api.uploadImage(token, imageFile);
  }


   /**
   *
   *
   * @param {object} params - Parâmetros da requisição
   * @param {number} params.offset - Offset para paginação
   * @param {number} params.limit - Limite de resultados
   * @param {string} params.name - Filtro por nome do produto
   * @param {string} params.typeProduct - Filtro por tipo de produto
   *
   */
  async function listProducts(params) {
    return api.listProducts(params);
  }

  /**
   * Lista produtos para o admin
   *
   * @param {string} token - Token JWT de autenticação
   * @param {object} params - Parâmetros da requisição
   * @param {number} params.offset - Offset para paginação
   * @param {number} params.limit - Limite de resultados
   * @param {string} params.name - Filtro por nome do produto
   * @param {string} params.typeProduct - Filtro por tipo de produto
   *
   */
  async function listAdminProducts(params) {
    const token = await getTokenFromStorage();
    return api.listAdminProducts(token, params);
  }
  /** 
   * @param {number} productId - id do produto que sera procurado
   */
  async function getProductById(productId) {
    const token = await getTokenFromStorage();
    return api.getProductById(token, productId);
  }

  /**
   * @param {object} updateProduct - Dados do produto a ser atualizado
   * @param {string} updateProduct.id - ID do produto (obrigatório)
   * @param {string} updateProduct.name - Nome do produto (obrigatório)
   * @param {string} [updateProduct.imageLink] - Link da imagem do produto (opcional)
   * @param {number} [updateProduct.dosage] - Dosagem do produto (opcional)
   * @param {number} [updateProduct.totalStock] - Total de estoque do produto (opcional)
   */
  async function updateProduct(updateProduct) {
    const token = await getTokenFromStorage();
    return api.updateProduct(token, updateProduct);
  }

  /**
   * @param {Object[]} orders - Lista de pedidos deve estar dentro de um array
   * @param {number} orders[].productId - ID do produto
   * @param {number} orders[].amountBuy - Quantidade comprada
   * @param {number} orders[].addressId - ID do endereço de entrega
   * @param {string} orders[].typePayment - Tipo de pagamento
   */
  async function createSale(orders) {
    const token = await getTokenFromStorage();
    return api.createSale(token, orders);
  }

  async function getUserSales() {
    const token = await getTokenFromStorage();
    return api.getUserSales(token);
  }

  async function getAdminSales() {
    const token = await getTokenFromStorage();
    return api.getAdminSales(token);
  }

  async function getSalesDashboard() {
    const token = await getTokenFromStorage();
    return api.getSalesDashboard(token);
  }

  /**
   * @param {string} saleId - ID da venda
   */
  async function getSaleById(saleId) {
    const token = await getTokenFromStorage();
    return api.getSaleById(token, saleId);
  }

  async function getCep(cep) {
    return api.getCep(cep);
  }

  return {
    token,
    loginUser,
    loginAdmin,
    signupUser,
    getUserAddresses,
    listProducts,
    getProductById,
    listAdminProducts,
    updateProduct,
    createSale,
    getUserSales,
    getAdminSales,
    getSalesDashboard,
    getSaleById,
    listUsers,
    getUserById,
    updateUser,
    signupAdmin,
    cadastrarProduto,
    uploadImage,
    getCep,
  };
}
