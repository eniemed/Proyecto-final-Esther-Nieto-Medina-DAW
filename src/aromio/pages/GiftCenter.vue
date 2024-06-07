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
                        <div class="contenedor-titulo-borrar">
                            <input class="titulo" type="text" :value="'Pack ' + (index + 1)">
                            <img @click="removeGiftPack(index)" class="borrar-pack" src="../../assets/borrar-pack.svg" alt="Delete pack">
                        </div>

                        <div class="cuerpo-pack">
                            <button @click="showSelect(index)" class="btn-plus">+</button>
                            <article class="productos-todos">
                                <article class="producto-cuerpo" v-for="id in uniqueProducts(pack)" :key="id">
                                    <div class="contenedor-cantidad">
                                        <img @click="removeProductFromGiftPack(index, id)" class="btn-quitar"
                                            src="../../assets/minus.svg" alt="Remove one from the pack">
                                        <p class="cantidad">{{ countProductOccurrences(index, id) }}</p>
                                        <img @click="addProductToPack(index, id)" class="btn-añadir"
                                            src="../../assets/plus.svg" alt="Add one more to the pack">
                                    </div>
                                    <img :title="getProductById(id).name" class="producto-foto"
                                        :src="getProductById(id).image" alt="Your product">
                                    <img @click="deleteAllInstancesFromPack(index, id)" class="borrar-producto"
                                        src="../../assets/borrar.svg" alt="Remove product from pack">
                                </article>
                            </article>

                        </div>
                        <select @change="addProductToPack(index, $event.target.value)" class="gift-product"
                            name="gift-product" :id=index>
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
        async removeGiftPack(packIndex) {
            // Eliminar el pack de regalo en el índice dado
            this.giftPacks = [...this.giftPacks.slice(0, packIndex), ...this.giftPacks.slice(packIndex + 1)];

            const user = userStore();
            // Realizar la llamada a la API para eliminar el pack de regalo en el servidor
            fetch(`http://localhost:8000/api/user/${user.username}/pack/${packIndex}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch((error) => {
                    console.error('Error:', error);
                });

        },
        async addProductToPack(packId, productId) {
            // Añadir el producto al pack correspondiente
            if (packId >= 0 && packId < this.giftPacks.length) {
                this.giftPacks[packId].push(productId);
            }

            // Obtener el nombre de usuario
            const user = userStore();

            // Realizar la llamada HTTP
            try {
                const response = await fetch(`http://localhost:8000/api/user/${user.username}/add/${packId}/product/${productId}`, {
                    method: 'POST',
                });

                // Comprobar si la llamada HTTP fue exitosa
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Actualizar la vista o manejar la respuesta de la llamada HTTP si es necesario
            } catch (error) {
                console.error('There was a problem with the fetch operation: ' + error.message);
            }

            this.getGiftPacks();
            this.getProducts();
        },
        async removeProductFromGiftPack(packId, productId) {
            // Verificar si el índice del pack es válido
            if (packId >= 0 && packId < this.giftPacks.length) {
                // Encontrar el índice del producto en el pack
                const productIndex = this.giftPacks[packId].indexOf(productId);

                // Verificar si el producto está en el pack
                if (productIndex !== -1) {
                    // Eliminar el producto del pack
                    this.giftPacks[packId].splice(productIndex, 1);
                } else {
                    console.error('Product not found in the specified pack');
                }
            } else {
                console.error('Pack index out of range');
            }
            const user = userStore();
            try {
                const response = await fetch(`http://localhost:8000/api/users/${user.username}/gift-packs/${packId}/products/${productId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                console.log('Product removed successfully');
            } catch (error) {
                console.error('Error:', error);
            }

            this.countProductOccurrences(packId, productId);
        },
        countProductOccurrences(packId, productId) {
            if (packId >= 0 && packId < this.giftPacks.length) {
                // Obtener el pack específico
                const pack = this.giftPacks[packId];
                // Contador para almacenar el número de ocurrencias del producto
                let count = 0;
                // Recorrer el pack y contar las ocurrencias del producto
                for (const id of pack) {
                    if (id === productId) {
                        count++;
                    }
                }
                return count;
            } else {
                return 0; // Si el índice de pack es inválido, devolvemos 0
            }
        },
        uniqueProducts(pack) {
            return [...new Set(pack)];
        },
        async deleteAllInstancesFromPack(packId, productId) {
            if (packId >= 0 && packId < this.giftPacks.length) {
                let productIndex = this.giftPacks[packId].indexOf(productId);
                while (productIndex !== -1) {
                    this.giftPacks[packId].splice(productIndex, 1);
                    productIndex = this.giftPacks[packId].indexOf(productId);
                }
            }
            const user = userStore();
            try {
                const response = await fetch(`http://localhost:8000/api/user/${user.username}/gift-packs/${packId}/product/${productId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                console.log('Product removed successfully');
            } catch (error) {
                console.error('Error:', error);
            }
        },

        getProductById(id) {
            return this.products.find(product => product.id === id) || {};
        },

        async getProducts() {
            try {
                const res = await fetch("http://localhost:8000/api/products");
                const data = await res.json();
                this.products = data;
            } catch (error) {
                console.error(error);
            }
            console.log(this.giftPacks);
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
            const user = userStore();
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
            this.giftPacks.push([]);

            const user = userStore();
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
.contenedor-titulo-borrar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.borrar-pack {
    width: 3.5em;
    height: 3.5em;
    cursor: pointer;
}

.cantidad {
    font-family: 'Alata', sans-serif;
    font-size: 1.5em;
    color: rgb(62, 38, 26);
    padding: 0 0.4em
}

.contenedor-cantidad {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1em;

}

.btn-quitar,
.btn-añadir {
    width: 1.5em;
    height: 1.5em;
    cursor: pointer;
}

.borrar-producto {
    height: 3em;
    cursor: pointer;
}

.productos-todos {
    display: flex;
    height: 23em;
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

.producto-cuerpo {
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
    height: 3.5em;
    cursor: pointer;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;

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