<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre pelo título da foto">
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto in fotosComFiltro">

        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo"></imagem-responsiva>

          <!-- como um component nao possui eventos, usamos o click.native pois o Vue
          acessara o elemento que esta dentro do component (no caso, o elemento Button)
          e chamara o evento de clique nativo do elemento button, com isso podemos executar
          a funcao remove. Caso estivessemos com o elemento nativo direto neste component
           nao precisariamos usar essa adaptacao, apenas chamariamos o @click-->
          <meu-botao tipo="button" nome="Remover" @click.native="remove(foto)"></meu-botao>

        </meu-painel>

      </li>
    </ul>
  </div>
</template>

<script>

  import Painel from '../shared/painel/Painel.vue'
  import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
  import Botao from '../shared/botao/Botao'

  export default {
    components: {
      'meu-painel': Painel,
      'imagem-responsiva': ImagemResponsiva,
      'meu-botao': Botao
    },
    data () {
      return {
        titulo: 'Alurapic',
        fotos: [],
        filtro: ''
      }
    },
    // funcoes que precisam de reprocessamento
    computed: {

      fotosComFiltro() {
        if (this.filtro) {
          let exp = new RegExp(this.filtro.trim(), 'i') // cria a regex para o filtro
          return this.fotos.filter(foto => exp.test(foto.titulo)) // efetua o filtro para cada foto
        } else {
          return this.fotos
        }
      }
    },
    // funcoes que nao precisam de reprocessamento, apenas sao chamadas
    methods: {
      remove(foto) {
        if (confirm('Remover a foto ' + foto.titulo)) {
          alert('REMOVER')
        }
      }
    },
    created() {
      this.$http
        .get('http://localhost:3000/v1/fotos')
        .then(res => res.json())
        .then(fotos => this.fotos = fotos, err => console.log(err))
    }
  }
</script>

<style>
  .centralizado {
    text-align: center;
  }
  .lista-fotos {
    list-style: none;
  }
  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }
  .filtro {
    display: block;
    width: 100%;
  }
</style>
