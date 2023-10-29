import Card from "../Card/Card";
import styles from "./ProductsPageIndex.module.css"
import useAuth from "../../hooks/useAuth";
import useFetchProducts from "../../hooks/useFecthProducts";
import LoadingSpinner from "../Loading_Snipper/Loading_Snipper";


function ProductsPageIndex() {

const { addToCart} = useAuth();


const { loading, error, products } = useFetchProducts();


const addProductToCart = (productData) => {
  
  addToCart(productData);

};





return (
  <div className={styles.containerProducts}>
    {loading ? (
      <LoadingSpinner />
    ) : (
      products.products && products.products.map(product => (
        <Card 
        key={product.id} 
        product={product} 
        addToCart={addProductToCart}
        />  
      ))
    )}
  </div>
);




}

export default ProductsPageIndex;