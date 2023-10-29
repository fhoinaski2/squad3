import styles from './DashBoardIndex.module.css'
import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useApi from "../../../hooks/useApi";

const DashBoardIndex = () => {
  const { token } = useAuth();
  const [salesData, setSalesData] = useState([]);
  const { getSalesDashboard } = useApi();

  useEffect(() => {
    const fetchSalesData = async () => {
      const data = await getSalesDashboard(token);
      setSalesData(data);
    };
    fetchSalesData();
  }, [token]);

  const getTotalSales = () => {
    if (!Array.isArray(salesData)) {
      return 0;
    }
  
    let totalSales = 0;
    salesData.forEach((sale) => {
      totalSales += sale.total || 0;
    });
    return totalSales;
  };
  
  const getTotalProductsSold = () => {
    if (!Array.isArray(salesData)) {
      return 0;
    }
  
    let totalProductsSold = 0;
    salesData.forEach((sale) => {
      totalProductsSold += sale.products.reduce((acc, product) => acc + (product.quantity || 0), 0);
    });
    return totalProductsSold;
  };

  return (
    <div className={styles.card}>
      <h2 >Relatório de Vendas</h2>
      <div className={styles.cardContainer}>
        <div>
          <h3>Total de Vendas  = {getTotalSales()}</h3>
    
        </div>
        <div>
          <h3>Produtos Vendidos  = {getTotalProductsSold()}</h3>
        
        </div>
      </div>
    </div>
  );
};

export default DashBoardIndex;