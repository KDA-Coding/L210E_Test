<template>
  
  <div class="total" ><div class="current"  :style="currentBarStyles"></div></div>
</template>
<script>
  export default {
    computed:{
      currentBarStyles(){
        //the plus 1 is an offset for the array, may be a bug
        let n = this.$store.getters.getIndexSlideSelected / this.$store.getters.getTotalNumberOfSlides 
        if(this.$store.getters.getIndexSlideSelected + 1 == this.$store.getters.getTotalNumberOfSlides)
          return {width: '100%'}
        return {width: n  * 100 + '%'}
      }
    }
  };
</script>
<style scoped>
  .current {
    background-color: yellowgreen;
    width: 10%;
    transition: width 1s ;
    height: 15px;
    margin-bottom: -15%;
    border-radius: 4px;


  }
  .total{
    background-color: rgb(146, 146, 146);
    width: 130px;
    margin-left: 10%;
    height: 15px;
    margin-bottom: -15%;
    border-radius: 4px;
  }
</style>
