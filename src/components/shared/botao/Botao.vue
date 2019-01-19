<template>
  <button :type="tipo" class="botao botao-perigo" @click="executaAcao()">{{ nome }}</button>
</template>
<script>
  export default {
    props: ['tipo', 'nome'],
    methods: {
      executaAcao() {
        if (confirm('Confirmar exclusão ?')) {
          // emite uma chamada para cima (para o component pai que usa este component)
          // chamando o evento acaoPai
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
