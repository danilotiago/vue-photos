<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <!-- modificador lazy serve para fazer o data binding do dado apenas quando
        o usuario sair do campo -->
        <input
          id="titulo"
          autocomplete="off"
          v-model.lazy="foto.titulo"
        >
      </div>

      <!-- modificador lazy serve para fazer o data binding do dado apenas quando
      o usuario sair do campo -->
      <div class="controle">
        <label for="url">URL</label>
        <input
          id="url"
          autocomplete="off"
          v-model.lazy="foto.url"
        >
        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea
          id="descricao"
          autocomplete="off"
          v-model="foto.descricao"
        ></textarea>
      </div>

      <div class="centralizado">
        <meu-botao nome="GRAVAR" tipo="submit"/>
        <router-link to="/"><meu-botao nome="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>
<script>
  import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva'
  import Botao from '../shared/botao/Botao'
  import Foto from '../../domain/foto/Foto'

  export default {
    components: {
      'imagem-responsiva': ImagemResponsiva,
      'meu-botao': Botao
    },
    data() {
      return {
        foto: new Foto()
      }
    },
    created() {
      // usando resource por ser expecialista em API's REST
      // neste caso nao definimos parametros pois aqui so se faz post
      // deve ser definido dentro do metodo created para uso do this.
      this.resource = this.$resource('v1/fotos')
    },
    methods: {
      grava() {
        // usando resource save => post
        this.resource
          .save(this.foto)
          .then(
            () => this.foto = new Foto(),
            err => console.log(err)
          )

        // chamada tradicional
        /*this.$http
          .post('v1/fotos', this.foto)
          .then(
            () => this.foto = new Foto(),
            err => console.log(err)
          )*/
      }
    }
  }
</script>
<style scoped>
  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

  .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }
</style>
