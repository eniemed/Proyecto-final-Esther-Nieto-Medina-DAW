<template>
    <main>
        <section>
            <article class="user-info-top">
                <div>
                    <img src="../../../../assets/user-profile.png"
                        alt="Your profile picture">
                    <div class="user-info-top-details">
                        <p aria-label="User's full name">{{ first_name }} {{ last_name }}</p>
                        <button @click="logOut" aria-label="Log out of your account">Log out</button>
                    </div>
                </div>
            </article>
            <article class="user-info-bottom">
                <section>
                    <article class="contenedor-name">
                        <p class="label-name" id="fullNameLabel">Full name</p>
                        <p class="name" aria-labelledby="fullNameLabel">{{ first_name }} {{ last_name }}</p>
                    </article>
                    <article class="contenedor-username">
                        <p class="label-username" id="usernameLabel">Username</p>
                        <p class="username" aria-labelledby="usernameLabel">{{ username }}</p>
                    </article>
                    <article class="contenedor-email">
                        <p class="label-email" id="emailLabel">Email</p>
                        <p class="email" aria-labelledby="emailLabel">{{ email }}</p>
                    </article>
                </section>
            </article>
        </section>
    </main>
</template>

<script>
import { userStore } from "@/aromio/stores/userStore";
import router from "../../../router/router"
export default {
    data() {
        return {
            first_name: "",
            last_name: "",
            username: "",
            email: ""
        }
    },

    //cuando se crea el componente, se ejecuta esta función que recoge los datos del userStore y los guarda en las variables definidas
    created() {
        this.datosUser()
    },
    methods: {

        //desconecta al usuario estableciendo loggedIn en false y todo lo demás lo vacia excepto el carrito, que simplemente no se mostrará
        //cuando loggedIn sea false
        //cuando el usuario cierra la sesión, se le manda a la página de inicio
        logOut() {
            const user = userStore()
            user.first_name = ""
            user.last_name = ""
            user.username = ""
            user.email = ""
            user.password = ""
            user.loggedIn = false
            router.push("/")
        },

        //esta es la función que recoge los datos de user que he mencionado en el created
        datosUser() {
            const user = userStore()

            this.first_name = user.first_name
            this.last_name = user.last_name
            this.username = user.username
            this.email = user.email

        }
    }
}
</script>

<style scoped>
.user-info-top img {
    height: 10vw;
    width: auto;
    background-color: rgb(131, 73, 49);
    padding-left: 1vw;
}

.user-info-top div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(131, 73, 49);
    font-family: 'Alata', sans-serif;
    color: white;
    width: 50vw;
    height: 15vw;
    margin: 0 auto;
    border-radius: 1.5vw;
}

.user-info-top-details {
    display: flex;
    flex-direction: row;
}

.user-info-top-details p {
    background-color: rgb(131, 73, 49);
    font-size: 1.25rem;
}

.user-info-top-details p,
.user-info-top-details button {
    margin-left: 25px;
}

.user-info-top-details button {
    margin-right: 1.2vw;
    margin-top: 11.3vw;
    background-color: rgb(73, 30, 18);
    border: none;
    border-radius: 20px;
    height: 1.7vw;
    width: 5vw;
    color: white;
    font-family: 'Alata', sans-serif;
    font-size: 0.8vw;
    cursor: pointer;
}

article>p {
    color: rgb(160, 127, 117);
}

.user-info-bottom {
    margin-top: 5vw;
    font-family: 'Alata', sans-serif;
    margin-left: 25vw;
    font-size: 1.1vw;
}

.name,
.username,
.email {
    background-color: rgb(255, 255, 255);
    color: rgb(141, 141, 141);
    height: 2vw;
    width: 58vh;
    margin-bottom: 40px;
    margin-left: -20px;
    margin-top: 10px;
    text-indent: 20px;
    border-radius: 10px;
    filter: drop-shadow(-4px 5px 7px rgba(0, 0, 0, 0.25));
}


@media screen and (max-width: 1000px) {
    .user-info-top-details button {
        font-size: 1.5vh;
        height: 4vh;
        width: 9vh;
        margin-bottom: 2vh;
    }

    .name,
    .username,
    .email {
        font-size: 2vh;
        width: 40vh;
        height: 4vh;
    }

    .label-name,
    .label-username,
    .label-email {
        font-size: 2vh;
    }
}</style>
