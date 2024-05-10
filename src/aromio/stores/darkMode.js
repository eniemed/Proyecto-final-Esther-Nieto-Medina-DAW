import { defineStore } from "pinia";

export const darkMode = defineStore('darkModeState', {
    state: () => ({
        darkMode: false
    }),

    actions: {
        activateDarkMode(state) {
            this.darkMode = state
            return this.darkMode
        }
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