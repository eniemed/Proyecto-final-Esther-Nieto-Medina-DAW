<template>
    <footer>
        <hr>
        <section>
            <article class="contenedor-logo">
                <img src="../../assets/logo.png" alt="Aromio logo">
            </article>
            <article class="enlaces">
                <ul id="links">
                    <li><router-link :to="{ name: 'public-home' }">HOME</router-link></li>
                    <li><router-link :to="{ name: 'public-contact' }">CONTACT</router-link></li>
                    <li><router-link :to="{ name: 'public-FAQ' }">FAQ</router-link></li>
                </ul>
            </article>
            <article class="redes">
                <a href="https://www.instagram.com/aromio_coffee/" target="blank">
                    <img src="../../assets/instagram.svg" alt="Instagram">
                </a>
                <a href="https://www.facebook.com/aromio.coffee" target="blank">
                    <img src="../../assets/facebook-square.svg" alt="Facebook">
                </a>
                <a href="https://twitter.com/aromio_coffee" target="blank">
                    <img src="../../assets/twitter.svg" alt="Twitter">
                </a>
                <a href="https://pinterest.com/aromio_coffee" target="blank">
                    <img src="../../assets/pinterest-square.svg" alt="Pinterest">
                </a>
            </article>
            <article class="derechos"><p>© 2024 Aromio. All rights reserved.</p></article>
        </section>
    </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
    article {
        padding: 1.3em 0;
    }

    .redes {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }

    .redes a, .redes a img {
        height: 2.5em;
        padding: 0;
        margin: 0;
        gap: 2em;;
    }

    .derechos {
        font-family: 'Alata', sans-serif;
        font-size: 1em;
        font-style: italic;
        color: gray;
        padding-bottom: 3em;
        text-align: center;
    }

    .enlaces, #links {
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        gap: 2em;
        font-family: 'Alata', sans-serif;
        font-size: 1.1em;
    }

    a {
        text-decoration: none;
        color: #412323;
    }

    img {
        margin-top: 1.5em;
        height: 5em;
    }

    footer {
        padding-top: 5em;
        background-color: transparent;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    img, .contenedor-logo, .enlaces, .redes, .derechos p {
        background-color: transparent;
        
    }

    hr {
        border: none;
        border-top: 2px solid #412323; 
        width: 90%;
    }
</style>