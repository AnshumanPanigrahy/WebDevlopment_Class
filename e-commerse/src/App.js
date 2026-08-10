import { useCallback, useEffect, useState } from 'react';
import './App.css';
import CartPage from './components/CartPage';
import OrderPlaced from './components/OrderPlaced';
import LoginPage from './components/LoginPage';
import ProductList from './components/ProductList';
import { loadProducts } from './controllers/productsController';

const ACCOUNTS_KEY = 'morrow-accounts';

function App() {
  const [user, setUser] = useState({ userId: '', password: '', confirmPassword: '' });
  const [mode, setMode] = useState('login');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [authError, setAuthError] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const [cartItems, setCartItems] = useState([]);
  const [page, setPage] = useState('shop');
  const [order, setOrder] = useState(null);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const getProducts = useCallback(async () => {
    setLoading(true); setError('');
    try { setProducts(await loadProducts()); }
    catch (requestError) { setError(requestError.message || 'Unable to load products.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { if (loggedInUser) getProducts(); }, [loggedInUser, getProducts]);

  const handleChange = (event) => setUser((current) => ({ ...current, [event.target.name]: event.target.value }));
  const changeMode = (nextMode) => { setMode(nextMode); setAuthError(''); setUser({ userId: '', password: '', confirmPassword: '' }); };
  const handleAuth = (event) => {
    event.preventDefault(); setAuthError('');
    const id = user.userId.trim();
    if (id.length < 3 || user.password.length < 4) { setAuthError('Use a user ID of 3+ characters and a password of 4+ characters.'); return; }
    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '{}');
    if (mode === 'signup') {
      if (accounts[id]) { setAuthError('That user ID is already taken. Try logging in.'); return; }
      if (user.password !== user.confirmPassword) { setAuthError('Your passwords do not match.'); return; }
      accounts[id] = user.password; localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    } else if (accounts[id] !== user.password) { setAuthError('Incorrect user ID or password. Create an account if you are new.'); return; }
    setLoggedInUser(id); setUser({ userId: '', password: '', confirmPassword: '' });
  };
  const addToCart = (product) => { setCartItems((items) => { const existing = items.find((item) => item.id === product.id); return existing ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { ...product, quantity: 1 }]; }); };
  const increaseItem = (id) => setCartItems((items) => items.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  const decreaseItem = (id) => setCartItems((items) => items.flatMap((item) => item.id === id && item.quantity === 1 ? [] : item.id === id ? [{ ...item, quantity: item.quantity - 1 }] : [item]));
  const removeItem = (id) => setCartItems((items) => items.filter((item) => item.id !== id));
  const checkout = (total) => { setOrder({ total, items: cartCount, number: Date.now() % 1000000 }); setCartItems([]); setPage('order'); };
  const logout = () => { setLoggedInUser(''); setProducts([]); setCartItems([]); setPage('shop'); };

  return <div className="App"><div className="site-shell"><header className="site-header"><a className="wordmark" href="/" onClick={(event) => { event.preventDefault(); setPage('shop'); }}>morrow<span>.</span></a>{loggedInUser && <><nav aria-label="Main navigation"><button onClick={() => setPage('shop')}>Shop</button><button onClick={() => setPage('shop')}>New arrivals</button><button onClick={() => setPage('shop')}>About</button></nav><div className="header-actions"><span className="hello-user">Hi, {loggedInUser}</span><button className="logout-link" onClick={logout}>Log out</button><button className="bag-button" onClick={() => setPage('cart')} aria-label="Open shopping bag">Bag <span>{cartCount}</span></button></div></>}</header>{!loggedInUser ? <LoginPage mode={mode} user={user} onChange={handleChange} onSubmit={handleAuth} onModeChange={changeMode} error={authError} /> : page === 'cart' ? <CartPage items={cartItems} onBack={() => setPage('shop')} onIncrease={increaseItem} onDecrease={decreaseItem} onRemove={removeItem} onCheckout={checkout} /> : page === 'order' && order ? <OrderPlaced order={order} onShopMore={() => setPage('shop')} /> : <ProductList products={products} loading={loading} error={error} search={search} setSearch={setSearch} category={category} setCategory={setCategory} sort={sort} setSort={setSort} cartCount={cartCount} onAddToCart={addToCart} onRetry={getProducts} />}<footer>© 2026 morrow. Made for everyday delight.</footer></div></div>;
}

export default App;
