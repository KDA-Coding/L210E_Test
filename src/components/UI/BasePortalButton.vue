<template>
  <button><slot></slot></button>
</template>
<script>
  export default {};
</script>
<style scoped>
  button {
    background-color: rgb(24 150 199);
    border-color: rgb(255 255 255);
    color: rgb(255 255 255);
    border: 1px solid;
    margin: 20% 5% -4% 10%;
    padding: 5%;
    font-weight: bold;
  }
  button:active{
       background-color: rgb(19, 124, 165);
  }
</style>
