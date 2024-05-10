<template>
    <section class="carrito-contenedor">
        <article class="carrito-desplegable">
            <div v-if="carrito.length === 0 || !detectarLogin()">
                <p class="carrito-vacio">Nothing here yet! :(</p>
            </div>
            <div v-else>
                <section class="contenedor-productos">
                    <article v-for="item in carrito" :key="item.id" class="carrito-item">
                        <img :src="item.image" :alt="item.name" class="carrito-imagen" />
                        <div class="carrito-detalle">
                            <p class="carrito-nombre">{{ item.name }}</p>
                            <div class="contenedor-cantidad">
                                <img class="carrito-quitar-cantidad" @click="decreaseQuantity(item)"
                                    src="../../assets/minus.svg" alt="Remove one" />
                                <p class="carrito-numero-cantidad">{{ item.cantidad }}</p>
                                <img class="carrito-añadir-cantidad" @click="increaseQuantity(item)"
                                    src="../../assets/plus.svg" alt="Add one more" />
                            </div>
                            <img src="../../assets/borrar.svg" class="carrito-borrar" @click="removeFromCart(item)"
                                alt="Remove from cart">
                        </div>
                    </article>
                </section>
                <div class="carrito-botones">
                    <button @click="emptyCart" class="carrito-empty-btn">Empty cart</button>
                    <button @click="buy" class="carrito-buy-btn">Buy</button>
                </div>
            </div>

        </article>
        <img src="../../assets/carrito.svg" alt="Shopping cart">
    </section>
</template>
  
<script>
import { userStore } from '../stores/userStore';

export default {

    data() {
        return {
            carrito: userStore().cart,
        };
    },
    methods: {

        //recoge el estado de loggedIn de la variable global para ver si está o no conectado y así mostrar o no el carrito del usuario
        detectarLogin() {
            const user = userStore()
            return user.loggedIn
        },

        //uso una vez más el findIndex para quitar el producto por id del carrito y lo actualizo en el localStorage también
        removeFromCart(item) {
            const index = this.carrito.findIndex((cartItem) => cartItem.id === item.id);
            if (index !== -1) {
                this.carrito.splice(index, 1);
                this.updateLocalStorageCart();
            }
        },

        //aumenta la cantidad del producto en concreto y actualiza el carrito
        increaseQuantity(item) {
            item.cantidad += 1;
            this.updateLocalStorageCart();
        },

        //disminuye la cantidad y actualiza. Si la cantidad del producto es 1 y la intenta disminuir, elimina el producto del carrito
        decreaseQuantity(item) {
            if (item.cantidad > 1) {
                item.cantidad -= 1;
            } else {
                const index = this.carrito.findIndex((cartItem) => cartItem.id === item.id);
                if (index !== -1) {
                    this.carrito.splice(index, 1);
                }
            }
            this.updateLocalStorageCart();
        },

        //borra el carrito entero y actualiza
        emptyCart() {
            this.carrito = [];
            this.updateLocalStorageCart();
        },

        //simula la compra borrando el carrito también
        buy() {
            this.emptyCart();
        },

        //establece el carrito de la variable global
        updateLocalStorageCart() {
            const user = userStore()
            user.setCart(this.carrito)
        },
    },
};
</script>
  
<style scoped>
.carrito-contenedor {
    font-family: "Alata", sans-serif;
    position: relative;
    background-color: white;
    display: flex;
    align-items: center;
}

.carrito-vacio {
    background-color: white;
    display: flex;
    justify-content: center;
    padding: 50px;
}

.carrito-borrar {
    margin-right: 15px;
    background-color: transparent;
    border: 0;
    height: 34px;
    cursor: pointer;
}

.carrito-desplegable {
    position: absolute;
    top: 100%;
    left: 20%;
    transform: translateX(-50%);
    width: 450px;
    padding: 10px;
    background-color: white;
    border: 1px solid #cccaca;
    border-radius: 20px;
    max-height: 500px;
    overflow-y: scroll;
    display: none;
}

.carrito-contenedor:hover .carrito-desplegable {
    display: block;
    background-color: white;
}

.contenedor-productos {
    background-color: white;
    display: flex;
    flex-direction: column;
}

.carrito-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    background-color: white;
    flex-direction: row;
}

.carrito-imagen {
    width: 100px;
    height: auto;
    object-fit: cover;
    background-color: transparent;
    margin-left: -20px;
}

.carrito-detalle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    background-color: white;
    flex-direction: row;
}

.contenedor-cantidad {
    display: flex;
    align-items: center;
    background-color: white;
}

.carrito-quitar-cantidad {
    margin: 0 10px;
    cursor: pointer;
    height: 20px;
    background-color: white;
}

.carrito-añadir-cantidad {
    margin-left: 10px;
    cursor: pointer;
    height: 24px;
    background-color: white;
}

.carrito-numero-cantidad {
    background-color: white;
    font-size: 17px;
}

.carrito-botones {
    display: flex;
    justify-content: center;
    background-color: white;
}

.carrito-nombre {
    background-color: white;
    min-width: 150px;
}

.carrito-empty-btn {
    background-color: rgb(239, 97, 58);
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    margin: 20px;
    font-size: 1.5vh;
    font-family: 'Alata', sans-serif;
}

.carrito-buy-btn {
    background-color: rgb(141, 79, 62);
    cursor: pointer;
    color: white;
    border: 0;
    border-radius: 50px;
    margin: 20px;
    width: 100px;
    font-family: 'Alata', sans-serif;
    font-size: 1.5vh;
}
</style>
  