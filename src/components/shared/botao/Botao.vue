<template>
  <!-- teremos uma classe default chamada botao e o vue tambem adicionara uma classe computada pelo
  metodo estiloBotao, logo, teremos duas chamadas de botao mas que serao "concatenadas" -->
  <button :type="tipo" class="botao" :class="estiloBotao" @click="executaAcao()">{{ nome }}</button>
</template>
<script>
  export default {
    props: ['tipo', 'nome', 'confirmacao', 'estilo'],
    computed: {
      estiloBotao() {
        switch (this.estilo) {
          case 'padrao' : {
            return 'botao-padrao'
          } case 'perigo' : {
            return 'botao-perigo'
          } default : {
            return 'botao-padrao'
          }
        }
      }
    },
    methods: {
      executaAcao() {

        if (this.confirmacao) {
          if (confirm('Confirmar exclusão ?')) {
            // emite uma chamada para cima (para o component pai que usa este component)
            // chamando o evento acaoPai
            this.$emit('acaoPai')
          }
        } else {
          this.$emit('acaoPai')
        }

      }
    }
  }
</script>
<style scoped>
  .botao {
    display: inline-block;
    padding: 10px;
    border-radius: 3px;
    margin: 10px;
    font-size: 1.2em;
    cursor: pointer;
  }

  .botao-perigo {
    background: firebrick;
    color: white;
  }

  .botao-padrao {
    background: darkcyan;
    color: white;
  }
</style>
