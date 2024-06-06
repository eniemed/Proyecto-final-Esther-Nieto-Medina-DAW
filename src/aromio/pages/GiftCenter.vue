<template>
    <section class="contenedor-general-gifts">
        <h1>Gift Center</h1>
        <h3>This is the gift center! Here you can create gift packs and send them directly to your friends and family!
            Choose your favorite products and share them with your loved ones by clicking the button down below.</h3>
        <article class="contenedor-contenido">
            <button class="btn-add" @click="createGiftPack()">New Gift Pack +</button>
            <article class="contenedor-orden-packs">
                <article class="contenedor-listas-pack" v-for="(pack, index) in giftPacks" :key="index">
                    <div class="contenedor-pack">
                        <input class="titulo" type="text" :value="'Pack ' + (index + 1)">
                        <div class="cuerpo-pack">
                            <button @click="showSelect(index)" class="btn-plus">+</button>
                            <article class="productos-todos">
                                <article class="producto-cuerpo" v-for="id in pack" :key="id">
                                    <img :title="products.find(product => product.id === id || '').name" class="producto-foto" :src="products.find(product => product.id === id).image" alt="">
                                    <img class="borrar-producto" src="../../assets/borrar.svg" alt="Remove product from pack">
                                </article>
                            </article>
                            
                        </div>
                        <select class="gift-product" name="gift-product" :id=index>
                            <option selected hidden disabled value="">Choose a product</option>
                            <option v-for="product in products" :value="product.id">{{ product.name }}</option>
                        </select>
                    </div>
                </article>
            </article>

        </article>
    </section>


</template>

<script>
import { userStore } from "@/aromio/stores/userStore";

export default {

    data() {
        return {
            giftPacks: [],
            products: [],
            clicked: false,
        }
    },
    created() {
        this.getGiftPacks();
        this.getProducts();
    },
    methods: {
        async getProducts() {

            try {
                const res = await fetch("http://localhost:8000/api/products")
                const data = await res.json()
                this.products = data
            }
            catch (error) {
                console.error(error)
            }
            console.log(this.giftPacks)
        },
        showSelect(index) {
            this.clicked = !this.clicked;
            const selectElement = document.getElementById(index);
            if (this.clicked) {
                selectElement.style.display = 'block';
            } else {
                selectElement.style.display = 'none';
            }

        },
        getGiftPacks() {
            const user = userStore()
            fetch(`http://localhost:8000/api/users/${user.username}/gift-packs`)
                .then(response => response.json())
                .then(data => {
                    this.giftPacks = data;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        async createGiftPack() {
            this.giftPacks.push([])

            const user = userStore()
            fetch(`http://localhost:8000/api/users/${user.username}/gift-packs`, {
                method: 'POST',
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch((error) => {
                    console.error('Error:', error);
                });

            this.getGiftPacks();
        }
    }
}
</script>

<style scoped>

.borrar-producto {
    height: 3em;
}

.productos-todos{
    display: flex;
    height: 20em;
    width: 100%;
    overflow-x: auto;
}

.cuerpo-pack {
    border: 1px solid rgb(192, 192, 192);
    border-radius: 20px;
    min-height: 15em;
    margin-top: 1em;
    align-items: center;
    padding: 1em 2em;
    display: flex;
}
.producto-nombre {
    font-family: 'Alata', sans-serif;
    font-size: 1em;
    color: rgb(62, 38, 26);
    text-align: center;
}

.producto-cuerpo{
    display: flex;
    flex-direction: column;
    height: 15em;
    width: auto;
}

.producto-foto {
    height: 100%;
}

.contenedor-orden-packs {
    display: flex;
    flex-direction: column-reverse;

}

.gift-product {
    border: none;
    background-color: rgb(215, 215, 215);
    color: rgb(46, 44, 43);
    font-family: 'Alata', sans-serif;
    font-size: 1.2em;
    border-radius: 20px;
    width: 15%;
    height: 2em;
    cursor: pointer;
    margin-top: 1em;
    display: none;

}

.btn-plus {
    border: none;
    background-color: rgb(215, 215, 215);
    color: rgb(255, 255, 255);
    font-family: 'Alata', sans-serif;
    font-size: 5em;
    border-radius: 20px;
    width: 1.5em;
    height: 1.5em;
    cursor: pointer;
    display: flex;
    align-content: center;
    justify-content: center;

}

.titulo {
    font-family: 'Alata', sans-serif;
    font-size: 2em;
    color: rgb(62, 38, 26);
    border: none;
    background-color: transparent;
    border-bottom: 1px solid rgb(164, 164, 164);
    width: fit-content;
}

.contenedor-pack {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    margin: 2em 0;
}

.contenedor-general-gifts {
    display: flex;
    flex-direction: column;
    padding: 3em;
    min-height: 100vh;
}

h1 {
    font-family: 'Archivo Black', sans-serif;
    font-size: 3em;
    color: rgb(62, 38, 26);
}

h3 {
    font-family: 'Alata', sans-serif;
    font-size: 1.5em;
    color: rgb(155, 114, 93);
    padding: 2em 0;
}

.btn-add {
    border: none;
    background-color: rgb(62, 38, 26);
    color: white;
    font-family: 'Alata', sans-serif;
    font-size: 1.5em;
    border-radius: 50px;
    height: 2.2em;
    width: 9em;
    cursor: pointer;

}
</style>