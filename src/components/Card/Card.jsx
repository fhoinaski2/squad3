import styles from "./Card.module.css";
import PropTypes from "prop-types";
import { useState, useCallback } from 'react';

const Card = ({ product, addToCart }) => {

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = useCallback(
        event => {
            setQuantity(event.target.value);
        },
        [] 
    );

    const addToCartHandler = useCallback(() => {
        addToCart({
            id: product.id,
            name: product.name,
            unitPrice: parseFloat(product.unitPrice),
            quantity: quantity, 
        });
    }, [addToCart, product, quantity]);

    return (
        <div className={styles.containerCard}>
            <div className={styles.cardTop}>
                <div className={styles.cardImg}>
                    <img src={product.imageLink} width="50px" alt="imagem medicamento" />
                </div>
                <h2>{product.name}</h2>
                <h3>{product.labName}</h3>
            </div>

            <div className={styles.cardBottom}>
                <h2>{`R$ ${product.unitPrice}`}</h2>
                <div className={styles.cardAddCar}>
                    <input
                    type="number"
                        onChange={handleQuantityChange}
                        value={quantity}
                    />
                    <button onClick={addToCartHandler}>
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        imageLink: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        labName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        unitPrice: PropTypes.string.isRequired,
    }).isRequired,
    addToCart: PropTypes.func.isRequired,
};

export default Card;
