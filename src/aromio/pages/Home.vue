<template>
    <main>
        <DarkModeBtn />
        <section :class="[{ 'background-dark': comprobarDarkMode() }]">
            <article :class="['info-home', { 'background-dark': comprobarDarkMode() }]">
                <h1
                    :class="['info-home-titulo', { 'background-dark': comprobarDarkMode(), 'color-white': comprobarDarkMode() }]">
                    AROMIO</h1>
                <p :class="['info-home-texto', { 'color-white': comprobarDarkMode() }]">Your morning coffee only a click
                    away! Choose your type to wake up with full
                    energy.</p>
                <button @click="navigationShop" role="button" aria-label="Explore our products">Explore our
                    products</button>
            </article>
            <article :class="['info-caracteristicas', { 'background-dark': comprobarDarkMode() }]">
                <table>
                    <thead>
                        <tr :class="[{ 'background-dark': comprobarDarkMode() }]">
                            <th scope="col" :class="[{ 'background-dark': comprobarDarkMode() }]">Flavors</th>
                            <th scope="col" :class="[{ 'background-dark': comprobarDarkMode() }]">Roast Levels</th>
                            <th scope="col" :class="[{ 'background-dark': comprobarDarkMode() }]">Grind Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :class="[{ 'background-dark': comprobarDarkMode() }]">
                            <td scope="row">+ 30</td>
                            <td scope="row">5</td>
                            <td scope="row">7</td>
                        </tr>
                    </tbody>
                </table>
            </article>
        </section>
        <section>
            <article class="contenedor-foto-home">
                <!-- fotos decorativas con alt vacío, no dan información -->
                <img class="img-decorative" src="../../assets/decoration-home.svg" alt="">
                <img id="foto-home" src="../../assets/home-photo.png" alt="">
            </article>
        </section>
    </main>
</template>
<script>
import router from "../router/router"
import DarkModeBtn from "../shared/DarkModeBtn.vue"
import '@/assets/css/darkMode.css'
import { darkMode } from "../stores/darkMode"
export default {
    methods: {
        //manda al user a la tienda
        navigationShop() {
            router.push("/public/shop");
        },

        //comprueba si el darkmode está activado o no
        comprobarDarkMode() {
            const darkModeBtn = darkMode();
            return darkModeBtn.darkMode;
        },
    },
    components: { DarkModeBtn }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Alata&family=Archivo+Black&display=swap');

.img-decorative {
    position: absolute;
    margin-top: 10.5vw;
    top: 0;
    right: 0;
    background-color: rgb(230, 222, 219);
    height: 19vw;
    width: 32vw;
    border-bottom-left-radius: 50px;
    border-top-left-radius: 50px;
}

.info-home {
    display: flex;
    flex-direction: column;
    width: fit-content;
    height: auto;
    padding: 6vw;
    margin-left: 8.3vw;
    background-color: transparent;

}

.info-caracteristicas {
    position: absolute;
    background-color: transparent;
}

.contenedor-foto-home {
    position: relative;
    align-self: flex-end;
    margin-top: -27vw;
    position: relative;
    z-index: 1;
}

.info-home-texto {
    font-family: 'Alata', sans-serif;
    font-size: large;
    color: rgb(83, 57, 49);
    width: 70%;
    background-color: transparent;

}

.info-home-titulo {
    display: flex;
    font-family: 'Archivo Black', sans-serif;
    font-size: 8vw;
    color: rgb(83, 57, 49);
}

.info-home button {
    margin-top: 80px;
    font-family: 'Alata', sans-serif;
    background-color: rgb(73, 30, 18);
    color: white;
    font-size: 16px;
    border-radius: 40px;
    height: 47px;
    width: 180px;
    border: none;
    cursor: pointer;
}

#foto-home {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 5.8vh;
    margin-right: 9vw;
    width: auto;
    height: 30vw;
    background-color: transparent;
    filter: drop-shadow(-24px 26px 30px rgb(72, 72, 72));
}


table {
    margin-left: 9.2vw;
    color: rgb(57, 18, 7);
    background-color: transparent;

}

th,
td {
    padding-left: 100px;
    padding-bottom: 40px;
    text-align: center;
    background-color: transparent;
}

th {
    font-family: 'Archivo Black', sans-serif;
    font-size: 1.25rem;
    background-color: transparent;
}

td {
    text-align: center;
    font-family: 'Alata', sans-serif;
    color: rgb(56, 56, 56);
    font-weight: 700;
    font-size: 2vh;
    background-color: transparent;
}

.container {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: transparent;
}

@media screen and (max-width: 1200px) {
    .img-decorative {
        margin-top: 0;
    }

    #foto-home {
        top: -12vh;
    }

    table {
        padding-top: 10vh;
        margin-left: 0;
    }


}

@media screen and (max-width: 560px) {
    td {
        font-size: 0.9rem;
    }

    th {
        font-size: 0.9rem;
    }

    table {
        margin-left: -14vw;
    }

}</style>