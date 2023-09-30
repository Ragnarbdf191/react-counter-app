import React from 'react';

function ShoppingCart({ cart, removeFromCart }) {
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h2>Carrinho de Compras</h2>
      <ul className="cart">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-price">${item.price}</div>
            <button onClick={() => removeFromCart(item.id)} className="remove-from-cart-button">
              Remover do Carrinho
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-total">Total: ${total}</div>
    </div>
  );
}

export default ShoppingCart;
