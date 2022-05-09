import Vue from 'vue'
import Vuex from 'vuex'




Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Sociallinks: [{
                icon: 'mdi-linkedin',
                src: 'https://www.linkedin.com/in/abdulkadir-aksu-be/'
            },
            {
                icon: 'mdi-github',
                src: 'https://github.com/AbdulkadirAksu28'
            },
            {
                icon: 'mdi-instagram',
                src: 'https://www.instagram.com/akadiraksu/'
            },
            {
                icon: 'mdi-twitter',
                src: 'https://twitter.com/karadenizzli28'
            }
        ],
        select: [],
    },
    mutations: {
        getselectdata(state, payload) {
            state.select = payload
        }
    }

})