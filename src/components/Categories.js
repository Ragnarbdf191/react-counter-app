import React from 'react';

function Categories({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div>
      <h2>Categorias</h2>
      <ul className="category-list">
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={category === selectedCategory ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
