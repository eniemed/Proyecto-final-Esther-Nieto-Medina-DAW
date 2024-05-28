import { defineStore } from "pinia";
import { userStore } from '../stores/userStore';


//almacena todos los productos para tratar con ellos mucho más fácilmente en otros componentes, como por ejemplo en wishlist
export const almacen = defineStore('almacenState', {
  state: () => ({
    products: [],
    carrito: []
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
      const productData = this.products.find(product => product.id === productId);

      // Comprueba si el producto ya está en el carrito
      const productInCart = this.carrito.find(cartItem => cartItem.id === productId);

      // Si el producto no está en el carrito, lo añade
      if (!productInCart) {
        this.carrito.push(productData);
      }
      const user = userStore()
      if (user.loggedIn) {
        fetch(`http://localhost:8000/api/user/${user.username}/cart/${productId}`, {
          method: 'POST',
        })
          .then(response => {
            if (!response.ok) {
              console.log("error")
              throw new Error('error');

            }
            const productDataEntero = this.products.find(product => product.id === productId);
            console.log(productDataEntero);
            this.carrito.push(productDataEntero);

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
