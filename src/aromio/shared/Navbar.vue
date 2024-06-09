<template>
    <header>
        <router-link :to="{ name: 'public-home' }">
            <img src="../../assets/logo.png" alt="Aromio" />
        </router-link>


        <nav>
            <ul id="links">
                <li><router-link
                        :to="{ name: 'public-home' }">Home</router-link></li>
                <li><router-link
                        :to="{ name: 'public-shop' }">Shop</router-link></li>
                <li><router-link
                        :to="{ name: 'public-wishlist' }">Wishlist</router-link></li>
                <li><router-link
                        :to="{ name: 'public-contact' }">Contact</router-link></li>
                <li><router-link
                        :to="{ name: 'public-giftCenter' }">Gift Center</router-link></li>  
                <li><router-link
                        :to="{ name: 'public-FAQ' }">FAQ</router-link></li>
            </ul>

        </nav>

        <Cart :key="cartKey" @updateCart="updateCartKey" class="carrito" />

        <nav>
            <div v-if="comprobarPrivate()">
                <router-link :to="{ path: '/private/profile' }">
                    <button class="username">

                        {{ username() }}
                    </button>
                </router-link>
            </div>

            <ul id="auth" v-if="!comprobarPrivate()">
                <li><router-link :to="{ name: 'public-login' }">Log
                        in</router-link></li>
                <li>
                    <router-link :to="{ name: 'public-signup' }">
                        <button class="btn-marron">Sign up</button>
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import router from '../router/router';
import Cart from '../shared/Cart.vue';
import { darkMode } from '../stores/darkMode';
import { userStore } from '../stores/userStore';
export default {
    components: { Cart },
    data(){
        return {
            cartKey: 0
        }
    },
    methods: {


        updateCartKey() {
            this.cartKey++
        },

        //comprueba si el usuario está o no loggeado para así mostrar una cosa u otra en el navbar (perfil privado o btn de login y registro)
        comprobarPrivate() {
            const user = userStore()
            return user.loggedIn
        },
        
        //recoge el username del usuario
        username() {
            const user = userStore()
            return user.username
        },
        navigateProfile() {
            router.push("/private/profile")
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Alata&family=Archivo+Black&display=swap');

* {
    margin: 0%;
    padding: 0%;
    box-sizing: border-box;
    background-color: transparent;
}

.background-dark {
    background-color: rgb(82, 58, 52);
}

.color-white {
    color: white;
}

template {
    position: relative;
}

.username {
    margin-right: 3vh;
    font-family: 'Alata', sans-serif;
    border: 0;
    border-radius: 20px;
    background-color: rgb(73, 30, 18);
    color: white;
    width: 150px;
    height: 4vh;

}

.carrito {
    position: absolute;
    width: 50px;
    right: 0;
    margin-right: 200px;
    padding-top: 1vh;
    z-index: 3;
    background-color: transparent;
}

header {
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Alata', sans-serif;
    height: 50px;
}



img {
    height: 50px;
}

button {
    font-size: 1.5vh;
}

ul {
    list-style: none;
    display: flex;
}

a {
    text-decoration: none;
    color: rgb(56, 56, 56);
}

#links {
    margin-right: 10vh;
}

#links li {
    margin-left: 60px;
    transition: all 0.3s;
}

#links li:hover {
    transform: scale(1.2);
}

#auth {
    align-items: center;
    margin-left: auto;
}

#auth li {
    margin-left: 25px;
    z-index: 6;
}



.btn-marron {
    color: white;
    background-color: rgb(73, 30, 18);
    font-family: 'Alata', sans-serif;
    cursor: pointer;
    height: 35px;
    width: 100px;
    border-radius: 50vh;
    border: none;
}

@media screen and (max-width: 940px) {
    #links li {
        margin-left: 20px;
        font-size: 12px;
    }

    #auth li {
        margin-left: 15px;
    }
}

@media screen and (max-width: 800px) {
    #links li {
        margin-left: 20px;
        font-size: 12px;
    }

    #auth li {
        margin-left: 15px;
    }

    .carrito {
        margin-right: 9.5vh;
        padding-top: 14vh;
    }
}

@media screen and (max-width: 600px) {
    header {
        align-items: center;
        text-align: center;
    }

    img {
        height: 40px;
    }

    #auth {
        display: none;
    }

    #links li {
        justify-content: flex-end;
        font-size: 4vw;
    }

    .carrito {
        margin-right: 2vh;
    }
}
</style>
