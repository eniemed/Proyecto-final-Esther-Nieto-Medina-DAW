<template>
    <main>
        <section class="contenedor-error">
            <div class="codigo-error">
                <p class="codigo-numero">4</p>
                <div class="imagen-container">
                    <img class="rotate" src="../../assets/cafe-404.png" alt="Coffee">
                </div>
                <p class="codigo-numero">4</p>
            </div>

            <article class="cuerpo-error">
                <p>We can't find the page you are looking for :(</p>
                <button @click="homeNavigation">GO HOME
                    <img src="../../assets/flecha-404.png" alt="Arrow">
                </button>
            </article>
        </section>
    </main>
</template>

<script>
import router from "../router/router";

export default {
    methods: {
        homeNavigation() {
            router.push("/")
        }

    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Anek+Devanagari:wght@100..800&display=swap');


.contenedor-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
}

.codigo-error {
    display: flex;
    position: relative;
}

.codigo-numero {
    font-family: 'Alata', sans-serif;
    color: rgb(168, 168, 168);
    font-size: 17vw;
    background-color: transparent;
    margin: 0 6vw;
}

.codigo-error .imagen-container {
    position: relative;
    width: fit-content;
    height: auto;
}

.codigo-error .imagen-container img {
    position: absolute;
    height: 20vw;
    width: 20vw;
    background-color: transparent;
    right: -10.5vw;
    bottom: 1vw;
    -webkit-animation: 20s rotate linear infinite;
    animation: 20s rotate linear infinite;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
}

.cuerpo-error img {
    height: 1vw;
    position: absolute;
    background-color: transparent;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@-webkit-keyframes rotate {
    from {
        -webkit-transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.cuerpo-error {
    margin-top: 7vw;
    font-family: "Anek Devanagari", sans-serif;
    font-size: 4vh;
    color: rgb(128, 128, 128);
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.cuerpo-error button {
    margin-top: 2vw;
    width: 9vw;
    height: 4vh;
    color: rgb(73, 30, 18);
    border: 1.5px solid rgb(73, 30, 18);
    border-radius: 50px;
    font-family: 'Alata', sans-serif;
    font-size: 1.5vh;
    cursor: pointer;
}

.cuerpo-error img {
    margin-left: 10px;
}

@media screen and (max-width: 900px) {
    .cuerpo-error p {
        font-size: 3vh;
    }

    button img {
        display: none;
    }

    .cuerpo-error button {
        width: 100px;
    }

    .contenedor-error {
        padding-top: 10vh;
    }
}

@media screen and (max-width: 600px) {
    .cuerpo-error p {
        width: 80%;
    }
}

@media screen and (max-width: 500px) {
    .codigo-error {
        width: 200px;
    }

    .cuerpo-error p {
        margin-top: 40px;
        font-size: 2.5vh;
    }

    .contenedor-error {
        padding-top: 20vh;
    }
}
</style>
