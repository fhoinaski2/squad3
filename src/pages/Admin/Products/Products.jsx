import { useState } from "react";
import useApi from "../../../hooks/useApi";
import styles from "./Products.module.css"
import SucessoModal from "../../../components/Modal/SucessoModal/SucessoModal";
import ErroModal from "../../../components/Modal/ErroModal/ErroModal";


function NewProduct() {
    const [name, setName] = useState('');
    const [labName, setLabName] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [dosage, setDosage] = useState('');
    const [typeDosage, setTypeDosage] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [totalStock, setTotalStock] = useState('');
    const [typeProduct, setTypeProduct] = useState('');
    const [description, setDescription] = useState('');
    const { cadastrarProduto, uploadImage } = useApi();
    const [carregandoImagem, setCarregandoImagem] = useState(false);
    const [registerProduct, setRegisterProduct] = useState({
        error: false,
        success: false,
        message: '',
        typeErro: '',
    });


    const product = {
        name: name,
        labName: labName,
        imageLink: imageLink,
        dosage: parseInt(dosage),
        typeDosage: typeDosage,
        unitPrice: parseFloat(unitPrice),
        totalStock: parseInt(totalStock),
        typeProduct: typeProduct,
        description: description,
    };


    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];

        const response = await uploadImage(selectedImage);

        setImageLink(response.data.links[0]);
        setCarregandoImagem(true);

    }

    async function haddlerNewProduct(event) {
        event.preventDefault();

        try {
            const registerProduct = await cadastrarProduto(product);
console.log(registerProduct.data)
            switch (registerProduct.status) {
                case 201:
                    setRegisterProduct({
                        error: false,
                        success: true,
                        message: "Produto cadastrado com sucesso!",
                    });
                    break;
                case 400:
                    setRegisterProduct({
                        error: true,
                        success: false,
                        message: registerProduct.data.cause,
                        typeErro: registerProduct.data.message,
                    });
                    break;
                default:
                    break;
            }

        } catch (error) {
            console.error(error);

        }
    }

    return (
        <div className={styles.conatiner}>
            <div>
                <h2 >Cadastro de Produtos</h2>
            </div>

            <div className={styles.gridContainer}>

                <form onSubmit={haddlerNewProduct}>
                    <div >

                        <div>
                            <label htmlFor="nomeProduto"> Nome do Produto:<sup>*</sup></label>
                            <input
                                type="text"
                                name="nome-produto"
                                id="nome-produto"
                                placeholder="Nome do produto"
                                onChange={(e) => setName(e.target.value)}
                                required />
                        </div>



                        <div className={styles.groupInput}>
                            <div>
                                <label htmlFor="tipoProduto">Tipo Produto:<sup>*</sup></label>
                                <select
                                    name="tipo-produto"
                                    id="tipo-produto"
                                    onChange={(e) => setTypeProduct(e.target.value)}
                                    required>
                                    <option value="">Selecione</option>
                                    <option value="Não controlado">Não controlado</option>
                                    <option value="Controlado">Controlado</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="tipo-dosagem-produto">Tipo dosagem:<sup>*</sup></label>
                                <select
                                    name="tipo-dosagem"
                                    id="tipo-dosagem"
                                    onChange={(e) => setTypeDosage(e.target.value)}
                                    required>
                                    <option value="">Selecione</option>
                                    <option value="mg">mg</option>
                                    <option value="mcg">mcg</option>
                                    <option value="g">g</option>
                                    <option value="ml">ml</option>
                                    <option value="%">%</option>
                                    <option value="outro">outro</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className={styles.groupInput}>
                        <div>
                            <label htmlFor="dosagem-produto">Dosagem:<sup>*</sup></label>
                            <input
                                type="number"
                                name="dosagem-produto"
                                id="dosagem-produto"
                                placeholder="Dosagem"
                                value={dosage}
                                onChange={(e) => setDosage(e.target.value)}
                                onBlur={(e) => (e.target.value) === '' || (e.target.value) === "0" ? setDosage(1) : setDosage(e.target.value)}
                                required />
                        </div>

                        <div>
                            <label htmlFor="nome-laboratorio">Laboratório:<sup>*</sup></label>
                            <input
                                type="text"
                                name="nome-laboratorio"
                                id="nome-laboratorio"
                                placeholder="Laboratório"
                                onChange={(e) => setLabName(e.target.value)}
                                required />
                        </div>
                    </div>



                    <div className={styles.groupInput}>
                        <div >
                            <label htmlFor="total-estoque">Quantidade:<sup>*</sup></label>
                            <input
                                type="number"
                                name="totalEstoque"
                                id="totalEstoque"
                                placeholder="Total estoque"
                                value={totalStock}
                                onChange={(e) => setTotalStock(e.target.value)}
                                onBlur={(e) => (e.target.value) === '' || (e.target.value) === "0" ? setTotalStock(1) : setTotalStock(e.target.value)}
                                required />
                        </div>
                        <div>
                            <label htmlFor="preco-produto">Preço: R$ <sup>*</sup></label>
                            <input
                                type="number"
                                name="preco-produto"
                                id="preco-produto"
                                placeholder="Preço"
                                value={unitPrice}
                                onChange={(e) => setUnitPrice(e.target.value)}
                                onBlur={(e) => (e.target.value) === '' || (e.target.value) === "0" ? setUnitPrice(0.01) : setUnitPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>


                    <div>
                        <label htmlFor="imagemProduto">Imagem:<sup>*</sup></label>
                        <input
                            type="file"
                            name="imagem-produto"
                            id="imagem-produto"
                            accept="image/*"
                            onChange={handleImageChange}
                            required />
                    </div>

                    <div>
                        <label htmlFor="descricao-produto">Descrição:</label>
                        <textarea
                            name="descricao-produto"
                            id="descricao-produto"
                            placeholder="Descrição do medicamento"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className={styles.buttonProdutos}>
                        <button

                            disabled={!carregandoImagem}
                        >
                            {carregandoImagem ? "Cadastrar" : "Prrencha todos os campos obrigatórios"}
                        </button>

                    </div>

                </form>
            </div>
            {registerProduct.success && (
                <SucessoModal
                    mensagem='Produto cadastrado com sucesso!'
                    onClose={() => {
                        setRegisterProduct({ success: false, mensagem: "" });
                        window.location.reload();
                    }}

                />)}

            {registerProduct.error && (
                <ErroModal
                    mensagem={registerProduct.message}
                    typeErro={registerProduct.typeErro}
                    onClose={() => setRegisterProduct({ success: false, mensagem: "", typeErro: ""})}
                />)}
        </div>

    );
}
export default NewProduct