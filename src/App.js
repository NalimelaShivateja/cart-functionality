import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state

    const temp = cartList.filter(x => x.id !== id)
    this.setState({cartList: temp})
  }

  addCartItem = product => {
    const {cartList} = this.state

    const check = cartList.find(x => x.id === product.id)
    console.log(check)

    if (check !== undefined) {
      const index = cartList.findIndex(x => x.id === product.id)
      cartList[index].quantity += 1
      this.setState({cartList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  incrementCartItemQuantity = productId => {
    const {cartList} = this.state
    const index = cartList.findIndex(x => x.id === productId)

    cartList[index].quantity += 1
    this.setState({cartList})
  }

  decrementCartItemQuantity = productId => {
    const {cartList} = this.state
    const index = cartList.findIndex(x => x.id === productId)

    if (cartList[index].quantity - 1 === 0) {
      const temp = cartList.filter(x => x.id !== productId)
      this.setState({cartList: temp})
    } else {
      cartList[index].quantity -= 1
      this.setState({cartList})
    }
  }

  render() {
    const {cartList} = this.state

    console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
