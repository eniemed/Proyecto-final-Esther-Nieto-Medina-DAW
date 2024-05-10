<template>
    <main>
        <section v-if="product" class="contenedor">
            <article :class="['contenedor-img', 'circulo-' + product.id]">
                <img class="imagen" :src="product.image" :alt="product.name">
            </article>
            <article class="contenedor-info">
                <div class="contenedor-info-general">
                    <h1 class="contenedor-info-name">{{ product.name }}</h1>
                    <p class="contenedor-info-flavor">{{ product.flavor_name }}</p>
                    <p class="contenedor-info-price">${{ product.price }}</p>
                    <p class="contenedor-info-description">{{ product.description }}</p>
                    <table class="contenedor-info-table">
                        <tr>
                            <td>Weight</td>
                            <td>{{ product.weight }}</td>
                        </tr>
                        <tr>
                            <td>Region</td>
                            <td>{{ product.region }}</td>
                        </tr>
                    </table>
                    
                    <div class="contenedor-info-grind">
                        <select id="grind" v-model="selectedGrind">
                            <option class="placeholder" value="" selected hidden>Choose your grind</option>                            <option value="coarse">Coarse grind</option>
                            <option value="medium">Medium grind</option>
                            <option value="fine">Fine grind</option>
                            <option value="whole">Whole beans</option>
                        </select>
                    </div>
                    
                    <div class="contenedor-info-btn">
                        <button class="contenedor-info-cart" @click="addToCart(product)">Add to cart</button>
                        <img class="contenedor-info-wishlist" @click="addToWishlist(product.id)"
                            src="../../../assets/corazon.svg" alt="Add to your wishlist">
                    </div>
                </div>
            </article>
        </section>
    </main>
</template>

<script>
import router from "@/aromio/router/router";
import { userStore } from "@/aromio/stores/userStore";
import '@/assets/css/base.css'

export default {
    data() {
        return {
            selectedGrind: "",
            product: null,
            id: null,
            carrito: userStore().cart,
            username: userStore().username
        };
    },

    // Al crearse el componente llamamos a la función que obtiene un producto por id, que lo recoge de la ruta porque es un parametro de la misma
    created() {
        const { id } = this.$route.params
        this.id = id
        this.getProducts(this.id)
    },
    methods: {

        // llama a la api y busca un producto por id
        async getProducts(id) {
            try {
                const res = await fetch(`http://localhost:8000/api/${id}`)
                const data = await res.json()
                this.product = data
            } catch (error) {
                console.error(error)
            }
        },

        // añade al carrito un producto
        addToCart(product) {

            // con el id encuentra el producto en el carrito
            const index = this.carrito.findIndex((item) => item.id === product.id)
            // findIndex devuelve -1 si no lo encuentra, por lo que si NO es -1 significa que el prod ya está en el carrito 
            // y en vez de volver a añadirlo, le suma 1 a su cantidad
            if (index !== -1) {
                this.carrito[index].cantidad += 1;
            } else {
                // si no lo encuentra, lo añade con todos sus datos
                this.carrito.push({
                    id: product.id,
                    name: product.name,
                    cantidad: 1,
                    image: product.image,
                })
            }
            const user = userStore()
            //guardamos el carrito en la variable global
            user.setCart(this.carrito)
        },

        // función que añade un producto a la wishlist por id
        async addToWishlist(productId) {
            try {

                //método put que añade a la base de datos los id de los productos en el campo wishlist
                const response = await fetch(`http://localhost:8000/api/wishlist/${this.username}/add/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if (!response.ok) {
                    console.error('Error al agregar el producto a la wishlist:', response.statusText)
                    return
                }

            } catch (error) {
                console.error('Error al agregar el producto a la wishlist:', error)
            }
        },
    }
}
</script>

<style scoped>

select {
    font-family: 'Alata', sans-serif;
    font-size: 1.5vh;
    color: black;
    border: 1px solid rgb(128, 128, 128);
    border-radius: 30px;
    cursor: pointer;
}


select .placeholder {
    color: rgb(128, 128, 128);
}

.contenedor {
    height: 100%;
    width: 100%;
    display: flex;
}

.contenedor-img {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.imagen {
    background-color: transparent;
    height: 94.56vh;
}

.contenedor-info {
    width: 50%;
    box-shadow: -35px 0px 20px -22px rgba(0, 0, 0, 0.25);
    display: flex;
}

.contenedor-info-grind {
    padding-bottom: 5vh;
}

.contenedor-info-grind select {
    height: 3vh;
    width: 22vh;
    border-radius: 30px;
}

.contenedor-info-name {
    font-family: 'Archivo Black', sans-serif;
    text-transform: uppercase;
    color: rgb(96, 61, 42);
    font-size: 6vh;
}

.contenedor-info-flavor {
    font-family: 'Alata', sans-serif;
    color: rgb(146, 146, 146);
    font-size: 2.2vh;
    margin-bottom: 7vh;
}

.contenedor-info-price {
    font-family: 'Alata', sans-serif;
    color: rgb(120, 64, 33);
    font-size: 4vh;
    margin-bottom: 2vh;
}

.contenedor-info-description {
    font-family: 'Alata', sans-serif;
    color: rgb(128, 128, 128);
    font-size: 2.3vh;
    margin-bottom: 5vh;
}

.contenedor-info-table {
    border-collapse: collapse;
    height: 7vh;
    width: 22vh;
    text-indent: 8px;
    margin-bottom: 5vh;
}

td,
th {
    border: 1px solid black;
    font-family: 'Alata', sans-serif;
}

.contenedor-info-table tr td:first-child {
    color: rgb(97, 97, 97);
}

.contenedor-info-btn {
    display: flex;
    align-items: center;
}

.contenedor-info-cart {
    background-color: rgb(96, 61, 42);
    color: white;
    border: 0;
    font-family: 'Alata', sans-serif;
    border-radius: 100px;
    height: 4vh;
    width: 15vh;
    cursor: pointer;
    font-size: 1.9vh;
}

.contenedor-info-wishlist {
    height: 25px;
    margin-left: 15px;
    cursor: pointer;
}

.contenedor-info-general {
    margin: 0 auto;
    width: 80%;
    height: 80vh;
    padding-top: 10vh;
}



@media screen and (max-width: 800px) {
    .contenedor {
        flex-direction: column;
    }

    .contenedor-img {
        width: 100%;
        height: 40vh;
    }

    .imagen {
        height: 50vh;
    }

    .contenedor-info-name {
        font-size: 4vh;
        width: 50vh;
    }

    .contenedor-info-flavor, .contenedor-info-description {
        font-size: 2vh;
        width: 40vh;
        margin-bottom: 1vh;
    }

    .contenedor-info-price {
        font-size: 3vh;
        margin-bottom: 1vh; 
    }

    .contenedor-info-table {
        margin-bottom: 3vh;
    }

    .contenedor-info-general {
        height: 40vh;
    }
}
</style>
