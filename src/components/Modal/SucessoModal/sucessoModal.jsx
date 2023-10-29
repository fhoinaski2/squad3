
import styles from './SucessoModal.module.css';
import PropTypes from 'prop-types';


const SucessoModal = ({ mensagem, onClose }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Sucesso!</h2>
                <p>{mensagem}</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};




SucessoModal.propTypes = {
    mensagem: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default SucessoModal;



