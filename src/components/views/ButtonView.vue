<template>
  <div class="buttonGroup">
    <BaseButton v-for="btn in homeButtons" :key="btn"  :route="btn.link" :title="btn.title"> </BaseButton>
  </div>
</template>
<script>
  import BaseButton from "../UI/BaseButton.vue";

  export default {
    data() {
      return {
        homeButtons: this.$store.state.homeButtonGroup.buttons,
      };
    },
    components: { BaseButton },

    
    methods: {
        
    },
    computed: {
     
    },
  };
</script>
<style>
  .buttonGroup {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 5%;
    align-items: baseline;
  }
</style>
