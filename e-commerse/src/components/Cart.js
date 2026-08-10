function Cart({ items, open, onClose, onIncrease, onDecrease, onRemove, onCheckout, orderComplete }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * (1 - item.discount / 100) * item.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal >= 75 ? 0 : 6.99) : 0;
  const total = subtotal + shipping;

  return <>
    {open && <button className="cart-backdrop" aria-label="Close cart" onClick={onClose} />}
    <aside className={open ? 'cart-panel open' : 'cart-panel'} aria-label="Shopping cart" aria-hidden={!open}>
      <div className="cart-header"><div><p className="eyebrow">Your bag</p><h2>{orderComplete ? 'Order placed!' : `${items.length} item${items.length === 1 ? '' : 's'} in your bag`}</h2></div><button className="close-cart" onClick={onClose} aria-label="Close cart">×</button></div>
      {orderComplete ? <div className="order-success"><div>✓</div><h3>Thank you for your order.</h3><p>Your order has been placed. We’ll have your carefully selected items on their way soon.</p><button onClick={onClose}>Continue shopping</button></div> : <>
        <div className="cart-items">{items.length === 0 ? <p className="empty-cart">Your bag is ready for something lovely.</p> : items.map((item) => <article className="cart-item" key={item.id}><img src={item.image} alt="" /><div><p>{item.brand}</p><h3>{item.name}</h3><strong>${(item.price * (1 - item.discount / 100)).toFixed(2)}</strong><div className="quantity-control"><button onClick={() => onDecrease(item.id)} aria-label={`Decrease ${item.name} quantity`}>−</button><span>{item.quantity}</span><button onClick={() => onIncrease(item.id)} aria-label={`Increase ${item.name} quantity`}>+</button><button className="remove-item" onClick={() => onRemove(item.id)}>Remove</button></div></div></article>)}</div>
        {items.length > 0 && <div className="cart-summary"><div><span>Subtotal</span><b>${subtotal.toFixed(2)}</b></div><div><span>Shipping</span><b>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</b></div><p>Free shipping on orders over $75.</p><div className="cart-total"><span>Total</span><b>${total.toFixed(2)}</b></div><button className="checkout-button" onClick={onCheckout}>Buy now <span>→</span></button></div>}
      </>}
    </aside>
  </>;
}

export default Cart;
