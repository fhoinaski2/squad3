import styles from './DashboardHeader.module.css';
import  useAuth  from '../../hooks/useAuth';
import { useEffect, useState } from 'react';

const DashboardHeader = () => {
    const {user,onLoadUser} = useAuth();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const loadUser = async () => {
            await onLoadUser();
            setIsLoading(false);
        };

        if (isLoading) {
            loadUser();
        }
    }, [isLoading, onLoadUser]);


    return(
        <header className={styles.containeHeader}>
           
                <div className={styles.containerImagem}>
                    <img src="/screen.png" alt="" />
                </div>
                <div className={styles.containerText}>
                    <h1>Olá, {user.fullName}</h1>
                    <p>Seja bem-vindo ao Dashboard</p>
                </div>
           
        </header>
    )
}

export default DashboardHeader;