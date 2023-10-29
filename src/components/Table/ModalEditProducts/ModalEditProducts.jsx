import React from "react";
import styles from "./ModalEditProducts.module.css";
import { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import LoadingSpinner from "../../Loading_Snipper/Loading_Snipper";
import useAuth from "../../../hooks/useAuth";

const ModalEditProducts = ({ productId, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [dosage, setDosage] = useState('');
    const [totalStock, setTotalStock] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [loading, setLoading] = useState(true);
    const [typeDosage, setTypeDosage] = useState('');
    const [error, setError] = useState({
        input: '',
        error: '',
    });

    const { logout } = useAuth();
    const { updateProduct, uploadImage, getProductById } = useApi();


    useEffect(() => {
        fetchUser(productId);
    }, [productId]);



    const fetchUser = async (productId) => {
        const { data } = await getProductById(productId);
        setName(data.produto.name);
        setImageLink(data.produto.imageLink);
        setDosage(data.produto.dosage);
        setTotalStock(data.produto.totalStock);
        setUnitPrice(data.produto.unitPrice);
        setTypeDosage(data.produto.typeDosage)
        setLoading(false);

    };


    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            try {
                const response = await uploadImage(selectedImage);

                setImageLink(response.data.links[0]);
            } catch (error) {
                console.log(error);
                // logout()
            }
        }
    }



    const handleSave = async (e) => {
        e.preventDefault();


        const dataUpdateProduct = {
            id:productId,
            product:{
                name,
                imageLink,
                dosage,
                totalStock,
                unitPrice
            }
           
        }
        const update = await updateProduct(dataUpdateProduct);
        switch (update.status) {
            case 204:
                onSave();
              break;
          }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Editar Produto</h2>
                {loading ? <LoadingSpinner /> :
                    <form>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Nome:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputImagem}>
                            <label htmlFor="imageLink">Imagem:</label>
                            <div className={styles.modalImg}><img src={imageLink} alt="" /></div>

                            <input
                                type="file"
                                name="imageLink"
                                id="imageLink"
                                accept="image/*" onChange={handleImageChange} />

                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="dosage">Dosagem:</label>
                            <div className={styles.inputDosage}>
                                <input
                                    type="number"
                                    id="dosage"
                                    value={dosage}
                                    onChange={(e) => setDosage(e.target.value)}
                                />
                                <p>{typeDosage}</p>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="totalStock">Total em Estoque:</label>
                            <input
                                type="number"
                                id="totalStock"
                                value={totalStock}
                                onChange={(e) => {
                                    setTotalStock(e.target.value);
                                    setError('');
                                }}

                                onBlur={(e) => {
                                    if (totalStock <= 0) {
                                        setError({
                                            input: "stock",
                                            error: 'Não é permito estoque igual a zero.'
                                        });
                                    }
                                }}

                            />
                            {error.input === "stock" ? <div className={styles.error}>{error.error}</div> : null}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="unitPrice">Preço Unitário:</label>
                            <div className={styles.inputUnitPrice}>
                                <p>R$:</p>
                                <input
                                    type="number"
                                    id="unitPrice"
                                    value={unitPrice}
                                    onChange={(e) => {
                                        setUnitPrice(e.target.value);
                                        setError('');
                                    }}
                                    onBlur={(e) => {
                                        if (unitPrice <= 0) {
                                            setError({
                                                input: "price",
                                                error: 'Não é possivel produto com valor 0.'
                                            });
                                        }
                                    }}

                                />
                            </div>
                            {error.input === "price" ? <div className={styles.error}>{error.error}</div> : null}
                        </div>
                        <div className={styles.modalButtons}>
                            <button className={styles.buttonCancel} onClick={onClose}>Cancel</button>
                            <button 
                            className={styles.buttonSave} 
                            onClick={handleSave}
                            disabled={error.input}

                            >Salvar</button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
};

export default ModalEditProducts;
