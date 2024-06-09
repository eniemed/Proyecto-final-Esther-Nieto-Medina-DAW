<template>
    <section :key="key" class="carrito-contenedor">
        <article class="carrito-desplegable">
            <div v-if="carrito.length === 0 || !detectarLogin()">
                <p class="carrito-vacio">Nothing here yet! :(</p>
            </div>
            <div v-else>
                <section class="contenedor-productos">
                    <article v-for="item in carrito" :key="newKey" class="carrito-item">
                        <img :src="item.image" :alt="item.name" class="carrito-imagen" />
                        <div class="carrito-detalle">
                            <p class="carrito-nombre">{{ item.name }}</p>
                            <div class="contenedor-cantidad">
                                <img class="carrito-quitar-cantidad" @click="decreaseFromCart(item)"
                                    src="../../assets/minus.svg" alt="Remove one" />
                                <p class="carrito-numero-cantidad">{{ countProductOccurrences(item.id) }}</p>
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
import router from "../router/router"



export default {

    data() {
        return {
            carrito: [],
            carritoOccurrences: [],
            products: [],
            carritoCounts: [],
            checkout: false,
            key: 1,
        };
    },
    watch: {
        carrito: function () {
            this.carrito
        },
    },
    computed: {
        cart() {
            this.carrito = almacen().carrito
            return this.carrito
        },
    },
    async created() {
        this.detectarLogin()
        this.loadCart()
        await almacen().loadCart()
        await this.getProducts()
        await this.loadCarritoOccurrences()
        this.carrito = almacen().carrito
        this.updateCarritoCounts()

    },
    methods: {
        emptyCart() {
            if (this.detectarLogin()) {
                const user = userStore()
                fetch(`http://localhost:8000/api/user/${user.username}/clear-cart`, {
                    method: 'POST',
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });

                    //reseteo todas las variables que guardan datos o indices del carrito
                    this.carrito = [];
                    this.carritoOccurrences = [];
                    this.carritoCounts = [];
                    this.updateCarritoCounts();
            } else {
                this.carrito = [];
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
                this.updateCarritoOccurrences();
            }
        },

        //carga en la variable carritoOccurrences todos los productos del carrito, incluso los repetidos
        async loadCarritoOccurrences() {
            const user = userStore()
            if (user.loggedIn) {
                const response = await fetch(`http://localhost:8000/api/user/${user.username}/cart`);
                const data = await response.json();
                this.carritoOccurrences = data
            } else {
                this.carritoOccurrences = [];
            }
            this.updateCarritoCounts();
        },
        countProductOccurrences(productId) {
            return this.carritoOccurrences.filter(item => item === productId).length;
        },

        //uso flatMap que mapea y aplana el array para que no haya arrays dentro de arrays
        updateCarritoOccurrences() {
            this.carritoOccurrences = this.carrito.flatMap(item => Array(item.quantity).fill(item.id));
        },

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

        newKey() {
            return this.key += 1;
        },

        navigationCart() {
            router.push("/public/cart");
        },

        async removeAllFromCart(item) {
            const almacenInstance = almacen()
            almacenInstance.removeAllFromCart(item);
        },

        //recoge el estado de loggedIn de la variable global para ver si está o no conectado y así mostrar o no el carrito del usuario
        detectarLogin() {
            const user = userStore()
            return user.loggedIn
        },



        async decreaseFromCart(item) {

            if (this.detectarLogin()) {
                const index = this.carrito.indexOf(item.id);
                if (index !== -1) {
                    this.carrito.splice(index, 1);
                }
                //actualiza el carrito en la base de datos
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
                        //actualiza el carrito después de actualizar el producto
                        this.loadCart();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                    await this.loadCarritoOccurrences()
                    this.countProductOccurrences(item.id)
                    this.updateCarritoCounts();
            } else {
                //si el usuario no está loggeado, disminuye la cantidad del producto en el carrito en localStorage
                const product = this.carrito.find(cartItem => cartItem.id === item.id);
                if (product && product.quantity > 1) {
                    //si el producto existe y su cantidad es mayor a 1, disminuye la cantidad
                    product.quantity--;
                } else {
                    //si el producto solo tiene una cantidad, elimina el producto del carrito
                    const index = this.carrito.findIndex(cartItem => cartItem.id === item.id);
                    if (index !== -1) {
                        this.carrito.splice(index, 1);
                    }
                }
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
            }
            this.updateCarritoOccurrences();
            
        },
        updateCarritoCounts() {
            const counts = this.carrito.map(item => {
                return this.carritoOccurrences.filter(id => id === item.id).length;
            });
            this.carritoCounts = counts;
        },

        async loadCart() {
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
                console.log(this.carrito)
                return Promise.resolve();
            }


        },

        async incrementFromCart(item) {

            if (this.detectarLogin()) {
                const user = userStore()
                //si el usuario está logueado, incrementa la cantidad del producto en el carrito en la base de datos
                fetch(`http://localhost:8000/api/user/${user.username}/cart/${item.id}`, {
                    method: 'POST',
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('error');
                        }
                        //actualiza el carrito en el componente después de incrementar la cantidad del producto
                        this.loadCart();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                    await this.loadCarritoOccurrences()
                    this.countProductOccurrences(item.id)
                    this.updateCarritoCounts();
            } else {
                //si el usuario no está loggeado, incrementa la cantidad del producto en el carrito en localStorage
                const index = this.carrito.findIndex(cartItem => cartItem.id === item.id);
                if (index !== -1) {
                    this.carrito[index].quantity++;
                    localStorage.setItem('carrito', JSON.stringify(this.carrito));
                }
            }
        },

        //simula la compra
        async buy() {
            const user = userStore()
            try {

                //elimina el descuento (ya que el descuento es para primeras compras solamente)

                await fetch(`http://localhost:8000/api/user/${user.username}/clear-discount`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            } catch (error) {
                console.error('Error:', error);
            }

            //establece checkout en true para que se muestre el mensaje de confirmacion de la compra que se ha realizado
            this.checkout = true
            try {

                //añade a la tabla orders un nuevo pedido con el usuario correspondiente
                await fetch(`http://localhost:8000/api/user/${user.username}/add-order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            } catch (error) {
                console.error('Error:', error);
            }
            try {

                //por último borra el carrito
                await fetch(`http://localhost:8000/api/user/${user.username}/clear-cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            } catch (error) {
                console.error('Error:', error);
            }
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
.comprado-fondo {
    position: absolute;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.46);
}

.contenedor-comprado-mensaje {
    position: absolute;
    top: 30%;
    left: 35%;
    height: 20em;
    width: 35em;
    border-radius: 20px;
    padding: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.contenedor-comprado-mensaje h2,
p {
    background-color: transparent;
    text-align: center;

}

.contenedor-comprado-mensaje h2 {
    font-family: 'Archivo Black', sans-serif;
    color: rgb(68, 49, 27);
    font-size: 2em;
}

.contenedor-comprado-mensaje p {
    font-family: 'Alata', sans-serif;
    font-size: 1.2em;
    padding-top: 1em
}

.contenedor-comprado-mensaje button {
    height: 3em;
    width: 8em;
    margin-top: 2em;
    background-color: rgb(53, 35, 16);
    color: white;
    border: none;
    font-family: 'Alata', sans-serif;
    border-radius: 30px;
    font-size: 1.2em;
    justify-self: center;
    cursor: pointer;
}
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