<template>
  <section class="contenedor-general">
    <section class="contenedor-producto" v-for="product in array" :key="product.id" v-if="wishlistNumbers.length">
      <article class="contenedor-secundario-producto" v-if="wishlistNumbers.includes(product.id)">
        <div class="info-producto">
          <img class="linea-separacion" src="../../assets/linea-separacion.svg" alt="">
          <p class="name">{{ product.name }}</p>
          <p class="price">${{ product.price }}</p>
          <p class="flavor">{{ product.flavor_name }}</p>
          <button class="btn-carrito" @click="addToCart(product)">Add to cart</button>
        </div>
        <div class="contenedor-img">
          <img class="img-producto" :src="product.image" :alt="product.name">
          <img class="btn-borrar" @click="removeFromWishlist(product.id)" src="../../assets/borrar.svg"
            alt="Remove product from wishlist">
        </div>
      </article>
      
    </section>
    <section class="contenedor-listaVacia" v-else>
      <div class="contenedor-mensajeLista">
        <p>Hmm... I don’t see any coffee here yet! :(</p>
        <img src="../../assets/empty-coffee.png" alt="Empty wishlist">
      </div>
      <div class="contenedor-btn">
        <button @click="navigateShop" class="btn-borrar-todo btn-wishlist-vacia">EXPLORE</button>
      </div>
    </section>
  </section>
  <div class="contenedor-btn" v-if="wishlistNumbers.length">
        <button @click="clearWishlist" class="btn-borrar-todo">EMPTY WISHLIST</button>
      </div>
</template>

<script>
import { almacen } from '@/aromio/stores/almacen'
import { userStore } from '../stores/userStore'

export default {
  data() {
    return {
      array: [],
      wishlistNumbers: [],
      carrito: userStore().cart,
      username: ""

    }
  },
  methods: {
    navigateShop() {
      this.$router.push('/public/shop');
    },
    //recoge el campo wishlist del usuario usando su nombre de usuario
    async getWishlistData() {
      const user = userStore()
      this.username = user.username

      try {
        const res = await fetch(`http://localhost:8000/api/wishlist?username=${this.username}`)
        const data = await res.json()

        //uso una expresion regular para sacar los num sin las comas y los almacena en un array para tratar con ellos mas facilmente
        const regex = /\d+/g
        const numbers = data.match(regex).map(Number)
        this.wishlistNumbers = numbers

        //almacen es otra variable global que simplemente tiene una llamada a todos los productos y me hace más fácil tratar con esa información
        const almacenados = almacen()
        this.array = await almacenados.getProducts()

        //filtro por coincidencia de los id de los productos en el almacen y los num en wishlist
        this.array = this.array.filter(product => this.wishlistNumbers.includes(product.id))
      } catch (error) {
        console.error(error)
      }
    },


    //quita un producto de la wishlist
    async removeFromWishlist(productId) {
      try {

        //esta llamada actualiza la wishlist del usuario en la bd
        const response = await fetch(`http://localhost:8000/api/wishlist/${this.username}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: productId,
          }),
        });

        if (!response.ok) {
          console.error('Error al eliminar el producto de la wishlist:', response.statusText);
          return;
        }

        // actualiza después de borrar
        this.wishlistNumbers = this.wishlistNumbers.filter(id => id !== productId);

        // vuelve a recogesr los datos después de borrar para tener la wishlist actualizada
        await this.getWishlistData(this.username);

      } catch (error) {
        console.error('Error en la eliminación del producto de la wishlist:', error);
      }
    },


    //metodo delete que limpia el campo entero de la wishlist del usuario
    async clearWishlist() {
      try {
        const response = await fetch(`http://localhost:8000/api/wishlist/${this.username}/clear`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Error al limpiar la wishlist:', response.statusText);
          return;
        }

        // actualiza  después de limpiar la wishlist
        this.wishlistNumbers = [];
        this.array = [];

      } catch (error) {
        console.error('Error al limpiar la wishlist:', error);
      }
    },

    //misma función añadir al carrito que en los demás componentes
    addToCart(product) {
      const index = this.carrito.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        this.carrito[index].cantidad += 1;
      }
      else {
        this.carrito.push({
          id: product.id,
          name: product.name,
          cantidad: 1,
          image: product.image,
        });
      }
      const user = userStore()
      user.setCart(this.carrito)
    },


  },

  //cuando el componente se crea, se recogen los datos de la wishlist del usuario
  async created() {
    await this.getWishlistData()
  }
}
</script>

<style scoped>
.template {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  width: 100%;
}

.contenedor-mensajeLista {
  padding: 10vh;
  padding-bottom: 20vh;
  display: flex;
  flex-direction: row-reverse;
  width: auto;
  gap: 5vh;
}


.contenedor-mensajeLista p {
  font-family: 'Alata', sans-serif;
  font-size: 4.5vh;
  color: rgb(0, 0, 0);
  text-align: center;
}

.contenedor-btn {
  display: flex;
  justify-content: center;
}

.btn-borrar-todo {
  height: 6vh;
  width: 30vh;
  border-radius: 50px;
  margin-bottom: 10vh;
  font-family: 'Alata', sans-serif;
  font-size: 2vh;
  color: white;
  background-color: rgb(73, 30, 18);
  border: 0;
  cursor: pointer;
}

.contenedor-general {
  padding-top: 8vh;
  padding-left: 10vh;
  padding-right: 10vh;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}

.contenedor-producto {
  display: flex;
  flex-direction: column;
}

.contenedor-secundario-producto {
  display: flex;
  flex-direction: column;
  flex-basis: 45%;
  margin: 1.5vh;
  padding-right: 10vh;
  padding-left: 10vh;
}

.linea-separacion {
  padding-bottom: 6vh;
}

.separacion {
  height: 22vh;
}

.contenedor-img {
  position: relative;
  display: flex;
  align-items: center;
}

.info-producto,
.btn-carrito {
  font-family: 'Alata', sans-serif;
}

.info-producto * {
  align-content: center;
  margin-bottom: 15px;
}

.info-producto {
  margin-bottom: 8vh;
}

.img-producto {
  height: 30vh;
  position: absolute;
  background-color: transparent;
  margin-bottom: 350px;
  margin-left: 100px;
}

.btn-borrar {
  padding-left: 50vh;
  margin-top: -300px;
  background-color: transparent;
  cursor: pointer;
}

.btn-carrito {
  height: 4.5vh;
  width: 18vh;
  font-size: 2vh;
  border-radius: 30px;
  border: 1px solid rgb(73, 30, 18);
  color: rgb(73, 30, 18);
  cursor: pointer;
  background-color: transparent;
}

.name {
  color: rgb(0, 0, 0);
}

.price {
  color: rgb(146, 79, 60);
}

.flavor {
  color: rgb(167, 167, 167);
}

.name,
.price,
.flavor {
  font-size: 2.2vh;
}

@media screen and (max-width: 600px) {

  .info-producto p,
  .info-producto button {
    font-size: 2vh;
    margin-left: 6vh;
  }

  .img-producto {
    margin-left: 20vh;
  }

  .btn-borrar {
    z-index: 3;
  }
}

@media screen and (max-width: 470px) {

  .info-producto p,
  .info-producto button {
    font-size: 2vh;
    margin-left: 9vh;
  }

  .img-producto {
    margin-left: 18vh;
  }

  .btn-borrar {
    z-index: 3;
    margin-left: -3vh;
  }

  .btn-carrito {
    z-index: 4;
  }
}</style>
