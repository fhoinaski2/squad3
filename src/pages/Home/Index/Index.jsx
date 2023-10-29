
import Navbar from "../../../components/Navbar/Navbar";
import ProductsPageIndex from "../../../components/ProducstPageIndex/ProductsPageIndex";
import styles from "./Index.module.css"

export default function Index() {
  return (
    <div>
      <div>
        <header>
          <Navbar />
        </header>
      </div>
      <div className={styles.container}>
        <div className={styles.containerHeader}></div>
        <div className={styles.containerProducts}>
          <ProductsPageIndex />
        </div>
      </div>
    </div>
  )
}

// 

