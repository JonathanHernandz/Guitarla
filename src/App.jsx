import Guitar from "./components/Guitar"
import Header from "./components/Header.JSX"
import { db } from "./data/db";
import { useCart } from "./hooks/useCart";

function App() {
  const { data, cart, addToCart, removeFromCart, decrementQuantity, increaseQuantity, clearCart, isEmpty, cartTotal} = useCart();
    

    // function saveLocalStorage(){
    //   localStorage.setItem('cart',JSON.stringify(cart));
    // }
  return (
    <>
      <Header
        cart = {cart}
        removeFromCart = {removeFromCart}
        increaseQuantity = {increaseQuantity}
        decrementQuantity = {decrementQuantity}
        clearCart = {clearCart}
        isEmpty = {isEmpty}
        cartTotal = {cartTotal}
      />

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>
          <div className="row mt-5">
            {
                data.map((guitar) =>(
                    <Guitar
                        key={guitar.id}
                        guitar = {guitar}
                        //cart={cart}
                        //setCart = {setCart}
                        addToCart={addToCart}
                    />
                ) )
            }
                   
          </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>

    </>
  )
}

export default App
