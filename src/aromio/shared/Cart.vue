<template>
    <section :key="key" class="carrito-contenedor">
        <article class="carrito-desplegable">
            <div v-if="carrito.length === 0 || !detectarLogin()">
                <p class="carrito-vacio">Nothing here yet! :(</p>
            </div>
            <div v-else>
                <section class="contenedor-productos">
                    <article v-for="item in this.carrito" :key="item.id" class="carrito-item">
                        <img :src="item.image" :alt="item.name" class="carrito-imagen" />
                        <div class="carrito-detalle">
                            <p class="carrito-nombre">{{ item.name }}</p>
                            <div class="contenedor-cantidad">
                                <img class="carrito-quitar-cantidad" @click="decreaseFromCart(item)"
                                    src="../../assets/minus.svg" alt="Remove one" />
                                <p class="carrito-numero-cantidad">{{ item.quantity }}</p>
                                <img class="carrito-añadir-cantidad" @click="incrementFromCart(item)"
                                    src="../../assets/plus.svg" alt="Add one more" />
                            </div>
                            <img src="../../assets/borrar.svg" class="carrito-borrar" @click="removeAllFromCart(item)"
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
        <img @click="navigationCart" class="icono-carrito" src="../../assets/carrito.svg" alt="Shopping cart">
    </section>
</template>

<script>
import { userStore } from '../stores/userStore';
import { almacen } from '../stores/almacen';
import { getCurrentInstance } from 'vue';
import router from "../router/router"



export default {

    data() {
        return {
            carrito: [],
            products: [],
            key: 1,
        };
    },
    watch: {
        carrito: function () {
            this.carrito
        },
        quantity: function () {
            this.quantity
        }
    },
    computed: {
        carrito() {
            return almacen().carrito;
        },
    },
    async created() {
        await almacen().loadCart()
        this.carrito = almacen().carrito
    },
    methods: {

        newKey() {
            this.key += 1;
        },

        navigationCart() {
            router.push("/public/cart");
        },

        async getProducts() {
            console.log(this.carrito)
            try {
                const res = await fetch("http://localhost:8000/api/products")
                const data = await res.json()
                this.products = data
            }
            catch (error) {
                console.error(error)
            }
        },

        async removeAllFromCart(item) {
            if (this.detectarLogin()) {
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
            } else {
                localStorage.removeItem('cart');
            }
        },

        //recoge el estado de loggedIn de la variable global para ver si está o no conectado y así mostrar o no el carrito del usuario
        detectarLogin() {
            const user = userStore()
            return user.loggedIn
        },

        countOccurrences(item) {
            return this.carrito.filter(cartItem => cartItem.id === item.id).length;
        },


        async decreaseFromCart(item) {
            if (this.detectarLogin()) {
                const index = this.carrito.indexOf(item.id);
                if (index !== -1) {
                    this.carrito.splice(index, 1);
                }
                // Actualiza el carrito en la base de datos
                const user = userStore()
                fetch(`http://localhost:8000/api/user/${user.username}/cart/${item.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.carrito),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        // Actualiza el carrito en el componente después de actualizar el producto
                        this.loadCart();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                // Si el usuario no está logueado, disminuye la cantidad del producto en el carrito en localStorage
                const product = this.carrito.find(cartItem => cartItem.id === item.id);
                if (product && product.quantity > 1) {
                    // Si el producto existe y su cantidad es mayor a 1, disminuye la cantidad
                    product.quantity--;
                } else {
                    // Si el producto solo tiene una cantidad, elimina el producto del carrito
                    const index = this.carrito.findIndex(cartItem => cartItem.id === item.id);
                    if (index !== -1) {
                        this.carrito.splice(index, 1);
                    }
                }
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
            }
            console.log(this.carrito)
        },

        async loadCart() {
            const instance = getCurrentInstance()
            instance.proxy.forceUpdate()
            if (this.detectarLogin()) {
                const user = userStore()
                return fetch(`http://localhost:8000/api/cart/${user.username}/products`)
                    .then(response => response.json())
                    .then(data => {
                        this.carrito = data.products;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                this.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                return Promise.resolve();
            }


        },

        async incrementFromCart(item) {
            // hacer que aumente la quantity, no introducir de nuevo el item en el array porque saldrá repetido


            if (this.detectarLogin()) {
                const user = userStore()
                // Si el usuario está logueado, incrementa la cantidad del producto en el carrito en la base de datos
                fetch(`http://localhost:8000/api/user/${user.username}/cart/${item.id}`, {
                    method: 'POST',
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('error');
                        }
                        // Actualiza el carrito en el componente después de incrementar la cantidad del producto
                        this.loadCart();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                // Si el usuario no está logueado, incrementa la cantidad del producto en el carrito en localStorage
                const index = this.carrito.findIndex(cartItem => cartItem.id === item.id);
                if (index !== -1) {
                    this.carrito[index].quantity++;
                    localStorage.setItem('carrito', JSON.stringify(this.carrito));
                }
            }
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
.icono-carrito {
    cursor: pointer;
}

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