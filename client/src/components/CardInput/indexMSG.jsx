import React from 'react';

export const Message = ({ message }) => (
    <section>
      <p>{message}</p>
      <a className="product-price-btn" href="/">
        <button type="button">Continue</button>
      </a>
    </section>
 );