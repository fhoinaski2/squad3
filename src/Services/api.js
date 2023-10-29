import axios from "axios";
import queryString from "query-string";

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_HOST_API,
});

// Autenticação
export const loginUser = async (email, password) => {
  try{
    const response = await api.post("/user/login", { email, password });

  return response;
  }catch(error){
    return error.response;
  }
};

export const loginAdmin = async (email, password) => {
  const response = await api.post("/user/admin/login", { email, password });
  return response;
};

// Usuários
export const signupUser = async (payload) => {
  try {
    const response = await api.post("/user/signup", payload);
    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Realiza o cadastro de um novo usuário com informações e endereço.
 *
 * @param {object} payload - Dados para o cadastro.
 * @param {object} payload.user - Informações do usuário.
 * @param {string} payload.user.fullName - Nome completo do usuário.
 * @param {string} payload.user.email - Endereço de e-mail do usuário.
 * @param {string} payload.user.cpf - CPF do usuário.
 * @param {string} payload.user.birthDate - Data de nascimento do usuário (no formato "YYYY-MM-DD").
 * @param {string} payload.user.phone - Número de telefone do usuário.
 * @param {string} payload.user.password - Senha do usuário.
 * @param {string} payload.user.typeUser - Tipo de usuário (por exemplo, "ADMIN").
 * @param {object[]} payload.addresses - Lista de endereços associados ao usuário.
 * @param {string} payload.addresses.street - Rua do endereço.
 * @param {number} payload.addresses.numberStreet - Número do endereço.
 * @param {string} payload.addresses.complement - Complemento do endereço.
 * @param {string} payload.addresses.neighborhood - Bairro do endereço.
 * @param {string} payload.addresses.city - Cidade do endereço.
 * @param {string} payload.addresses.state - Estado do endereço.
 * @param {string} payload.addresses.zip - CEP do endereço.
 * @param {string} payload.addresses.lat - Latitude do endereço (opcional).
 * @param {string} payload.addresses.long - Longitude do endereço (opcional).
 * @returns {Promise} Uma promessa que representa o resultado da operação de cadastro.
 */
export const signupAdmin = async (token, payload) => {
  try {
    const response = await api.post("/user/admin/signup", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const getUserAddresses = async (token) => {
  const response = await api.get("/buyers/address", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
/**
 * @param {string} token - Token JWT de autenticação
 * @param {object} PageParams - Parâmetros da requisição- exemplo: {offset: 0, limit: 20}
 * @param {number} PageParams.offset - inicio da paginação
 * @param {number} PageParams.limit - fim da paginação
 */
export const listUsers = async (token, PageParams) => {
  if (
    !PageParams ||
    typeof PageParams !== "object" ||
    PageParams.offset === undefined ||
    PageParams.limit === undefined
  ) {
    throw new Error(
      'Parâmetros de paginação inválidos. "offset" e "limit" são obrigatórios.'
    );
  }

  if (
    typeof PageParams.offset !== "number" ||
    typeof PageParams.limit !== "number" ||
    PageParams.offset < 0 ||
    PageParams.limit <= 0
  ) {
    throw new Error(
      'Valores inválidos para "offset" e "limit". Eles devem ser números inteiros positivos.'
    );
  }

  const { offset = 0, limit = 20 } = PageParams || {};
  const response = await api.get(`/buyers/admin/${offset}/${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const getUserById = async (token, userId) => {
  const response = await api.get(`/buyers/admin/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updateUser = async (token, dataUpdateUser) => {
  console.log(dataUpdateUser.userId);
  const response = await api.patch(
    `/buyers/admin/${dataUpdateUser.userId}`,
    dataUpdateUser.userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

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
export const cadastrarProduto = async (token, cadastrarProduto) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.post(
      "/products/admin",
      cadastrarProduto,
      config
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

export const uploadImage = async (token, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.post("/upload", formData, config);

    return response;
  } catch (error) {
    return error.response;
  }
};

/**
 * Lista produtos para o admin
 *
 * @param {string} token - Token JWT de autenticação
 * @param {object} params - Parâmetros da requisição- exemplo: {offset: 0, limit: 20, name: 'Produto', typeProduct: 'Bebida', totalStock: 'asc'}
 * @param {number} params.offset - Offset para paginação
 * @param {number} params.limit - Limite de resultados
 * @param {string} params.name - Filtro por nome do produto
 * @param {string} params.typeProduct - Filtro por tipo de produto
 * @param {string} params.totalStock - Filtro por estoque total - enum: ['asc', 'desc']
 *
 */
export const listProducts = async (params) => {
  const { offset = 0, limit = 20 } = params || {};
  const query = queryString.stringify(
    {
      name: params?.name,
      typeProduct: params?.typeProduct,
      totalStock: params?.totalStock,
    },
    {
      skipEmptyString: true,
    }
  );
  const baseUrl = `/products/${offset}/${limit}`;
  const concatQuery = `?${query}`;

  const url = baseUrl + concatQuery;
  const response = await api.get(url);

  
  return response;
};

/**
 * Lista produtos para o admin
 *
 * @param {string} token - Token JWT de autenticação
 * @param {object} params - Parâmetros da requisição- exemplo: {offset: 0, limit: 20, name: 'Produto', typeProduct: 'Controlado', totalStock: 'asc'}
 * @param {number} params.offset - Offset para paginação
 * @param {number} params.limit - Limite de resultados
 * @param {string} params.name - Filtro por nome do produto
 * @param {string} params.typeProduct - Filtro por tipo de produto - enum: ['Controlado', 'Não controlado']
 * @param {string} params.totalStock - Filtro por estoque total - enum: ['asc', 'desc']
 *
 */
export const listAdminProducts = async (token, params) => {
  const { offset = 0, limit = 20 } = params || {};

  const query = queryString.stringify(
    {
      name: params?.name,
      typeProduct: params?.typeProduct,
      totalStock: params?.totalStock,
    },
    {
      skipEmptyString: true,
    }
  );
  const baseUrl = `/products/admin/${offset}/${limit}`;
  const concatQuery = `?${query}`;

  const url = baseUrl + concatQuery;

  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

/**
 * @param {string} token - Token JWT de autenticação
 * @param {string} productId - ID do produto
 */

export const getProductById = async (token, productId) => {
  const response = await api.get(`/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

/**
 * @param {object} updateProduct - Dados do produto a ser atualizado
 * @param {string} updateProduct.id - ID do produto
 * @param {string} updateProduct.name - Nome do produto
 * @param {string} updateProduct.imageLink - link da imagem do produto
 * @param {number} updateProduct.dosage - dosagem do produto
 * @param {number} updateProduct.totalStock - Total de estoque do produto - obrigatorio
 */
export const updateProduct = async (token, updateProduct) => {
  const response = await api.patch(
    `/products/admin/${updateProduct.id}`,
    updateProduct.product,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

/**
 * @param {Object[]} orders - Lista de pedidos deve estar dentro de um array
 * @param {number} orders[].productId - ID do produto
 * @param {number} orders[].amountBuy - Quantidade comprada
 * @param {number} orders[].addressId - ID do endereço de entrega
 * @param {string} orders[].typePayment - Tipo de pagamento
 */

// Vendas
export const createSale = async (token, orders) => {
  const response = await api.post("/sales", orders, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getUserSales = async (token) => {
  const response = await api.get("/sales", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getAdminSales = async (token) => {
  const response = await api.get("/sales/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getSalesDashboard = async (token) => {
  const response = await api.get("/sales/dashboard/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getSaleById = async (token, saleId) => {
  const response = await api.get(`/sales/${saleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const getCep = async (cep) => {
  const urlCep1 = `https://viacep.com.br/ws/${cep}/json/`;
  const urlCep2 = `https://brasilapi.com.br/api/cep/v2/${cep}`;

  const response = await api.get(urlCep2);
  console.log(response);
  console.log(response.type);
  if (response.type === "service_error") {
    await api.get(urlCep1);
    return {
      cep: response.data.cep,
      street: response.data.bairro,
      neighborhood: response.data.logradouro,
      city: response.data.localidade,
      state: response.data.uf,
    };
  }
  return response.data;
};
