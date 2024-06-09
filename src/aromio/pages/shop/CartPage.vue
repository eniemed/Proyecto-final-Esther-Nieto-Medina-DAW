<template>
    <section class="contenedor-carrito">
        <article v-if="checkout" class="comprado-fondo">
            <div class="contenedor-comprado-mensaje">
                <h2>Your purchase was successful!</h2>
                <p>Thank you for your trust, fellow coffee lover!</p>
                <button @click="navigateShop">Accept</button>
            </div>
        </article>
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
                            <p class="carrito-numero-cantidad">1</p>
                            <img class="carrito-añadir-cantidad" @click="" src="../../../assets/plus.svg"
                                alt="Add one more" />
                        </div>
                        <p class="price">{{ item.price }} $</p>
                        <img src="../../../assets/borrar.svg" class="carrito-borrar" @click="" alt="Remove from cart">
                    </div>
                </article>
            </article>
            <article class="detalles-pago">
                <h1>Summary</h1>
                <article class="subtotal">
                    <p class="subtotal-texto">Subtotal</p>
                    <p class="subtotal-cantidad">{{ subtotal }} $</p>
                </article>
                <article class="shipping">
                    <p class="shipping-texto">Shipping</p>
                    <p class="shipping-cantidad">3.46 $</p>
                </article>
                <article class="discount" v-if="discount > 0">
                    <p class="discount-texto">Discount</p>
                    <p class="discount-cantidad">{{ discount }}%</p>
                </article>
                <hr class="separador">
                <article class="total">
                    <p class="total-texto">Total</p>
                    <p class="total-cantidad">{{ total }} $</p>
                </article>
                <div class="contenedor-btn">
                    <button @click="clearDiscount">Checkout</button>
                </div>

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
            subtotal: 0,
            total: 0,
            discount: 0,
            checkout: false
        };
    },

    async created() {
        await almacen().loadCart()
        this.carrito = almacen().carrito
        await this.fetchDiscount()
        this.calculateSubtotal()
        this.calculateTotal()

    },
    methods: {

        //función que elimina el descuento del usuario. Esto se lleva a cabo cuando hace su primera compra
        async clearDiscount() {
            const user = userStore()
            try {
                await fetch(`http://localhost:8000/api/user/${user.username}/clear-discount`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            } catch (error) {
                console.error('Error:', error);
            }
            //esta variable se utiliza para mostrar el mensaje de compra realizada
            this.checkout = true

            //como la compra se ha realizado, se añade el pedido a la tabla de pedidos
            try {
                await fetch(`http://localhost:8000/api/user/${user.username}/add-order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            } catch (error) {
                console.error('Error:', error);
            }

            //y se vacia el carrito
            try {
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

        navigateShop() {
            this.$router.push('/public/shop');
        },

        //recoge el descuento del usuario y lo establece en la variable discount
        async fetchDiscount() {
            const user = userStore()
            const response = await fetch(`http://localhost:8000/api/user/${user.username}`);
            const data = await response.json();

            //si encuentra descuento lo multiplico por 100 para que sea un porcentaje
            //si no encuentra, se establece en 0
            this.discount = data.discounts ? parseFloat(data.discounts) * 100 : 0;

            console.log(this.discount)

            return this.discount;
        },

        //calcula el subtotal, que es la suma de los precios de los productos redondeados a 2 decimales
        calculateSubtotal() {
            this.subtotal = 0;
            this.carrito.forEach(item => {
                this.subtotal += item.price;
            });
            this.subtotal = parseFloat(this.subtotal.toFixed(2));
        },

        //le suma los gastos de envio y realiza el descuento (si hay), dando como resultado el total de la compra
        calculateTotal() {
            this.calculateSubtotal();
            this.total = parseFloat((this.subtotal + 3.46).toFixed(2));
            if (this.discount > 0) {
                this.total = parseFloat((this.total - (this.subtotal * parseFloat(this.discount / 100))).toFixed(2));
            }

        },

        //recoge todos los productos y los guarda en el array products para un acceso más facil a ellos y sus campos
        async getProducts() {
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



.contenedor-btn {
    display: flex;
    justify-content: center;
    padding: 2em;
    background-color: rgb(219, 218, 218);
}

.detalles-pago h1 {
    font-family: 'Alata', sans-serif;
    font-size: 2em;
    padding: 1em;
    justify-content: center;
    background-color: transparent;

}

.detalles-pago article,
.detalles-pago p {
    background-color: rgb(219, 218, 218);
}

.detalles-pago article {
    display: flex;
    justify-content: space-between;
    padding: 1em 2em;
}

.detalles-pago article p {
    font-family: 'Alata', sans-serif;
    font-size: 1.3em;
}

.detalles-pago article p:first-child {
    color: rgb(125, 125, 125);
}

.detalles-pago .total .total-texto,
.detalles-pago .total .total-cantidad {
    font-weight: bold;
    font-size: 1.8em;
    padding-top: 1.5em;
}

.detalles-pago .total .total-texto,
.detalles-pago .total .total-cantidad {
    padding: 0;
}

.separador {
    margin: 3em 2em;
    border: 1px solid rgb(185, 185, 185);
}

.discount-cantidad {
    color: rgb(212, 93, 60);
    font-weight: bold;
}

.detalles-pago button {
    margin: 3em 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 3em;
    background-color: rgb(73, 30, 18);
    color: white;
    font-family: 'Alata', sans-serif;
    font-size: 1.5em;
    border: none;
    cursor: pointer;
    border-radius: 60px;
}

.price {
    display: flex;
    align-self: center;
    justify-self: center;
    font-family: 'Alata', sans-serif;
    font-size: 1.5em;
}

.encabezado-carrito {
    display: flex;
    width: 70%;
    justify-content: space-between;
    padding: 3em 9em;
}

.encabezado-carrito h1 {
    font-family: 'Alata', sans-serif;
    font-size: 2em;
}


.carrito-numero-cantidad {
    font-family: 'Alata', sans-serif;
    font-size: 1.2em;
    padding: 0 1em;

}

.carrito-quitar-cantidad {
    height: 30px;
    cursor: pointer;
}

.carrito-añadir-cantidad {
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
    box-shadow: -10px 10px 60px -20px rgba(94, 94, 94, 1);
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
    margin-right: 48px;
    cursor: pointer;
}
</style>