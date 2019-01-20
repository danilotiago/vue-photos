import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
// foi usado { } pois devemos explicitar o que importar do modulo pois routes nao esta
// como exports default
import { routes } from './routes'
// chamada global de uma diretiva
//import './directives/Rotate'

Vue.use(VueResource)
Vue.use(VueRouter)

// configuramos o roteador que recebe um objeto de rotas
const router = new VueRouter({ routes })

// caso o servidor esteja preparado para trabalhar sem rota hash "/#/" habilitamos a constante
// abaixo com mode history
// const router = new VueRouter({ routes, mode: 'history' })


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
