<template>
  <div>
    <slot name="title"></slot>
    <span v-if="showExit" @click="close_window"><i class="fa-solid fa-x fa-xl"></i></span>
  </div>
</template>
<script>
  export default {
    props:{
      showExit : Boolean
  },
    methods: {
      close_window() {
        if (confirm("Close Window?")) {
          close();
        }
      },
    },
  };
</script>
<style scoped>
  div {
    background-color: rgb(30 163 222);
    height: 30px;
    width: 800px;
    display: flex; 
    align-items: center;
    justify-content: flex-end;
    padding: 2%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  i {
    color: white;
  }
</style>
