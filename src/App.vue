<template>
  <section>
    <div class="boxed">
      <router-view></router-view>
    </div>
  </section>
</template>
<script>
  import HomeView from "./components/views/HomeView.vue";
  export default { components: { HomeView } };
</script>
<style>
  @import "@/assets/base.css";
  .boxed {
    width: 800px;
    height: 650px;
    background-color: rgb(45 76 83);
    display: flex;
    /* justify-content: center; */
    border-radius: 1%;
    flex-direction: column;
  }
  section {
    display: flex;
    justify-content: center;
    margin: 1%;
  }
</style>
