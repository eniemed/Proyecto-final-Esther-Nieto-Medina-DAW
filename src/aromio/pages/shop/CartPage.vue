<template>
    <section class="contenedor-carrito">
        <article class="encabezado-carrito">
            <h1>Shopping cart</h1>
            <h1>3 items</h1>
        </article>
        <article class="cuerpo-carrito">
            <article class="contenedor-productos">
                <article v-for="item in this.carrito" :key="item.id" class="carrito-item">
                    <img :src="item.image" :alt="item.name" class="carrito-imagen" />
                    <div class="carrito-detalle">
                        <p class="carrito-nombre">{{ item.name }}</p>
                        <div class="contenedor-cantidad">
                            <img class="carrito-quitar-cantidad" @click="" src="../../../assets/minus.svg"
                                alt="Remove one" />
                            <p class="carrito-numero-cantidad">3</p>
                            <img class="carrito-añadir-cantidad" @click="" src="../../../assets/plus.svg"
                                alt="Add one more" />
                        </div>
                        <img src="../../../assets/borrar.svg" class="carrito-borrar" @click="" alt="Remove from cart">
                    </div>
                </article>
            </article>
            <article class="detalles-pago">

            </article>
        </article>

    </section>
</template>

<script>
import { userStore } from '../../stores/userStore';
import { almacen } from '../../stores/almacen';


export default {

    data() {
        return {
            carrito: [],
            products: [],
        };
    },

    async created() {
        await almacen().loadCart()
        this.carrito = almacen().carrito
    },
    methods: {
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
    },
}
</script>

<style scoped>
.encabezado-carrito{
    display: flex;
    width: 70%;
    justify-content: space-between;
    padding: 3em 9em;
}

.encabezado-carrito h1 {
    font-family: 'Alata', sans-serif;
    font-size: 2em;
}


.carrito-numero-cantidad{
    font-family: 'Alata', sans-serif;
    font-size: 1.2em;
    padding: 0 1em;

}
.carrito-quitar-cantidad{
    height: 30px;
    cursor: pointer;
}

.carrito-añadir-cantidad{
    height: 35px;
    cursor: pointer;
}


.carrito-imagen {
    width: 20em;
}

.carrito-item {
    display: flex;
    border-bottom: 2px solid rgb(219, 218, 218);
    margin: 0 3em;
}

.detalles-pago {
    background-color: rgb(219, 218, 218);
    width: 30%;
    height: auto;
    box-shadow: -10px 10px 60px -20px rgba(94,94,94,1);
    border-radius: 20px;
}

.cuerpo-carrito {
    height: auto;
    width: 100%;
    display: flex;
}

.contenedor-productos {
    width: 70%;
    height: 100%;
}

.carrito-detalle {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.contenedor-cantidad {
    display: flex;
    justify-content: center;
    width: 25%;
    align-self: center;
}

.carrito-nombre {
    width: 25%;
    font-family: 'Alata', sans-serif;
    font-size: 1.5em;
    align-self: center;
}

.carrito-borrar {
    height: 60px;
    align-self: center;
    margin-right: 100px;
    cursor: pointer;
}
</style>