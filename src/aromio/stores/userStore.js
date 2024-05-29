import { defineStore } from "pinia";


//guarda en las variables todos los datos del usuario e implementa su persistencia en el localStorage gracias al plugin de persistencia de pinia
export const userStore = defineStore('userState', {
    state: () => ({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        loggedIn: false,
        discounts: "",
        cart: []
    }),

    actions: {
        setFirstName(value) {
            this.first_name = value
        },
        setLastName(value) {
            this.last_name = value
        },
        setUsername(value) {
            this.username = value
        },
        setEmail(value) {
            this.email = value
        },
        setPassword(value) {
            this.password = value
        },
        setLogin(value) {
            this.loggedIn = value
        },
        setDiscount(value) {
            this.discount = value
        },
        setCart(value) {
            this.cart = value
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: "auth",
                storage: localStorage,
            }
        ]
    }
})