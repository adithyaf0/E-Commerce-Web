export default function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <div className="cart-item-card">
      <img src={item.image} alt={item.name} />
      <div className="cart-item-details">
        <div>
          <h4>{item.name}</h4>
          <p>{item.category}</p>
          <p>${item.price.toFixed(2)}</p>
        </div>
        <div className="quantity-controls">
          <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
        </div>
      </div>
      <button className="remove-button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </div>
  );
}
