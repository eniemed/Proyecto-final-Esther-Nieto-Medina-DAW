import { defineStore } from "pinia";
import { userStore } from '../stores/userStore';


//almacena todos los productos para tratar con ellos mucho más fácilmente en otros componentes, como por ejemplo en wishlist
export const almacen = defineStore('almacenState', {
  state: () => ({
    products: [],
    carrito: [],

  }),

  actions: {
    
    
    async getProducts() {
      try {
        const res = await fetch("http://localhost:8000/api/products")
        const data = await res.json()
        this.products = data
        return this.products
      } catch (error) {
        console.error(error)
        return []
      }
    },

    async addToCart(productId) {

      await this.getProducts();
      await this.loadCart();

      //comprueba si el producto ya está en el carrito
      const productInCart = this.carrito.find(cartItem => cartItem.id === productId);

      //si el producto no está en el carrito, lo añade
      if (!productInCart) {
        const productData = this.products.find(product => product.id === productId);
        this.carrito.push(productData);

      }
      const user = userStore()
      if (user.loggedIn) {

        //añade el producto en la bd
        fetch(`http://localhost:8000/api/user/${user.username}/cart/${productId}`, {
          method: 'POST',
        })
          .then(response => {
            if (!response.ok) {
              console.log("error")
              throw new Error('error');

            }

          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(item);
        localStorage.setItem('carrito', JSON.stringify(carrito));
      }
    },
    async removeAllFromCart(item) {

      const productId = item.id;
      this.carrito = this.carrito.filter(product => product.id !== productId);
      const user = userStore()
      fetch(`http://localhost:8000/api/user/${user.username}/cart/${item.id}/all`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

    },


    //recoge y almacena en un array que es una variable global los datos del carrito para poder
    //acceder a él desde varias partes de la aplicacion y no perder sincronía
    async loadCart() {
      const user = userStore()
      if (user.loggedIn) {
        return fetch(`http://localhost:8000/api/cart/${user.username}/products`)
          .then(response => response.json())
          .then(data => {
            this.carrito = data.products;
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }


    },
  },
});
