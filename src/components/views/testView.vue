<template>
  <HomeHeader />
  <WindowPortal>
    <template v-slot:header><div class="header">Introduction to TestView</div></template>
    <SlideContainer v-model:activeSlideId="this.$store.getters.getIndexSlideSelected">
        <Slide slideId="0" name="First Slide">
            <h2 class="panelTitle">First Slide</h2>
            <div class="wrapper">
                <div class="text">
                    <p class="panelText">
                    This training course will introduce you to the process, coordination, and information
                    required to understand the Financials process in GFEBS.
                    </p>
                </div>
                <div class="image">
                    <img src="../../../../../img/GFEBS.jpeg" name="GFEBS" />
                </div>
            </div>
        </Slide>
        <Slide slideId="1" name="BaseTermExample">
            <h2 class="panelTitle">Perform Valuation on Foreign Currency</h2>
            <div class="wrapper">
                <div class="text">
                    <p class="panelText">
                        Here are a number key terms and concepts related to this section.
                    <br/>
                    <span class="bold">Click</span> each term to the right to learn more.
                        <div class="baseTerm">
                        <BaseTermButton :id="1" name="At the End of Each Period" />
                        
                        <BaseTermButton  :id="2" name="Performing a Valuation" />
                    </div>
                    <div class="termContain">
                        <SlideContainer v-model:activeSlideId="this.$store.getters.getActiveTermId">
                            <Slide slideId="1">
                                <div class="slotContain">
                                <span class="baseTermTitle">
                                    At the End of Each Period
                                </span>
                                    <br/>
                                <p>
                                    test
                                </p>
                                </div>
                            </Slide>
                            <Slide slideId="2">
                            <div class="slotContain">
                                <span class="baseTermTitle">
                                    Performing a Valuation
                                </span>
                                    <br/>
                                <p>
                                    test
                                </p>
                                </div>
                            </Slide>   
                        </SlideContainer>
                    </div>
                    </p>
                </div>
            </div>
        </Slide>
        <Slide slideId="2" name="BaseQuestionExample">
            <h2 class="panelTitle">Question 3</h2>
            <div class="wrapper">
                <div class="text">
                <div>
                    <p class="panelText">
                    GFEBS enables efficient and accurate financial management of the Army by:
                        <BaseQuestion :value="false" :id="'q31'" :labelName="'Centralizing Master Data'" :name="'q3'" />
                        <BaseQuestion :value="false" :id="'q32'" :labelName="'Standardizing Financial Management'" :name="'q3'" />
                        <BaseQuestion :value="false" :id="'q33'" :labelName="'Expediting the Period-End and Year-End Close processes'" :name="'q3'" />
                        <BaseQuestion :value="true" :id="'q34'" :labelName="'All of the above'" :name="'q3'" />
                    </p>
                </div>
                </div>
                <div class="image">
                    <BaseQuestionImage />
                </div>
            </div>
        </Slide>
    </SlideContainer>
  </WindowPortal>
</template>
<script>
  import { Slide, SlideContainer } from "../DefaultSlide/DefaultSlide";
  import WindowPortal from "../layouts/WindowPortal.vue";
  import HomeHeader from "../layouts/HomeHeader.vue"
  import BaseQuestionButton from "../UI/BaseQuestionButton.vue";
  import BaseQuestion from "../UI/BaseQuestion.vue"
  import BaseTermButton from "../UI/BaseTermButton.vue"
  import BaseQuestionImage from "../UI/BaseQuestionImage.vue"
  export default {
    components: { Slide, SlideContainer, WindowPortal, HomeHeader, BaseQuestionButton, BaseQuestion, BaseTermButton, BaseQuestionImage },
    methods: {
    checkSlideIndex(){
        this.activeSlideId = this.$store.getters.getIndexSlideSelected;
        return this.activeSlideId.toString();
    },
  },
    data() {
      return {
        activeSlideId: this.$store.getters.getIndexSlideSelected.toString(),
        activeTermId: this.$store.getters.getActiveTermId
      };
    },
  };
</script>

<style scoped>
 @import '../../assets/testView.css';
</style>
