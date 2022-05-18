<template>
  <div class="homeHeader">
    <HomeHeader :showExit="true" />
  </div>
  <div>
    <div class="homeTitle">
      <h1></h1>
      <h2></h2>
    </div>
    <div class="homeImage">
      <img src="../../../img/shield-01.png" alt="shield.png" />
    </div>
    <div class="homeParagraph">
      <span>
        After completing this course, review all the modules and test for the <br />
        GFEBS Financials Process Overview Post Assessment.
      </span>
      <span class="homeNote">
        Note: This will launch module content and take you to an external .Mil website.
      </span>
    </div>
    <div class="homeButtons">
      <ButtonView />
    </div>
  </div>
</template>
<script>
  import HomeHeader from "../layouts/HomeHeader.vue";
  import ButtonView from "./ButtonView.vue";
  export default {
    components: { HomeHeader, ButtonView },
  };
</script>
<style scoped>
  .homeHeader {
    height: 50px;
  }
  .homeTitle {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  h2 {
    font-weight: bold;
    margin: 1%;
  }
  h1 {
    font-weight: bold;
    margin-bottom: 0%;
    margin: 2% 2% 0% 2%;
  }
  .homeImage {
    display: flex;
    justify-content: center;
    height: 180px;
  }
  .homeParagraph {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 1% 10%;
    align-items: center;
  }
  .homeNote {
    color: rgb(247 222 154);
    font-weight: bold;
  }
  span {
    text-align: center;
  }
</style>
