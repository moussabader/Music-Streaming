
import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import styles from "./styles.module.scss";

export const ProductDisplay = () => (
  <div className="wrapper">
    <div className="product-img">
      <img
        src="https://cdn.pixabay.com/photo/2017/12/20/09/36/orchid-3029574_1280.jpg"
        alt="Orchid Flower"
        height="420"
        width="327"
      />
    </div>
    <div className="product-info">
      <div className="product-text">
        <h1>Orchid Flower</h1>
        <h2>POPULAR HOUSE PLANT</h2>
        <p>
          The Orchidaceae are a diverse and
          <br />
          widespread family of flowering plants,
          <br />
          with blooms that are often
          <br />
          colourful and fragrant.{" "}
        </p>
      </div>
      <form action="http://localhost:3006/payment/create-checkout-session" method="POST">
        <div className="product-price-btn">
          <p>
            <span>$20</span>
          </p>
          <button type="submit">buy now</button>
        </div>
      </form>
    </div>
  </div>
);