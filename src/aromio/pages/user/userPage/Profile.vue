<template>
    <main>
        <section>
            <article class="user-info-top">
                <div class="marron">
                    <input type="file" accept="image/*" @change="onFileChange" ref="fileInput" class="input-img">
                    <img class="user-info-top-img" v-if="imageUrl" :src="imageUrl" alt="Your profile picture" @click="triggerFileInput">
                    <div class="user-info-top-details marron">
                        <p aria-label="User's full name">{{ first_name }} {{ last_name }}</p>
                        <section class="contenedor-btn-perfil">
                            <article class="contenedor-btn">
                                <button class="edit-btn">
                                    <img @click="changeDisplay" class="edit-img" src="../../../../assets/edit.svg" alt="Edit header">
                                </button>
                                <article class="contenedor-colores">
                                    <article class="contenedor-colores-fila1">
                                        <button class="marron" @click="setClass('marron')"></button>
                                        <button class="rosa" @click="setClass('rosa')"></button>
                                        <button class="amarillo" @click="setClass('amarillo')"></button>
                                    </article>

                                    <article class="contenedor-colores-fila2">
                                        <button class="rojo" @click="setClass('rojo')"></button>
                                        <button class="verde1" @click="setClass('verde1')"></button>
                                        <button class="verde2" @click="setClass('verde2')"></button>
                                    </article>

                                    <article class="contenedor-colores-fila3">
                                        <button class="azul1" @click="setClass('azul1')"></button>
                                        <button class="azul2" @click="setClass('azul2')"></button>
                                        <button class="gris" @click="setClass('gris')"></button>
                                    </article>
                                </article>
                            </article>
                            
                            <button class="user-info-top-details-button" @click="logOut" aria-label="Log out of your account">Log out</button>
                        </section>
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
                    <button class="btn-orders" @click="navigationOrdersHistory()">Orders history</button>
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
            email: "",
            display: false,
            imageUrl: '/src/assets/user-img.svg',
        }
    },

    //cuando se crea el componente, se ejecuta esta función que recoge los datos del userStore y los guarda en las variables definidas
    created() {
        this.datosUser()
    },
    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            this.imageUrl = URL.createObjectURL(file);
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        changeDisplay() {
            this.display = !this.display

            if (this.display) {
                document.querySelector('.contenedor-colores').style.display = 'flex'
            } else {
                document.querySelector('.contenedor-colores').style.display = 'none'
            }
        },

        setClass(clase) {
            const userDiv = document.querySelector('.user-info-top div');
            const userInfoTop = document.querySelector('.user-info-top-details');
            
            
            userDiv.classList.remove('marron', 'rosa', 'amarillo', 'rojo', 'verde1', 'verde2', 'azul1', 'azul2', 'gris');
            userInfoTop.classList.remove('marron', 'rosa', 'amarillo', 'rojo', 'verde1', 'verde2', 'azul1', 'azul2', 'gris');
            userDiv.classList.add(clase);
            userInfoTop.classList.add(clase);
        },

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

        navigationOrdersHistory() {
            router.push("/public/ordersHistory");
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
.input-img{
    display: none;

}
.contenedor-btn {
    background-color: transparent;
}

.marron{
    background-color: rgb(131, 73, 49);
}

.rosa{
    background-color: rgb(219 120 189);
}

.amarillo{
    background-color: rgb(253 255 121);
}

.rojo{
    background-color: rgb(255 84 84);
}

.verde1{
    background-color: rgb(98 167 113);
}

.verde2{
    background-color: rgb(170 233 149);
}

.azul1{
    background-color: rgb(103 116 177);
}

.azul2{
    background-color: rgb(163 238 255);
}

.gris{
    background-color: rgb(161 161 161);
}

.contenedor-colores {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em;
    height: 11em;
    width: 16em;
    right: 20%;
    z-index: 1;
    border: 1px solid rgb(209, 209, 209);
}

.contenedor-colores article {
    display: flex;
    justify-content: space-between;
}

.contenedor-colores button {
    border: none;
    cursor: pointer;
    height: 3em;
    width: 3em;
    border-radius: 10%;
    flex-wrap: wrap;
    border: none;
    margin: 0 0.5em;
}


.edit-btn, .edit-img {
    background-color: transparent;
    border: none;
    cursor: pointer;
    height: 2em;
    width: 2em;
}

.contenedor-colores {
    display: none;
}

.edit-btn {
    background-color: rgb(73, 30, 18);
    border: none;
    border-radius: 10px;
    height: 3em;
    width: 3em;
    cursor: pointer;
}

.btn-orders {
    background-color: rgb(73, 30, 18);
    border: none;
    border-radius: 20px;
    height: 2em;
    width: 9em;
    color: white;
    font-family: 'Alata', sans-serif;
    font-size: 1em;
    cursor: pointer;
    margin-left: -1.3em;

}

.contenedor-btn-perfil {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
    height: 100%;
    padding: 1em 0;
}

a {
    background-color: rgb(73, 30, 18);
    border: none;
    border-radius: 20px;
    height: 1.7vw;
    width: 9em;
    color: white;
    font-family: 'Alata', sans-serif;
    font-size: 1em;
    cursor: pointer;
}

.user-info-top-img {
    height: 10vw;
    width: 10vw;
    background-color: transparent;
    margin-left: 1vw;
    border-radius: 75%;
    object-fit: cover;
    object-position: center;
}

.user-info-top div {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    background-color: transparent;
    font-size: 1.25rem;
}

.user-info-top-details p,
.user-info-top-details-button {
    margin-left: 25px;
}

.user-info-top-details-button {
    margin-right: 1.2vw;
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
    .user-info-top-details-button {
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
