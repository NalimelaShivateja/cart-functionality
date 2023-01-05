import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalCost = 0
      const useless = cartList.map(x => {
        totalCost += x.quantity * x.price
        return 0
      })
      return (
        <div>
          <h1>
            Order Total: <span>Rs {totalCost}</span>
          </h1>
          <p>{cartList.length} items in cart</p>
          <button type="button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
