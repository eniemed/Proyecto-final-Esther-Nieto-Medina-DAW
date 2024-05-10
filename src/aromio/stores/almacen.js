import { defineStore } from "pinia";


//almacena todos los productos para tratar con ellos mucho más fácilmente en otros componentes, como por ejemplo en wishlist
export const almacen = defineStore('almacenState', {
  state: () => ({
    products: []
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
  },
});
