<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
    <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre pelo título da foto">
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto in fotosComFiltro">

        <!--adicionamos o modificador animate na diretiva para caso quisermos
        o efeito animado, se nao quisermos eh so tirar o '.animate'
        podemos ir adicionando modificadores aninhados com .xxx .yyy ... um apos o outro.
        v-meu-transform:rotate => o :rotate eh um argumento que pode ser passado
        argumentos => ditam a logica
        modificadores => ativam ou nao uma logica-->
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva
            :url="foto.url"
            :titulo="foto.titulo"
            v-meu-rotate.animate="25"
          ></imagem-responsiva>

          <!--foi criado um evento customizado que o elemento meu-botao chama pelo $emit,
          este evento chama a funcao remove(foto)-->
          <!--foi usado :confirmacao para o vue interpretar o valor false/true e enviar boolean para
          o component, e nao a string false/true-->
          <meu-botao
            tipo="button"
            nome="Remover"
            :confirmacao="true"
            estilo="perigo"
            @acaoPai="remove(foto)"
            ></meu-botao>

        </meu-painel>

      </li>
    </ul>
  </div>
</template>

<script>

  import Painel from '../shared/painel/Painel.vue'
  import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
  import Botao from '../shared/botao/Botao'
  import rotate from '../../directives/Rotate'

  export default {
    components: {
      'meu-painel': Painel,
      'imagem-responsiva': ImagemResponsiva,
      'meu-botao': Botao
    },
    directives: {
      'meu-rotate': rotate
    },
    data () {
      return {
        titulo: 'Alurapic',
        fotos: [],
        filtro: '',
        mensagem: ''
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
        this.$http
          .delete(`http://localhost:3000/v1/fotos/${foto._id}`)
          .then(
            () => {

              // remove a foto do array atual
              let indice = this.fotos.indexOf(foto)
              this.fotos.splice(indice, 1)
              this.mensagem = 'Foto removida'

            }, err => {
              console.log(err)
              this.mensagem = 'Não foi possível remover a foto'
            }
          )
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
