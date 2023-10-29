import React from "react";
import styles from "./ModalEditUser.module.css";
import { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import LoadingSpinner from "../../Loading_Snipper/Loading_Snipper";

const ModalEditUser = ({ userId, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [typeUser, setTypeUser] = useState('');
    const [loading, setLoading] = useState(true);

    const { getUserById,updateUser } = useApi();


    useEffect(() => {
        fetchUser(userId);
    }, [userId]);



    const fetchUser = async (userId) => {
        const { data } = await getUserById(userId);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'));
        setCpf(data.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'));
        setTypeUser(data.typeUser);
        setLoading(false);

    };


    const handleSave = async (e) => {
        e.preventDefault();
    
       
        const dataUpdateUser = {
            userId: userId,
            userData:{
                fullName:name,
                email,
                cpf:cpf.replace(/\D/g, ""),
                phone:phone.replace(/\D/g, ""),
                typeUser
            }
        }

        const updateDataUer = await updateUser(dataUpdateUser);
        console.log(updateDataUer);
        onSave();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Editar Usuario</h2>
                {loading? <LoadingSpinner /> : 
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
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone">Telefone:</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="cpf">Cpf:</label>
                        <input
                            type="text"
                            id="cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="typeUser">Tipo de Usuario:</label>
                        <select name="typeUser" id="typeUser" value={typeUser} onChange={(e) => setTypeUser(e.target.value)} >
                            <option value="ADMIN">ADMIN</option>
                            <option value="BUYER">BUYER</option>
                        </select>
                    </div>
                <div className={styles.modalButtons}>
                    <button  className={styles.buttonCancel} onClick={onClose}>Cancel</button>
                    <button className={styles.buttonSave}  onClick={handleSave}>Salvar</button>
                </div>
                </form>
}
            </div>
        </div>
    );
};

export default ModalEditUser;
