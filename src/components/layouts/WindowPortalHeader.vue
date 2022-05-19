<template>
  <div class="aboveContain">
    <div class="portalImg">
      <img src="../../../img/shield-01.png" alt="shield.png" />
    </div>
    <div >
      <span class="text">Main Assessment Title</span>
      <br />
      <span class="note">Main Assessment Note</span>
    </div>
    <div> </div>
  </div>
</template>
<script>
  export default {};
</script>
<style scoped>
  .aboveContain {
    margin-bottom: 1%;
    
    display: flex;
    width: 542px;
    margin: 1%;
  }
   .portalImg {
    display: flex;
    height: 70px;
    margin-right: 1%;
  }
  .text{
      font-weight: bold;
  }
   .note {
    font-weight: bold;
    color: rgb(244 214 96);
  }

</style>
