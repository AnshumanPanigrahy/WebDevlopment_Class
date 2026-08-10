import { formatRupees } from '../currency';

function OrderPlaced({ order, onShopMore }) {
  return <main className="order-page"><section><div className="order-check">✓</div><p className="eyebrow">Order confirmed</p><h1>Thank you for<br />your order.</h1><p className="order-copy">We’ve received your order and are getting it ready. A confirmation has been saved for your records.</p><div className="order-details"><div><span>Order number</span><b>MRW-{String(order.number).padStart(6, '0')}</b></div><div><span>Items</span><b>{order.items}</b></div><div><span>Total</span><b>{formatRupees(order.total)}</b></div></div><button onClick={onShopMore}>Keep shopping →</button></section></main>;
}
export default OrderPlaced;
