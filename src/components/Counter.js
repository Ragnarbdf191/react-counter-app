import React, { useState } from 'react';
import './Store.css'; // Certifique-se de ter o arquivo CSS adequado

function Store() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    email: '',
  });

  const categories = ['Eletrônicos', 'Roupas', 'Livros', 'Banheiro'];
  const products = [
    { id: 1, name: 'Smartphone', category: 'Eletrônicos', price: 500 },
    { id: 2, name: 'Camiseta', category: 'Roupas', price: 20 },
    { id: 3, name: 'Livro "React for Beginners"', category: 'Livros', price: 30 },
    { id: 4, name: 'Tablet', category: 'Eletrônicos', price: 22.99 },
    { id: 5, name: 'Escova', category: 'Banheiro', price: 35.66 },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  };

  const checkout = () => {
    fetch('http://localhost:7777/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart, customerInfo }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na solicitação ao servidor');
        }
        return response.json();
      })
      .then((data) => {
        const mensagemElement = document.getElementById('checkout-message');
        if (data.status === 'Em análise') {
          mensagemElement.textContent = 'Seu pedido está em análise. Aguarde a confirmação.';
        } else {
          mensagemElement.textContent = 'Erro ao processar a compra. Por favor, tente novamente mais tarde.';
        }
        console.log('Resposta do servidor:', data);
      })
      .catch((error) => {
        console.error('Erro ao enviar pedido:', error);
      });
  };

  return (
    <div>
      <h1>Minha Loja Online</h1>
      <div>
        <h2>Categorias</h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                cursor: 'pointer',
                fontWeight: category === selectedCategory ? 'bold' : 'normal',
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Produtos</h2>
        <ul>
          {products.map((product) => (
            (selectedCategory === null || product.category === selectedCategory) && (
              <li key={product.id}>
                {product.name} - ${product.price}
                <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
              </li>
            )
          ))}
        </ul>
      </div>

      <div>
        <h2>Carrinho de Compras</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => removeFromCart(item.id)}>Remover do Carrinho</button>
            </li>
          ))}
        </ul>
        {cart.length > 0 && (
          <div>
            <h2>Informações do Cliente</h2>
            <form>
              <label>
                Nome:
                <input type="text" name="name" value={customerInfo.name} onChange={handleInputChange} />
              </label>
              <label>
                Endereço:
                <input type="text" name="address" value={customerInfo.address} onChange={handleInputChange} />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={customerInfo.email} onChange={handleInputChange} />
              </label>
              <button type="button" onClick={checkout}>Finalizar Compra</button>
            </form>
          </div>
        )}
        <div id="checkout-message"></div>
      </div>
    </div>
  );
}

export default Store;
