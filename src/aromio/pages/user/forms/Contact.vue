<template>
  <main aria-label="Contact us">
    <article v-if="enviado" class="comprado-fondo">
      <div class="contenedor-comprado-mensaje">
        <h2>Message sent!</h2>
        <p>We will contact you as soon as we can, thank you for your patience!</p>
        <button @click="navigateShop">Accept</button>
      </div>
    </article>
    <section>

      <article>
        <h1 id="contact-title">Contact us</h1>
        <p id="contact-text">Feel free to contact us anytime. We will get back to you as soon as we can!</p>
        <form @submit.prevent="sendForm" aria-label="Contact form" id="form">
          <label for="email">Email</label>
          <input id="email_id" v-model="email" type="email" name="email_id" @blur="emailValidation" placeholder="Email"
            aria-required="true" aria-describedby="email-error">
          <span class="error" id="email-error" aria-live="assertive">{{ emailError }}</span>

          <label for="message">Message</label>
          <textarea id="message" v-model="text" name="text" @blur="textValidation" placeholder="Message"
            aria-required="true" aria-describedby="text-error"></textarea>
          <span class="error" id="text-error" aria-live="assertive">{{ textError }}</span>

          <button type="submit" id="button">SEND</button>
        </form>
      </article>
    </section>

    <section>
      <article>
        <div class="contenedor-info">
          <h1 class="info-titulo">Info</h1>
          <ul id="info-icons" aria-labelledby="info-icons">
            <li><img src="../../../../assets/mensaje.png" alt="Email info"></li>
            <li><img src="../../../../assets/telf.png" alt="Phone info"></li>
            <li><img src="../../../../assets/edificio.png" alt="Location info"></li>
            <li><img src="../../../../assets/reloj.png" alt="Schedule info"></li>
          </ul>
          <ul id="info-data" aria-labelledby="info-data">
            <li>info@aromio.com</li>
            <li>+34 956 88 77 66</li>
            <li>18 Coffee Lover St.</li>
            <li>9:00 - 16:00</li>
          </ul>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
import router from "../../../router/router";
import emailjs from '@emailjs/browser';

export default {
  data() {
    return {
      email: "",
      text: "",
      emailRegex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      emailError: "",
      textError: "",
      enviado: false
    }
  },

  //uso emailjs (servicio serverless) para que el formulario sea funcional y mande correos reales
  created() {

    emailjs.init('oJfqu34e9fDWsNVvu')
  },
  methods: {
    sendEmail() {
      emailjs.send('service_sxtxwv6', 'template_8yqj1ww', {
        message: this.text,
        email_id: this.email
      })
        .then(response => {
          console.log('SUCCESS!', response.status, response.text);
        }, error => {
          console.error('FAILED...', error);
        });
      this.enviado = true
    },
    //método que valida el email con una expresión regular, además de asegurarse de que el campo no está vacío
    emailValidation() {
      if (this.email.trim() === "" || !this.emailRegex.test(this.email)) {
        this.emailError = "Invalid email address"
        return false
      } else {
        this.emailError = ""
        return true
      }
    },

    //validación del mensaje 
    textValidation() {
      if (this.text.trim() === "") {
        this.textError = "Please write a message"
        return false
      } else {
        this.textError = ""
        return true
      }
    },
    navigateShop() {
      this.$router.push('/public/shop');
    },

    //si las validaciones son correctas, manda a la shop al usuario
    sendForm() {
      if (this.emailValidation() && this.textValidation()) {
        this.sendEmail()
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

.comprado-fondo {
  position: absolute;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.46);
}

.contenedor-comprado-mensaje {
  position: absolute;
  top: 30%;
  left: 35%;
  height: 20em;
  width: 35em;
  border-radius: 20px;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.contenedor-comprado-mensaje h2,
p {
  background-color: transparent;
  text-align: center;

}

.contenedor-comprado-mensaje h2 {
  font-family: 'Archivo Black', sans-serif;
  color: rgb(68, 49, 27);
  font-size: 2em;
}

.contenedor-comprado-mensaje p {
  font-family: 'Alata', sans-serif;
  font-size: 1.2em;
  padding-top: 1em
}

.contenedor-comprado-mensaje button {
  height: 3em;
  width: 8em;
  margin-top: 2em;
  background-color: rgb(53, 35, 16);
  color: white;
  border: none;
  font-family: 'Alata', sans-serif;
  border-radius: 30px;
  font-size: 1.2em;
  justify-self: center;
  cursor: pointer;
}


label {
  color: transparent;
  user-select: none;
}

section:nth-child(2) {
  padding-left: 12vh;
}

.beans {
  background-color: transparent;
  position: absolute;
  bottom: 0;
  margin-bottom: -10vh;
}

ul {
  background-color: rgb(73, 30, 18);
}

li img {
  background-color: rgb(73, 30, 18);
}

#info-icons li {
  display: flex;
  list-style: none;
  background-color: rgb(73, 30, 18);
  margin-top: 2vw;
  margin-left: -9vw;
}

#info-icons img {
  background-color: rgb(73, 30, 18);
  width: 2.2vw;
}

#info-icons {
  margin-top: 13vw;
  display: flex;
  flex-direction: column;
  background-color: rgb(73, 30, 18);
  width: 2.2vw;

}

#info-data li {
  background-color: rgb(73, 30, 18);
  list-style: none;
  color: white;
  font-family: 'Alata', sans-serif;
  margin-top: 3vw;
  font-size: 1vw;
}

#info-data {
  margin-top: 12.2vw;
  display: flex;
  flex-direction: column;
  margin-left: -7vw;
  height: 55vh;
}

main {
  display: flex;
  width: 100%;
  justify-content: center;
}


.contenedor-info {
  background-color: rgb(73, 30, 18);
  width: 30vw;
  height: 90%;
  display: flex;
  align-content: center;
  margin-left: auto;

}

.info-titulo {
  background-color: rgb(73, 30, 18);
  color: white;
  font-family: 'Archivo Black', sans-serif;
  margin-top: 3.7vw;
  padding: 3vw;
  font-size: 3vw;
  height: 2vw;
}

.cuerpo {
  position: relative;
  width: 30vw;
  margin-top: 4vw;
}

article:nth-child(2) {
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: 100%;
}


form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40vh;
  margin-top: 4vw;

}

#contact-title {
  font-family: 'Archivo Black', sans-serif;
  color: rgb(96, 61, 42);
  font-size: 10vh;
}

#contact-text {
  font-family: 'Alata', sans-serif;
  font-size: large;
  color: rgb(96, 61, 42);
  width: 50vh;
}

button {
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
  letter-spacing: 0.15cm;
}

input {
  border: none;
  border-bottom: 0.16vw solid rgb(186, 186, 186);
  outline: none;
  margin-top: 1vw;
  height: 2vw;
}

textarea {
  border: none;
  border-bottom: 0.16vw solid rgb(186, 186, 186);
  outline: none;
  margin-top: 2vw;
  height: 3vw;
  resize: none;
}

input::placeholder,
textarea::placeholder {
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

@media screen and (max-width: 1200px) {
  main {
    flex-direction: column;
  }

  .contenedor-info {
    width: 110vh;
    padding-left: 0;
  }

  section:nth-child(2) {
    padding-left: 0;

  }

  section:first-child {
    padding-left: 20vh;
  }
}

@media screen and (max-width: 600px) {
  section:first-child {
    padding-left: 8vh;
  }

  #contact-title {
    font-size: 5vh;
  }

  input,
  textarea {
    height: 5vh;
  }

  .beans {
    display: none;
  }

  .info-data {
    transform: scale(1.5);
  }

}
</style>