import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./productDetails.module.scss";
import { Product } from "../types/product";
import Loading from "../components/loading/loading";
import productDetailImg from "./switches.jpeg";
import Button from "../components/button/button";
import ReviewInput from "../components/reviewInput/reviewInput";
import { getProductById } from "../../service/products/productService";

const ProductDetails = () => {
  let { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>();
  useEffect(() => {
    setTimeout(() => {
      const { product } = getProductById(id);
      setProduct(product);
    }, 1000);
  });

  const placeholders = {
    sm: <div className={`${styles.placeholderSm} ${styles.placeholder}`}></div>,
    md: <div className={`${styles.placeholderMd} ${styles.placeholder}`}></div>,
    text: (
      <div className={`${styles.placeholderText} ${styles.placeholder}`}></div>
    ),
  };
  return (
    <Grid container spacing={2} className={styles.pdpContainer} mt={3}>
      {!product && <Loading></Loading>}
      <Grid item xs={12} md={6} justifyContent="center" alignItems="center">
        <img className={styles.productDetailImg} src={productDetailImg} />
      </Grid>
      <Grid item xs={12} md={6} justifyContent="center" alignItems="center">
        <div className={styles.pdpHeader}>
          {product ? <p>{product.store.name}</p> : placeholders.sm}
          {product ? <h3>{product.productName}</h3> : placeholders.md}
          {product ? <p>$ {product.price} USD</p> : placeholders.sm}
        </div>
        <div className={styles.pdpMain}>
          {product ? <p>{product.description}</p> : placeholders.text}
          <Button label="Add to cart" />
          {product ? (
            <div className={styles.pdpDetails}>
              <h4>Details</h4>
              <p className={styles.detailItem}>
                MATERIALS: {product.materials.join(", ")}
              </p>
              <div>
                {Object.keys(product.attributes || {}).map((key: string) => {
                  return (
                    <p className={styles.detailItem}>{`${key
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                      .toUpperCase()}: ${
                      product.attributes
                        ? product.attributes[
                            key as keyof typeof product.attributes
                          ]
                        : ""
                    }`}</p>
                  );
                })}
              </div>
            </div>
          ) : (
            placeholders.text
          )}
        </div>
      </Grid>
      <Grid item xs={12} justifyContent="center" alignItems="center">
        <ReviewInput></ReviewInput>
        <div className={styles.productReviews}>
          <h5>What other buyers are saying:</h5>
        </div>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
