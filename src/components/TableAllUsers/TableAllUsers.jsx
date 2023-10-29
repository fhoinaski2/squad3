import { useState, useEffect } from 'react';
import styles from './TableAllUsers.module.css';
import useApi from '../../hooks/useApi';
import LoadingSpinner from '../Loading_Snipper/Loading_Snipper';
import ModalEditUser from './ModalEditUser/ModalEditUser';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

const TableAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pagination, setPagination] = useState({
        offset: 0,
        limit: 20,
    });


    const { listUsers } = useApi();

    useEffect(() => {
        getUsers();
    }, [pagination]);

    
    const getUsers = async () => {
        setLoading(true);
        const response = await listUsers(pagination);
        setUsers(response.data.users);
        setPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setLoading(false);
        
    };

    const handleEditUser = (userId) => {
        setSelectedUser(userId);

    };

    const handlePagination = (type) => {
        if (type === 'prev') {
            setPage(prev => prev - 1);
            setPagination(prev => (
                {
                    ...prev,
                    offset: prev.offset - prev.limit
                }
            ));
        } else if (type === 'next') {
            setPage(prev => prev + 1);
            setPagination(prev => (
                { ...prev, offset: prev.offset + prev.limit }
            ));
        }
    }


    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    const handleSaveUser = () => {
        getUsers()
        setSelectedUser(null);
    };


    return (
        <>
            {loading ? (

                <div className={styles.loading}>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>CPF</th>
                                <th>Data de Nascimento</th>
                                <th>Nome Completo</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Tipo de Usuário</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                    <td>{user.id}</td>
                                    <td>{user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</td>
                                    <td>{user.birthDate.split('T')[0].split('-').reverse().join('-')}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}</td>
                                    <td>{user.typeUser}</td>
                                    <td>
                                        <button className={styles.actionButton} onClick={() => handleEditUser(user.id)}>Editar</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <div className={styles.buttonPagination}>
                        {page === 1? <span></span> :  <button onClick={() => handlePagination('prev')}>
                            <AiOutlineDoubleLeft />
                            Voltar
                        </button>}
                       
                       {page === totalPages? <span></span> : <button onClick={() => handlePagination('next')} >
                            Avançar
                            <AiOutlineDoubleRight />
                        </button>}
                        


                    </div>
                </div>)
            }
            {selectedUser && (
                <ModalEditUser userId={selectedUser} onClose={handleCloseModal} onSave={handleSaveUser} />
            )}
        </>
    );
};

export default TableAllUsers;
