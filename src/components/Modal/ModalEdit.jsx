
import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";
import styles from './ModalEdit.module.css';

const ModalEdit = (props) => {
    const [name, setName] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [dosage, setDosage] = useState('');
    const [totalStock, setTotalStock] = useState('');
    const [editOk, setEditOk] = useState(false);
    const { updateProduct, uploadImage } = useApi();
    const { logout } = useAuth();
    const [isBuscar, setIsBuscar] = useState(false);


    const handleShowModal = () => {
        props.onShowModal();
    };
    const handleCloseModal = () => {
        props.onCloseModal();
    };

    const handleCloseModalOk = () => {
        setEditOk(false);
        setName('');
        setImageLink('');
        setDosage('');
        setTotalStock('');
        setIsBuscar(true);
        props.onCloseModalOk(isBuscar)
        props.onCloseModal();

    };


    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            try {
                const response = await uploadImage(selectedImage);
                setImageLink(response.links[0]);
            } catch (error) {
                console.log(error);
                logout()
            }
        }
    }

    async function haddlerEditProdutc(event) {
        event.preventDefault();

        const productUpdate = {
            id: props.data.id,
            name: name,
            imageLink: imageLink,
            dosage: parseInt(dosage),
            totalStock: parseInt(totalStock),
        };

        const editProduct = await updateProduct(productUpdate);

        if (editProduct.status === 204) {
            setEditOk(true);

        }
    }

    useEffect(() => {
        if (props.data) {
            setName(props.data.name);
            setImageLink(props.data.imageLink);
            setDosage(props.data.dosage);
            setTotalStock(props.data.totalStock);
        }
    }, [props.data])


    const { data, showModal } = props;

    return (
        <div>

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={handleCloseModal}>
                            &times;
                        </span>
                        {editOk ? (
                            <div className={styles.modalContent}>
                                <div className={styles.sucesso}>
                                    <h2>Produto editado com sucesso!</h2>
                                    <button onClick={handleCloseModalOk} className={styles.closeButton}>
                                        Fechar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <form className={styles.formModal} onSubmit={haddlerEditProdutc}>

                                    <label className={styles.titulos} htmlFor="nomeProduto"> Nome do Produto:</label>
                                    <input
                                        className={styles.inputProduto}
                                        type="text"
                                        name="nome-produto"
                                        id="nome-produto"
                                        placeholder="Nome do produto"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} />
                                    <label className={styles.titulos} htmlFor="imagemProduto">Imagem:</label>
                                    <input
                                        className={styles.inputImagem}
                                        type="file"
                                        name="imagem-produto"
                                        id="imagem-produto"

                                        accept="image/*" onChange={handleImageChange} />
                                    <label className={styles.titulos} htmlFor="dosagem-produto">Dosagem:</label>
                                    <input
                                        className={styles.inputProduto}
                                        type="number"
                                        name="dosagem-produto"
                                        value={dosage}
                                        id="dosagem-produto"
                                        placeholder="Dosagem"
                                        onChange={(e) => setDosage(e.target.value)} />
                                    <label className={styles.titulos} htmlFor="total-estoque">Quantidade:</label>
                                    <input
                                        className={styles.inputProduto}
                                        type="number"
                                        name="totalEstoque"
                                        value={totalStock}
                                        id="totalEstoque"
                                        placeholder="Total estoque"
                                        onChange={(e) => setTotalStock(e.target.value)} />
                                    <button type="submit" className={styles.saveButton}>
                                        Salvar
                                    </button>
                                </form>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalEdit;