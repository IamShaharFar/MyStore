import { useEffect, useState, useMemo  } from "react";
import styles from "../Styles/Products.css";
import ProductsService from "../services/ProductsService";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const service = useMemo(() => new ProductsService(), []);
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await service.get();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, [service]);

  return (
    <section id="productsComponent" style={styles.container}>
      <div className="card-products">
        <div className="content-1">
          <h1>Products</h1>
        </div>
      </div>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.storeId}
              storeId={product.storeId}
              name={product.name}
              price={product.price}
              image={product.image}
              className="product-card"
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </section>
  );
};

export default Products;
