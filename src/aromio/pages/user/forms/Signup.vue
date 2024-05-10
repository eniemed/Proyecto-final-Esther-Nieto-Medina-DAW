<template>
    <main aria-label="Sign-up form">
        <section>
            <article class="formulario">
                <p>Sign up</p>
                <form @submit.prevent="sendForm" aria-label="Sign-up form">
                    <label for="name">First name</label>
                    <input v-model="name" @blur="nameValidation" type="text" id="name" name="name" placeholder="First name"
                        aria-required="true">
                    <span class="error" aria-live="assertive">{{ nameError }}</span>

                    <label for="lastName">Last name</label>
                    <input v-model="lastName" @blur="lastNameValidation" type="text" id="lastName" name="lastName"
                        placeholder="Last name" aria-required="true">
                    <span class="error" aria-live="assertive">{{ lastNameError }}</span>

                    <label for="username">Username</label>
                    <input v-model="username" @blur="usernameValidation" type="text" id="username" name="username"
                        placeholder="Username" aria-required="true">
                    <span class="error" aria-live="assertive">{{ usernameError }}</span>

                    <label for="email">Email</label>
                    <input v-model="email" @blur="emailValidation" type="email" id="email" name="email" placeholder="Email"
                        aria-required="true">
                    <span class="error" aria-live="assertive">{{ emailError }}</span>

                    <label for="password">Password</label>
                    <input v-model="password" @blur="passwordValidation" type="password" id="password" name="password"
                        placeholder="Password" aria-required="true">
                    <span class="error" aria-live="assertive">{{ passwordError }}</span>

                    <span class="error" aria-live="assertive">{{ errorServidor }}</span>

                    <button type="submit" class="btn-signup" aria-label="Sign up for an account">SIGN UP</button>
                </form>
            </article>
        </section>
        <section>
            <article class="info">
                <h1>Welcome!</h1>
                <p>Are you ready to join and explore the world of coffee with us?</p>
                <p>Have you signed up already?</p>
                <button class="btn-login" @click="navigationLogIn" aria-label="Log in to your account">LOG IN</button>
            </article>
        </section>
    </main>
</template>

<script>

import router from '@/aromio/router/router';
import { userStore } from '@/aromio/stores/userStore'

export default {
    props: ['loggedIn'],
    data() {
        return {
            name: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            cart: [],
            nameError: "",
            lastNameError: "",
            usernameError: "",
            emailError: "",
            passwordError: "",
            emailRegex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            errorServidor: ""
        }
    },
    methods: {

        //MÉTODOS CON VALIDACIONES PARA TODOS LOS CAMPOS: nombre, apellido, username, email y contraseña
        nameValidation() {
            if (this.name.trim() === "") {
                this.nameError = "Please write your first name"
                return false
            }
            this.nameError = ""
            return true
        },
        lastNameValidation() {
            if (this.lastName.trim() === "") {
                this.lastNameError = "Please write your last name"
                return false
            }
            this.lastNameError = ""
            return true
        },
        usernameValidation() {
            if (this.username.trim() === "") {
                this.usernameError = "Please choose your username"
                return false
            }
            this.usernameError = ""
            return true
        },
        emailValidation() {
            if (this.email.trim() === "" || !this.emailRegex.test(this.email)) {
                this.emailError = "Please enter a valid email address"
                return false
            }
            this.emailError = ""
            return true
        },
        passwordValidation() {
            if (this.password.trim() === "" || this.password.length < 5) {
                this.passwordError = "Please provide a password that is 5 characters or longer"
                return false
            }
            this.passwordError = ""
            return true
        },

        //si las validaciones son correctas, primero comprueba que el usuario no está ya registrado en la bd
        //si no lo está, crea un nuevo usuario y lo introduce en la base de datos en la tabla users
        sendForm() {
            if (this.nameValidation() && this.lastNameValidation() && this.usernameValidation() && this.emailValidation() && this.passwordValidation()) {
                const user = userStore()

                const newUser = {
                    first_name: this.name,
                    last_name: this.lastName,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                }

                fetch('http://localhost:8000/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                })
                    .then(response => {
                        if (!response.ok) {

                            throw new Error('Your username or email already exist')
                        }
                        return response.json()
                    })
                    //y establece todos sus datos en la variable global
                    .then(data => {
                        user.setFirstName(this.name)
                        user.setLastName(this.lastName)
                        user.setUsername(this.username)
                        user.setEmail(this.email)
                        user.setPassword(this.password)
                        user.setLogin(true)

                        this.$router.push('/public/shop')
                    })
                    .catch((error) => {
                        this.errorServidor = "Your username or email already exist"
                    })
            }
        },
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: rgb(243, 239, 238);
}

main {
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
}

label {
    color: transparent;
    user-select: none;
}

section {
    width: 50%;
}

.formulario,
.info {
    display: flex;
    height: 94.6vh;
    justify-content: center;
}

.formulario {
    align-items: center;
}

.btn-signup {
    margin-top: 2vh;
    font-family: 'Alata', sans-serif;
    background-color: rgb(73, 30, 18);
    color: white;
    font-size: medium;
    border-radius: 30vh;
    height: 5vh;
    width: 22vh;
    border: none;
    cursor: pointer;
    letter-spacing: 0.13cm;
}

.formulario p {
    position: absolute;
    font-family: 'Alata', sans-serif;
    font-size: 1.3vw;
    color: rgb(73, 30, 18);
    margin-bottom: 65vh;

}

.info {
    background-color: rgb(73, 30, 18);
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 43vh;
}

input {
    border: none;
    border-bottom: 0.16vw solid rgb(186, 186, 186);
    outline: none;
    width: 20vw;
    height: 2vw;
}

input::placeholder {
    font-family: 'Alata', sans-serif;
    color: rgb(186, 186, 186);
    font-size: large;
}

.error {
    padding: 1vw;
    margin: 0 auto;
    color: rgb(223, 67, 67);
    font-family: 'Alata', sans-serif;
}

.info h1,
.info p,
.info button {
    background-color: rgb(73, 30, 18);

}

.info {
    display: flex;
    flex-direction: column;
}

.btn-login {
    border: 1px solid rgb(255, 255, 255);
    color: white;
    font-family: 'Alata', sans-serif;
    height: 3vw;
    width: 10vw;
    justify-content: center;
    font-size: 1vw;
    border-radius: 50px;
    letter-spacing: 5px;
    cursor: pointer;
    margin-left: 2vw;
    margin-top: 2vw;
}

.info p,
.info h1 {
    color: white;
}

.info p {
    font-family: 'Alata', sans-serif;
    margin-left: 2vw;
    font-size: 1.5vw;
    width: 60%;
}

.info h1 {
    font-family: 'Archivo Black', sans-serif;
    font-size: 4vw;
    margin-left: 2vw;
}

.info p:nth-child(3) {
    font-style: italic;
    margin-top: 6vw;
    font-size: 1.2vw;
}

@media screen and (max-width: 800px) {

    section:nth-child(2) {
        width: 100%;
    }

    main {
        flex-direction: column;
    }

    .info h1 {
        padding-top: 7vh;
    }

    .info p {
        font-size: 3vw;
        padding-bottom: 0px;
    }

    .info {
        width: 100%;
        align-self: flex-end;
        justify-content: start;
        height: 54.5vh;
    }

    .btn-login {
        height: 50px;
        padding-bottom: 15vh;
        border: none;
        font-size: 1.5vh;
        width: 11vh;

    }

    .btn-signup {
        background-color: rgb(243, 239, 238);
        color: rgb(73, 30, 18);

    }

    .formulario p {
        display: none;
    }

    .formulario input {
        width: 30vh;
        height: 6vh;
    }

    .formulario {
        height: 45vh;
        margin-bottom: 7vh;
        margin-top: 5vh;
        margin-left: 20vh;

    }

    .info p:nth-child(3) {
        font-size: 2vh;
    }

}
</style>