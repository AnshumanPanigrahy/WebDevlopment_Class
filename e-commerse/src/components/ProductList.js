import { formatRupees } from '../currency';

function formatCategory(category) {
  return category.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function ProductList({ products, loading, error, search, setSearch, category, setCategory, sort, setSort, cartCount, onAddToCart, onRetry }) {
  const categories = ['all', ...new Set(products.map((product) => product.category))];
  const visibleProducts = products
    .filter((product) => category === 'all' || product.category === category)
    .filter((product) => `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">New season, new favourites</p>
        <h1>Find the little things<br />that make life better.</h1>
        <p className="hero-copy">Curated essentials, unexpected finds, and everyday upgrades — all in one beautiful place.</p>
        <a className="hero-link" href="#products">Shop the collection <span>→</span></a>
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />
      </section>

      <section className="shop-section" id="products">
        <div className="section-heading">
          <div><p className="eyebrow">The collection</p><h2>Shop all products</h2></div>
          <p className="result-count">{loading ? 'Loading collection...' : `${visibleProducts.length} products to discover`}</p>
        </div>

        <div className="tools" aria-label="Product filters">
          <label className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products or brands" /></label>
          <label className="sort-box">Sort by<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
        </div>

        <div className="category-row" aria-label="Categories">
          {categories.map((item) => <button key={item} className={category === item ? 'category active' : 'category'} onClick={() => setCategory(item)}>{item === 'all' ? 'All products' : formatCategory(item)}</button>)}
        </div>

        {error && <div className="notice error-text">{error}<button onClick={onRetry}>Try again</button></div>}
        {loading && <div className="product-grid skeleton-grid">{Array.from({ length: 8 }, (_, index) => <div key={index} className="skeleton-card"><div /><span /><span /></div>)}</div>}
        {!loading && !error && visibleProducts.length === 0 && <div className="notice">No products match your search. Try another term or category.</div>}
        {!loading && !error && <div className="product-grid">
          {visibleProducts.map((product) => {
            const salePrice = product.price * (1 - product.discount / 100);
            return <article key={product.id} className="product-card">
              <div className="product-image"><img src={product.image} alt={product.name} loading="lazy" /><span className="badge">{product.discount > 0 ? `-${Math.round(product.discount)}%` : 'New'}</span><button className="heart" aria-label={`Save ${product.name}`}>♡</button></div>
              <div className="product-details"><p className="product-brand">{product.brand}</p><h3>{product.name}</h3><div className="rating"><span>★</span> {product.rating.toFixed(1)} <small>({product.stock} in stock)</small></div><div className="price-row"><div><strong>{formatRupees(salePrice)}</strong>{product.discount > 0 && <del>{formatRupees(product.price)}</del>}</div><button className="add-button" onClick={() => onAddToCart(product)} aria-label={`Add ${product.name} to cart`}>Add <span>+</span></button></div></div>
            </article>;
          })}
        </div>}
      </section>
      <div className="cart-toast" aria-live="polite">Bag <b>{cartCount}</b></div>
    </main>
  );
}

export default ProductList;
