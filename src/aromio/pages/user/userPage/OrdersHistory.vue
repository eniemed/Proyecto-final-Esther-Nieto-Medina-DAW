<template>
    <section class="main-order">
        <h1>Orders history</h1>
        <article class="contenedor-order">
            <article class="order-item" v-for="order in orders" :key="order.id">
                <div class="order-img">
                    <img src="../../../../assets/caja-abierta.png" v-if="orderDate(order)">
                    <img src="../../../../assets/caja-cerrada.png" v-else>
                </div>
                <div class="order-id">{{ order.order_id }}</div>
                <div class="order-date">{{ order.date }}</div>
                <div class="order-state" v-if="orderDate(order)">Delivered</div>
                <div class="order-state" v-else>Pending</div>
            </article>
            <article class="order-titulos">
                <div class="titulos-order">Order</div>
                <div class="titulos-id">Id</div>
                <div class="titulos-date">Date</div>
                <div class="titulos-state">State</div>
            </article>
        </article>
    </section>
</template>

<script>
import { userStore } from "@/aromio/stores/userStore";

export default {
    data() {
        return {
            //array que recogerá los pedidos de usuario
            orders: [],
        }
    },
    created() {
        this.getOrders();
    },
    methods: {

        //esta funcion recoge el campo date de la tabla de pedidos y lo compara con la fecha de hace 3 días
        //de esta manera simulo que los pedidos de hace 3 días o más ya han sido enviados
        //lo cual se reflejará en la página con una foto asignada diferente a los pedidos no enviados
        //y con un estado que dirá delivered si ya fue entregado o pending si no
        orderDate(item) {
            const orderDate = new Date(item.date);
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

            return orderDate < threeDaysAgo;
        },
        async getOrders() {
            const user = userStore();
            const response = await fetch(`http://localhost:8000/api/orders/${user.username}`)
            const data = await response.json();

            this.orders = data;
            console.log(this.orders)
        }
    },
}

</script>

<style scoped>
    h1 {
        font-family: 'Archivo Black', sans-serif;
        font-size: 3em;
        padding: 1em 1.8em;
        color: rgb(75, 47, 31);
    }

    img {
        width: 4em;
        height: 4em;
    }

    .contenedor-order {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex-direction: column-reverse;
    }

    .order-titulos {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        width: 60%;
        padding: 1em 3em;
        margin: 0.5em 3.5em;
        font-size: 1.3em;
        font-family: 'Alata', sans-serif;
        color: rgb(143 92 56);
    }

    .titulos-id { grid-area: 1 / 2 / 2 / 3; }
    .titulos-date { grid-area: 1 / 3 / 2 / 4; }
    .titulos-state { grid-area: 1 / 4 / 2 / 5; }

    .order-item {
        display: flex;
        justify-content: space-between;
        margin: 0.5em 5em;
        border: 2px solid #ccc;
        border-radius: 50px;
        font-size: 1em;
        font-family: 'Alata', sans-serif;
        padding: 1em 3em;
        width: 50%;
        align-items: center;

    }
</style>