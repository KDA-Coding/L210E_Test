<template>
  <div class="termContain">
    <span @click="displayShown">
      {{ name }}
    </span>
  </div>
</template>
<script>import store from "../../store";

  export default {
    props: ["name", "id"],
    data() {
      return {
        isShown: false,
      };
    },
    methods: {
      displayShown() {
        this.isShown = !this.isShown;
        console.log(this.id);
        store.dispatch("setActiveTermId", this.id);
        
      },

    },
  };
</script>
<style scoped>
  .termContain {
    display: flex;
    flex-direction: row-reverse;
    margin-right: 3%;
    margin-bottom: 1%;
    align-items: center;
    justify-content: space-between;
  }
  span {
    padding: 1%;
    background-color: rgb(120 165 174);
    color: rgb(255 255 255);
    width: 40%;
    justify-content: center;
    display: flex;
  }
  span:hover {
    background-color: rgb(14 52 61);
  }
  p {
    color: rgb(0 0 0);
  }
  .slotContain {
    
    display: flex;
    flex-direction: column;
   
    padding: 1%;
    width: 54%;
    position: absolute;
    margin-top: -10%;
    margin-left: 2%;
    background-color: rgb(14	52	61	);
  }
</style>
