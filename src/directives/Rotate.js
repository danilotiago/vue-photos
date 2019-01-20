export default {
  bind(el, binding, vnode) {

    // binding.arg == 'nome_argumento' => para verificar um argumento

    let current = 0
    el.addEventListener('dblclick', function () {
      current+= binding.value || 90

      el.style.transform = `rotate(${current}deg)`
      // verificamos se foi passado o modificador animate para aplicar a animacao
      // podemos pegar diversos modificadores com binding.modifiers.xxx ...
      if (binding.modifiers.animate) el.style.transition = 'transform 0.5s'
    })
  }
}

// a forma abaixo pode ser importada globalmente no main.js =>
// import './directives/Rotate'
/*import Vue from 'vue'

Vue.directive('meu-rotate', {
  bind(el, binding, vnode) {

    // binding.arg == 'nome_argumento' => para verificar um argumento

    let current = 0
    el.addEventListener('dblclick', function () {
      current+= binding.value || 90

      el.style.transform = `rotate(${current}deg)`
      // verificamos se foi passado o modificador animate para aplicar a animacao
      // podemos pegar diversos modificadores com binding.modifiers.xxx ...
      if (binding.modifiers.animate) el.style.transition = 'transform 0.5s'
    })
  }
})*/
