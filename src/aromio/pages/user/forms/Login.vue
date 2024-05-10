<template>
    <main>
        <section>
            <article class="info">
                <h1>Welcome back!</h1>
                <p>
                    Don't fall behind, log in to continue enjoying our diverse selection
                    of artisanal coffees or sign up to start your journey!
                </p>
                <button class="btn-signup" @click="navigationSignUp">SIGN UP</button>
            </article>
            <img id="foto-home" src="../../../../assets/home-photo.png" alt="Home Photo">
        </section>
        <section>
            <article class="formulario">
                <p>Log in</p>
                <form @submit.prevent="sendForm">
                    <input v-model="username" @blur="usernameValidation" type="text" name="username" placeholder="Username"
                        aria-label="Username">
                    <input v-model="password" @blur="passwordValidation" type="password" name="password"
                        placeholder="Password" aria-label="Password">
                    <span class="error" role="alert">{{ error }}</span>
                    <button type="submit" class="btn-login">LOG IN</button>
                </form>
            </article>
        </section>
    </main>
</template>

<script>
import router from '@/aromio/router/router';
import { userStore } from '@/aromio/stores/userStore';

export default {
    data() {
        return {
            username: "",
            password: "",
            error: "",
        }
    },
    methods: {
        navigationSignUp() {
            router.push("/public/signup")
        },

        //validación del username
        usernameValidation() {
            if (this.username.trim() === "") {
                this.error = "Please make sure you fill in all fields"
                return false
            } else {
                this.error = ""
                return true
            }
        },

        //validación de la contraseña (mayor o igual a 5 caracteres)
        passwordValidation() {
            if (this.password.trim() === "" || this.password.length < 5) {
                this.error = "Please provide a password that is 5 characters or longer"
                return false
            }
            this.error = ""
            return true
        },

        //comprueba que los datos pasan las validaciones y luego con una llamada a la api comprueba si el usuario ya existe en la bd y sus 
        //datos son correctos
        async sendForm() {
            if (this.usernameValidation() && this.passwordValidation()) {
                try {

                    const response = await fetch(`http://localhost:8000/api/login?username=${this.username}&password=${this.password}`, {
                        method: 'GET',

                    })
                    const data = await response.json();


                    //si los datos son correctos, establece los datos en la variable global para así poder tratar con ellos en, por ejemplo, el perfil
                    //del usuario y luego manda al user a la shop
                    const user = userStore()

                    user.setFirstName(data.user.first_name)
                    user.setLastName(data.user.last_name)
                    user.setUsername(data.user.username)
                    user.setEmail(data.user.email)
                    user.setPassword(data.user.password)
                    user.setLogin(true)

                    router.push("/public/shop");

                } catch (error) {
                    this.error = "Invalid credentials";
                }
            }
        }
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

template {
    display: flex;
}

main {
    display: flex;
    width: 100%;
}

.formulario,
.info {
    width: 60%;
    display: flex;
    height: 94.6vh;
    justify-content: center;
}

.formulario {
    margin-top: 10vw;
    height: 25vw;
    margin-left: -22vh;
}

.btn-login {
    margin-top: 8vh;
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
}

.info {
    background-color: rgb(73, 30, 18);
}

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 43vh;
}

input {
    border: none;
    border-bottom: 0.16vw solid rgb(186, 186, 186);
    outline: none;
    margin-top: 1vw;
    margin-bottom: 1vw;
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
.btn-signup {
    background-color: rgb(73, 30, 18);

}

.info {
    display: flex;
    flex-direction: column;
}

.btn-signup {
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
    margin-top: 6vw;
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

#foto-home {
    position: absolute;
    bottom: 0;
    margin-left: 41.5vw;
    width: auto;
    height: 45vh;
    background-color: transparent;
    filter: drop-shadow(-24px 26px 30px rgba(0, 0, 0, 0.7));
}

@media screen and (max-width: 800px) {
    main {
        flex-direction: column-reverse;
        align-items: center;
    }

    main>section {
        height: 50vh;

    }

    .info,
    #foto-home {
        z-index: 1;
    }

    #foto-home {
        height: 35vw;
        margin-left: 65vw;
        margin-bottom: 25vh;
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
        margin-bottom: 12vh;
        margin-top: 0;
        justify-content: start;
    }

    .btn-signup {
        height: 50px;
        padding-bottom: 15vh;
        border: none;
        font-size: 1.5vh;
        width: 11vh;
        margin-top: 0;
        margin-bottom: 0;

    }

    .btn-login {
        padding-bottom: 16vh;
        background-color: rgb(243, 239, 238);
        color: rgb(73, 30, 18);

    }

    .formulario p {
        display: none;
    }

    .formulario input {
        margin-top: 4vh;
        height: 10vh;
        width: 30vh;
    }

    .formulario {
        margin-left: 10vh;
        padding-top: 23vh;

    }

}</style>