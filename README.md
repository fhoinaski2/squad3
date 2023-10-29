![image](https://github.com/FullStack-Itaguacu/M3P-FrontEnd-Squad3/assets/115937834/4a1b0091-e19e-498e-b040-4e0c90f40177)


# Pharmalândia Medications

## Descrição do Projeto Pharmalândia Medications

Nossa equipe chamou a atenção dos gestores da empresa LabPharmacy Inc, uma renomada empresa do ramo de tecnologia farmacêutica, e com isso fomos convidados para desenvolver o site Pharmalândia Medications, um Marketplace de produtos farmacêuticos.

Este site proporcionará a oportunidade de cadastrar vendedores, usuários (compradores), comprar medicamentos e efetuar o registro de compradores e vendedores. Os vendedores terão a capacidade de monitorar suas vendas, enquanto os compradores poderão acompanhar suas compras anteriores com facilidade.

## Tecnologias Utilizadas

O frontend do Pharmalândia Medications foi desenvolvido utilizando:

* Linguagem: JavaScript
* Frameword/Biblioteca: React
* Ferramenta pra criação: Vite

## Como executar o Pharmalândia Medications
1 - Clone o projeto

```sh
https://github.com/FullStack-Itaguacu/M3P-FrontEnd-Squad3.git
```

2 - Entre no diretório do projeto

```sh
cd M3P-FrontEnd-Squad3
```

3 - Instale as dependências

```sh
npm install
```

4 - Inicie o servidor

```sh
npm rum dev
```
## Rotas 
* Administrador:
- /login/admin - login  admin
- /admin/dashboard - dasboard admin
- /admin/dashboard/resumo - relatório de vendas admin
- /admin/dashboard/sales - vendas do admin
- /admin/dashboard/users - usuário cadastrados admin
- /admin/dashboard/register/user - adicionar um novo usuário
- /admin/dashboard/register/products - cadastrar um produto admin
- /admin/dashboard/products - produtos registrados do admin

* Usuário
- /login/user - login usuário
- /user/register - cadastrar um usuário
- /user/profile - página principal user
- /sales - finalizar compra (carrinho)
- /sales/buyers/addreess - enreços para entrega


## Melhorias Futuras

- Deletar ou desativar um produto, uma vez que o produto pode não estar mais disponível para comercialização ou por outras razões que justifiquem a exclusão.
- O vendedor deve receber um alerta quando algum produto estiver fora de estoque.
- Deletar ou desativar um administrador.
- Deletar ou desativar um usuário.
- Atualização de dados / endereço do usuário.
- Alteração de senha.
