<template>
<HomeHeader/>
<WindowPortal>
    <template v-slot:header>
        <div class="header">Sample View for Testing - Kirk Allgeyer</div>
    </template>
    <SlideContainer v-model:activeSlideId="this.$store.getters.getIndexSlideSelected">
        <Slide slideId="0" name="General Slide">
            <h2 class="panelTitle">General Slide</h2>
                <div class="wrapper">
                    <div class="text">
                        <p class="panelText">
                            This is some Sample Text for this slide <br>
                            With a break between text
                        </p>
                    </div>
                    <div class="image">
                        <img src="../../../public/img/GFEBS.jpeg" />
                    </div>
                </div>
        </Slide>
        <Slide slideId="1" name="Term Slide">
            <h2 class="panelTitle">Term Slide</h2>
                <div class="wrapper">
                    <div class="text">
                        <p class="panelText">
                            These are some sample Terms <br>
                            <span class="bold">Click</span> each term below to read its definition
                            <div class="baseTerm">
                                <BaseTermButton :id="1" name="Sample"/>
                                <BaseTermButton :id="2" name="Another Sample"/>
                            </div>
                            <div class="termContain">
                                <SlideContainer v-model:activeSlideId="this.$store.getters.getActiveTermId">
                                    <Slide slideId="1">
                                        <div class="slotContain">
                                            <span class="baseTermTitle">Sample</span>
                                            <br>
                                            <p>
                                                This is a sample definition.
                                            </p>
                                        </div>
                                    </Slide>
                                    <Slide slideId="2">
                                        <div class="slotContain">
                                            <span class="baseTermTitle">Another Sample</span>
                                            <br>
                                            <p>
                                                This is a another sample definition.
                                            </p>
                                        </div>
                                    </Slide>
                                </SlideContainer>
                            </div>
                        </p>
                    </div>
                </div>
        </Slide>
        <Slide slideId="2" name="Question Slide">
            <h2 class="panelTitle">Question Slide</h2>
                <div class="wrapper">
                    <div class="text">
                        <div>
                            <p class="panelText">
                                Is this a rhetorical question?
                                <BaseQuestion :value="true" :id="'q35'" :labelName="'Yes'" :name="'q4'" />
                                <BaseQuestion :value="false" :id="'q36'" :labelName="'No'" :name="'q4'" />
                                <BaseQuestion :value="false" :id="'q37'" :labelName="'Maybe'" :name="'q4'" />
                                <BaseQuestion :value="false" :id="'q38'" :labelName="'What?'" :name="'q4'" />
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

import {Slide, SlideContainer} from "../DefaultSlide/DefaultSlide.js";
import WindowPortal from "../layouts/WindowPortal.vue";
import HomeHeader from "../layouts/HomeHeader.vue";
import BaseQuestionButton from "../UI/BaseQuestionButton.vue";
import BaseQuestion from "../UI/BaseQuestion.vue";
import BaseTermButton from "../UI/BaseTermButton.vue";
import BaseQuestionImage from "../UI/BaseQuestionImage.vue";

export default {
    
    components: {
        Slide,
        SlideContainer,
        WindowPortal,
        HomeHeader,
        BaseQuestionButton,
        BaseQuestion,
        BaseTermButton,
        BaseQuestionImage,
    },

    methods: {
        checkSlideIndex() {

            this.activeSlideId = this.$store.getters.getIndexSlideSelected;
            return this.activeSlideId.ToString();
        }
    },

    data() {
        return {

            activeSlideId: this.$store.getters.getIndexSlideSelected.ToString,
            activeTermId: this.$store.getters.getActiveTermId
        }
    }
}
</script>

<style scoped>
@import '../../assets/testView.css';
</style>
