import { useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header.JSX"
import { useEffect } from "react";
import { db } from "./data/db";
function App() {
    
    const [data, setData] = useState(db);
    const [cart, setCart] = useState([]);

    const MAX_ITEMS = 10;

   
    

    function addToCart(item){
      const itemExist = cart.findIndex( (guitar)=> guitar.id === item.id );
      if(itemExist >= 0) { //Existe en el carrito
        if(cart[itemExist].quantity >= MAX_ITEMS) return;
        console.log("Ya existe en el carrito");
        const updateCart = [...cart];
        updateCart[itemExist].quantity++;
        setCart(updateCart);
      }else{
        console.log("Agregando");
        item.quantity = 1;
        //setCart( (prevCart) => [...prevCart, item]);
        setCart([...cart, item]); //code mas corto
      }
    }
    
    function removeFromCart(id){
      // console.log("Eliminando articulo....",id);
      setCart( prevCart => prevCart.filter( guitar => guitar.id !== id ) )
    }
    function increaseQuantity(id) {
      // console.log("incrementando articulo",id);}
      const updateCart = cart.map( item => {
        if(item.id === id && item.quantity < MAX_ITEMS){
          return{
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item;
      })
      setCart(updateCart);
    }

    function decrementQuantity(id){
      const updateCart = cart.map( item => {
        if(item.id === id && item.quantity > 1){
          return{
            ...item,
            quantity: item.quantity - 1
          }
        }
        return item;
      })
      setCart(updateCart);
    }

    function clearCart(){
      setCart([]);

    }
  return (
    <>
      <Header
        cart = {cart}
        removeFromCart = {removeFromCart}
        increaseQuantity = {increaseQuantity}
        decrementQuantity = {decrementQuantity}
        clearCart = {clearCart}
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
