import styles from './ErroModal.module.css';
import PropTypes from 'prop-types';

const ErroModal = ({ typeErro,mensagem, onClose }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>{typeErro}</h2>
                <p>{mensagem}</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

ErroModal.propTypes = {
    mensagem: PropTypes.string.isRequired,
    typeErro: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ErroModal;


