<template>
    <main :class="['fondo', { 'background-dark': comprobarDarkMode() }]">
        <DarkModeBtn />
        <section>
            <article :class="['contenedor-buscador', { 'background-dark': comprobarDarkMode() }]">
                <label for="buscador">Search</label>
                <input v-model="busqueda" id="buscador" type="search" @keyup.enter="search(busqueda)"
                    placeholder="Search...">
                <img class="search-icon" @click="search(busqueda)" src="../../../assets/search-icon.svg"
                    alt="Click here to search">
                <article class="contenedor-filtros">
                    <article class="filtros-fondo">
                        <img src="../../../assets/filtros-icono.png" alt="Click here to filter the results">
                    </article>
                    <div class="filtros-desplegable oculto" @click="toggleFiltros">
                        <i class="icon-filter" @click.stop="showFlavorFilter = !showFlavorFilter"></i>

                        <div class="contenedor-selectores-filtros">
                            <label for="flavor">Flavor</label>
                            <select id="flavor" v-model="sabor" @change="filterProducts">
                                <option selected value="">Select a flavor</option>
                                <option value="dark chocolate">Dark Chocolate</option>
                                <option value="citrus">Citrus</option>
                                <option value="cocoa">Cocoa</option>
                                <option value="nutty">Nutty</option>
                                <option value="spicy">Spicy</option>
                                <option value="blueberry">Blueberry</option>
                                <option value="hazelnut">Hazelnut</option>
                                <option value="almond">Almond</option>
                                <option value="coconut">Coconut</option>
                                <option value="cardamom">Cadamom</option>
                                <option value="floral">Floral</option>
                            </select>

                            <label for="region">Region</label>
                            <select id="region" v-model="region" @change="filterProducts">
                                <option selected value="">Select a region</option>
                                <option value="central america">Central America</option>
                                <option value="africa">Africa</option>
                                <option value="south america">South America</option>
                                <option value="asia pacific">Asia Pacific</option>
                                <option value="middle east">Middle East</option>
                            </select>
                        </div>
                        <div class="peso-precio">
                            <div class="contenedor-peso">
                                <p>Select a weight</p>
                                <div>
                                    <input type="radio" name="weight" id="weight-300" value="300" v-model="peso"
                                        @change="filterProducts">
                                    <p>300</p>
                                </div>
                                <div>
                                    <input type="radio" name="weight" id="weight-500" value="500" v-model="peso"
                                        @change="filterProducts">
                                    <p>500</p>
                                </div>
                                <div>
                                    <input type="radio" name="weight" id="weight-700" value="700" v-model="peso"
                                        @change="filterProducts">
                                    <p>700</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </article>
            <article :class="['contenedor-cards', { 'background-dark': comprobarDarkMode() }]">
                <div :class="['card', { 'card-oscuro': comprobarDarkMode() }]" @click="navigationProduct(product.id)"
                    v-for="product in products" :key="product.id">
                    <img class="imagen" :src="product.image" :alt="product.name">
                    <div :class="['circulo', 'circulo-' + product.id]"></div>
                    <p class="nombre">{{ product.flavor_name }}</p>
                    <h3 class="titulo">{{ product.name }}</h3>
                    <span class="precio">${{ product.price }}</span>
                    <div class="contenedor-btn">
                        <button @click.stop="addToCart(product.id)" class="añadir-carrito">Add to cart ⟶</button>
                        <button @click.stop="addToWishlist(product.id)" class="añadir-favoritos"><img class="favoritos"
                                src="../../../assets/corazon.svg" alt="Add to your wishlist"></button>
                    </div>
                </div>
            </article>
        </section>
    </main>
</template>

<script>
import router from '@/aromio/router/router'
import DarkModeBtn from '@/aromio/shared/DarkModeBtn.vue'
import { darkMode } from '@/aromio/stores/darkMode'
import '@/assets/css/base.css'
import '@/assets/css/darkMode.css'
import { userStore } from '@/aromio/stores/userStore'
import { almacen } from '@/aromio/stores/almacen'

export default {
    data() {
        return {
            products: [],
            busqueda: "",
            wishlistNumbers: [],
            carrito: [],
            username: userStore().username,
            abierto: false,
            sabor: "",
            peso: null,
            region: "",
        };
    },
    watch: {
        carrito: function () {
            this.carrito
        }
    },
    async created() {
        await almacen().loadCart()
        this.carrito = almacen().carrito
    },
    //cuando el componente se monta se recogen los productos y se almacenan en una variable
    mounted() {
        this.getProducts()
    },

    methods: {

        comprobarDarkMode() {
            const darkModeBtn = darkMode()
            return darkModeBtn.darkMode
        },

        detectarLogin() {
            const user = userStore()
            return user.loggedIn
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
                return Promise.resolve();
            }
        },

        addToCart(item) {
            almacen().addToCart(item)
            this.$emit('updateCart')
        },
        //este metodo rellena la url según los parámetros que estén rellenados en los filtros,
        //ya que la url es diferente dependiendo de si el usuario quiere filtrar solo por sabores, solo por peso, o por ambos
        async filterProducts() {
            let url = 'http://localhost:8000/api/products/filter'

            let params = '?'
            if (this.sabor) params += `flavor=${this.sabor}&`
            if (this.peso) params += `weight=${this.peso}&`
            if (this.region) params += `region=${this.region}&`

            try {
                const response = await fetch(`${url}${params}`)
                if (!response.ok) {
                    throw new Error(`error: ${response.status}`)
                }
                const products = await response.json()
                this.products = products
            } catch (error) {
                console.error(error)
            }
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

        async getFlavors(sabor) {
            try {
                const res = await fetch(`http://localhost:8000/api/products/flavors/${sabor}`)
                const data = await res.json()
                this.products = data
            }
            catch (error) {
                console.error(error)
            }
        },
        async getWeight(peso) {
            try {
                const res = await fetch(`http://localhost:8000/api/products/weight/${peso}`)
                const data = await res.json()
                this.products = data
            }
            catch (error) {
                console.error(error)
            }
        },
        //lleva a la ruta del producto concreto
        navigationProduct(id) {
            router.push(`/public/${id}`)
        },

        //se asegura de que el input no sea un espacio ni esté en blanco y luego hace la búsqueda
        async search(busqueda) {
            try {
                if (busqueda.trim() === "") {
                    return this.getProducts()
                }
                const res = await fetch(`http://localhost:8000/api/products/search?dato=${busqueda}`)
                const data = await res.json()
                this.products = data
            }
            catch (error) {
                console.error(error)
            }
        },

        //busca en el campo de wishlist del usuario en concreto e introduce los números en un array para su facil manejo (ya que la respuesta es una cadena)
        async addToWishlist(productId) {
            try {
                const response = await fetch(`http://localhost:8000/api/wishlist/${this.username}/add/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    console.error('Error al agregar el producto a la wishlist:', response.statusText)
                    return
                }
                this.wishlistNumbers.push(productId)
            }
            catch (error) {
                console.error('Error al agregar el producto a la wishlist:', error)
            }
        },

        //función añadir al carrito
        // addToCart(product) {

        //     //comprueba si el producto está o no en el carrito comparando sus ids
        //     const index = this.carrito.findIndex((item) => item.id === product.id)

        //     //si está (es decir, findIndex NO devuelve un -1), se aumenta la cantidad del mismo en vez de añadirlo de nuevo
        //     if (index !== -1) {
        //         this.carrito[index].cantidad += 1
        //     }

        //     //si NO está, lo mete en el carrito con sus datos
        //     else {
        //         this.carrito.push({
        //             id: product.id,
        //             name: product.name,
        //             cantidad: 1,
        //             image: product.image,
        //         });
        //     }
        //     const user = userStore()
        //     user.setCart(this.carrito)
        // },
    },
    components: { DarkModeBtn }
}
</script>

<style scoped>
.contenedor-peso {
    width: 100%;
}

/* 
.peso-precio {
    display: flex;

}

.precio-frase,
.contenedor-precio-frase {
    font-family: 'Alata', sans-serif;
    color: rgb(0, 0, 0);
    margin: 0 auto;
    background-color: white;
}

.contenedor-precio-frase {
    padding-bottom: 2vh;
}

.contenedor-precio {
    background-color: white;
    width: 50%;
    padding-top: 2vh;
}

#price-min,
#price-max {
    width: 8vh;
    height: 4vh;
    border-radius: 10px;
    margin: 0 1vh;
}

#price-max {
    margin-left: 3.2vh;
} */

.contenedor-filtros {
    display: flex;
    justify-content: center;
}

.oculto {
    display: none;
}

.contenedor-filtros:hover .oculto {
    display: unset;
}

.contenedor-selectores-filtros {
    display: flex;
    padding: 2vh;
}

label {
    display: none
}

.contenedor-peso div,
.contenedor-peso p:first-child {
    display: flex;
    gap: 1vh;
    padding-left: 4vh;
}

.contenedor-peso {
    padding-top: 2vh;
    font-family: 'Alata', sans-serif;
    background-color: white;
}

.contenedor-peso p,
.contenedor-selectores-filtros,
.contenedor-peso div {
    background-color: white;
}

#weight-300,
#weight-500,
#weight-700 {
    width: 2vh;
    display: flex;

}

.contenedor-peso p {
    display: flex;
    align-items: center;
}

#flavor,
#region {
    display: flex;
    margin: 0 auto;
    background-color: white;
    border-radius: 30px;
    font-size: 1.6vh;
    font-family: 'Alata', sans-serif;
}

.contenedor-peso label {
    color: #000;
}

.filtros-fondo {
    margin-left: 2vh;
    background-color: white;
    height: 5vh;
    width: 5vh;
    border-radius: 75%;
    display: flex;
    justify-content: center;
    cursor: pointer;
    box-shadow: rgb(135, 135, 135) -5px 6px 15px -5px;
}

.filtros-desplegable {
    position: absolute;
    background-color: white;
    width: 38vh;
    height: 30vh;
    box-shadow: rgb(135, 135, 135) 5px 6px 15px -5px;
    margin-top: 5.1vh;
    z-index: 3;
    border-radius: 10px;
}

.filtros-desplegable-abrir {
    display: unset;
}

.filtros-fondo img {
    background-color: transparent;
    transform: scale(0.5);
}

label {
    color: transparent;
    user-select: none;
}

.contenedor-buscador {
    display: flex;
    position: relative;
    justify-content: center;
    padding-top: 10vh;
    align-items: center;
}

.añadir-favoritos {
    border: 0;
    background-color: transparent;
    cursor: pointer;
}

.search-icon {
    height: 2.5vh;
    position: absolute;
    background-color: white;
    margin-left: 18vh;
    cursor: pointer;
}

.contenedor-buscador input {
    height: 4.8vh;
    width: 30vh;
    border-radius: 30px;
    border: 0;
    background-color: white;
    filter: drop-shadow(-4px 5px 7px rgba(0, 0, 0, 0.25));
    text-indent: 16px;
}

.contenedor-buscador input::placeholder {
    font-family: 'Alata', sans-serif;
    font-size: 1.5vh;
    text-indent: 16px;
    color: rgb(181, 181, 181);
    letter-spacing: 0.5px;
}

.contenedor-buscador input:focus {
    outline: 0;
}

.contenedor-buscador input:focus::placeholder {
    color: transparent;
}

.fondo {
    display: flex;
    flex-direction: column;
}

.favoritos {
    margin-right: 8px;
    transition: 0.3s;
    z-index: 3;
}

.favoritos:hover {
    transform: scale(1.3);
}

.añadir-carrito:hover {
    transform: scale(1.1);
    background-color: transparent;
}

.circulo {
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    z-index: -1;
    top: 0;
    margin-left: 58px;
    transition: all 0.3s;
}

.card:hover .circulo {
    transform: translateY(15px);
}

.card {
    position: relative;
    background-color: white;
    width: 290px;
    height: 350px;
    margin-bottom: 200px;
    text-align: center;
    border-radius: 30px;
    padding: 10px;
    filter: drop-shadow(-4px 10px 10px rgba(72, 72, 72, 0.5));
    cursor: pointer;
    transition: all 0.3s;
}

.card:hover {
    filter: drop-shadow(-10px 12px 10px rgba(72, 72, 72, 0.7));
    transform: scale(1.1);
}

.card:hover .imagen {
    transform: translateY(-15px);
}

.contenedor-cards {
    padding: 30vh;
    padding-top: 20vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.nombre {
    color: rgb(136, 136, 136);
}

.titulo {
    color: rgb(73, 30, 18);
}

.imagen {
    background-color: transparent;
    width: 100%;
    height: 35vh;
    object-fit: cover;
    border-radius: 8px;
    display: block;
    margin: -150px 0 auto;
    filter: drop-shadow(-4px 10px 10px rgba(72, 72, 72, 0.5));
    transition: all 0.3s;
}

.nombre,
.titulo,
.precio {
    font-family: 'Alata', sans-serif;
    margin: 10px 0;
    background-color: transparent;
}

.precio {
    font-family: 'Alata', sans-serif;
    margin: 10px 0;
    background-color: white;
    margin-top: 20px;
    color: rgb(109, 109, 109);
}

.añadir-carrito,
.favoritos {
    padding: 8px;
    cursor: pointer;
    border: none;
    background-color: transparent;
    border-radius: 4px;
    margin-top: 8px;
}

.contenedor-btn {
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 10px;
}

.añadir-carrito {
    font-family: 'Alata', sans-serif;
    padding: 8px;
    cursor: pointer;
    border: none;
    background-color: transparent;
    border-radius: 4px;
    color: rgb(131, 73, 49);
    transition: .3s ease all;
    margin-left: 10px;
}

@media screen and (max-width: 800px) {

    .card {
        background-color: white;
        width: 290px;
        height: 350px;
        margin-bottom: 150px;
        position: relative;
        z-index: 1;
    }

    .contenedor-cards {
        padding: 0px;
        padding-top: 200px;
    }

    .nombre,
    .precio,
    .titulo,
    .favoritos,
    .añadir-carrito,
    .contenedor-btn {
        background-color: transparent;
        position: relative;
        z-index: 2;
    }
}

/* <div class="contenedor-precio">
    <p class="contenedor-precio-frase">Choose a price range</p>
    <div @change="filterProducts" class="precio-frase">From <input type="number"
            placeholder="Min." class="price-min" id="price-min" v-model="minPrice"> $</div>
    <div @change="filterProducts" class="precio-frase"> to <input type="number"
            placeholder="Max." class="price-max" id="price-max" v-model="maxPrice"> $</div>
</div> */
</style>
