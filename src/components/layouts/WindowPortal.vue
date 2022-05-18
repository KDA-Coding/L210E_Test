<template>
  <div class="aboveBox">
    <WindowPortalHeader/>
    <div class="buttonProgress">
      <BaseProgressBar></BaseProgressBar>
      <div class="buttonIandE">
        <BasePortalButton @click="openIndexModule">
          <div class="baseIndex">
            <i class="fa-solid fa-folder-open"></i>
            <span class="iconName"> Index </span>
          </div></BasePortalButton
        >
        <BasePortalButton @click="close_window">
          <div class="baseExit">
            <i class="fa-solid fa-x"></i>
            <span class="iconName"> Exit </span>
          </div>
        </BasePortalButton>
      </div>
    </div>
  </div>

  <div class="boxedContained">
    <div class="backB" :class="{'backBHidden' : this.$store.getters.getIndexSlideSelected == 0}">
      <BasePortalButton @click="displayPrevious" class="leftButton"
        >←</BasePortalButton>
    </div>

    <div class="boxed">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="contentBox">
        <slot></slot>
      </div>
    </div>
    <div 
      class="forwardB"
      :class="{'forwardBHidden' : this.$store.getters.getIndexSlideSelected == this.$store.getters.getTotalNumberOfSlides - 1  || this.$store.getters.getQuestionAnswered == false}"
    >
      <BasePortalButton class="rightButton" @click="displayNext"
        >→
      </BasePortalButton>
    </div>
  </div>
  <div v-if="flip && this.$store.getters.getQuestionAnswered" class="indexModule">
    <div class="backdrop"></div>
    <span class="indexHeader">Index</span>
    <div>
      <div class="titleContain">
        <ul class="indexTitles">
          <li v-for="number in titleCount" class="slideTitle" @click="setSlide(titles[0][number - 1])">
            {{ titles[0][number - 1] }}
          </li>
        </ul>
      </div>
    </div>
    <div class="indexBottom"></div>

    <div class="indexClose"><BaseEscapeButton @click="closeIndexModule" /></div>
  </div>
</template>
<script>
  import store from "../../store";
  import BasePortalButton from "../UI/BasePortalButton.vue";
  import BaseProgressBar from "../UI/BaseProgressBar.vue";
  import BaseEscapeButton from "../UI/BaseEscapeButton.vue";
import WindowPortalHeader from "./WindowPortalHeader.vue";
  export default {
    data() {
      return {
        flip: false,
        titles: Array,
        titleCount: 0,
        isHidden: false,
        isBackHidden: true,
      };
    },
    mounted() {
      store.dispatch('openCurrentIndex')
    },
    components: { BasePortalButton, BaseProgressBar, BaseEscapeButton, WindowPortalHeader },
    methods: {
      displayNext() {
        //gets next slide for display
        this.titleCount = this.$store.getters.getIndexSlideSelected;
        if (this.titleCount == this.$store.getters.getTotalNumberOfSlides - 1){
          return;
        }
        this.titleCount++;
        this.flip = false;
        store.dispatch("setIndexOfSlide", this.titleCount);
        store.dispatch("setQuestionAnswered", true)
        store.dispatch("setIsQuestionCorrect", 'unAnswered')
        store.dispatch("setActiveTermId", 0);
      },
      displayPrevious() {
        //gets previous slide for display
        this.titleCount = this.$store.getters.getIndexSlideSelected;
        this.titleCount--;
        this.flip = false;
        if (this.titleCount < 0) {
          this.titleCount = 0;
        }
        store.dispatch("setIndexOfSlide", this.titleCount);
        store.dispatch("setQuestionAnswered", true)
        store.dispatch("setIsQuestionCorrect", 'unAnswered')
        store.dispatch("setActiveTermId", 0);
      },
      setSlide(slide) {
        store.dispatch("setIndexSlideSelected", {
          slide: slide,
        });
        store.dispatch("setQuestionAnswered", true)
        store.dispatch("setIsQuestionCorrect", 'unAnswered')
        this.$store.getters.getIndexSlideSelected;
        //this flag drops the index module after clicking on an item
        this.flip = false;
      },
      close_window() {
        //for the newly opened window, added an alert to make sure its what the user wants to do
        if (confirm("Close Window?")) {
          close();
        }
      },
      // this opens the index menu
      openIndexModule() {
        store.dispatch("openCurrentIndex");
        this.$store.getters.getCurrentSelectedHomeButton;
        this.flip = this.$store.getters.getShowSlide;
        this.openIndexTitles();
      },
      //this gets the index titles from the store of current module
      openIndexTitles() {
        this.titles = this.$store.getters.getIndexTitles;
        this.titleCount = this.$store.getters.getTitleCount;
      },
      //closes index
      closeIndexModule() {
        store.dispatch("closeCurrentIndex");
        this.flip = this.$store.getters.getShowSlide;
         store.dispatch("setQuestionAnswered", true)
        store.dispatch("setIsQuestionCorrect", 'unAnswered')
      },
    },
    conmputed: {
      isIndexFirstClass() {
        if (this.$store.getters.getIndexSlideSelected > 0) this.isHidden = true;
        return {
          backBHidden: this.isHidden,
        };
      },
    
    },
  };
</script>
<style scoped>
  @import "../../assets/windowPortal.css";
</style>
