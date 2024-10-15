import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db";

export const useCart = () =>{
    console.log("desde useCart");

    const initialCart = () =>{
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
      }
  
      const [data] = useState(db);
      const [cart, setCart] = useState(initialCart);
  
      const MAX_ITEMS = 10;
  
      useEffect(() => {
        localStorage.setItem('cart',JSON.stringify(cart));
      }, [cart])
      
  
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
        
        
        // saveLocalStorage(); 
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

    const isEmpty = useMemo( () => cart.length === 0 , [cart]);
    const cartTotal =useMemo(() => cart.reduce( (total,item) => total + (item.quantity * item.price), 0 ),[cart]); 

    return {
        data, 
        cart, 
        addToCart, 
        removeFromCart, 
        decrementQuantity, 
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}