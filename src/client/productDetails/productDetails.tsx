import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./productDetails.module.scss";
import { Product } from "../types/product";
import Loading from "../components/loading/loading";
import productDetailImg from "./switches.jpeg";
import Button from "../components/button/button";

const mockProduct = {
  product: {
    dimensions: {
      height: 3,
      width: 2,
      weight: 1,
    },
    _id: "638eab458de6191ce8205cde",
    store: {
      _id: "638eaaed197ce5b186de1a32",
      owner: "638510f68ec22284054b919d",
      name: "britney's main store",
      description: "THIS ONE!",
      status: "active",
      createdAt: "2022-12-06T02:37:33.715Z",
      updatedAt: "2022-12-06T02:37:33.715Z",
      __v: 0,
    },
    productName: "Best switches ever",
    brand: "Britney's Brand",
    description: "This is a description!!!",
    productType: "switch",
    materials: ["nylon", "plastic"],
    price: 200,
    quantity: 100,
    status: "active",
    usersFavorited: ["638510f68ec22284054b919d"],
    createdAt: "2022-12-06T02:39:01.875Z",
    updatedAt: "2022-12-06T02:40:04.671Z",
    __v: 0,
  },
};

const ProductDetails = () => {
  let { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>();
  useEffect(() => {
    setTimeout(() => {
      setProduct(mockProduct.product);
    }, 1500);
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
        </div>
      </Grid>
      <Grid item xs={12} justifyContent="center" alignItems="center">
        {product ? (
          <div className={styles.pdpDetails}>
            <h4>Details</h4>
            <p>Materials: {product.materials.join(", ")}</p>
          </div>
        ) : (
          placeholders.text
        )}
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
