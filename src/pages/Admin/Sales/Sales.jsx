import React, { useState, useEffect } from 'react' 
import useAuth  from '../../../hooks/useAuth'
import useApi from '../../../hooks/useApi'
import styles from "./Sales.module.css"

const Sales = () => {
    const [sales, setSales] = useState([])
    const { getAdminSales } = useApi()
    const { token } = useAuth();

    useEffect(() => {
        const fetchSales = async () => {
            const data = await getAdminSales(token)
            setSales(data)
        }
        fetchSales()
    }, [token])

    return (
        <div>
            <div className={styles.titulo}>
            <h1>Vendas</h1>
            </div>

            <div className={styles.cardSales}>
            {sales.map((sale) => (
                <div className={styles.cardSalesBloco} key={sale.productId}>
                    <h2>{sale.name}</h2>
                    <img src={sale.imageLink} alt={sale.name} />
                    <p>Quantidade de itens vendidos: {sale.amountBuy}</p>
                    <p>Preço unitário: R${sale.unitPrice.toFixed(2)}</p>
                    <p>Valor total das vendas: R${sale.total.toFixed(2)}</p>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Sales