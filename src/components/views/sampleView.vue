<template>
<Home-Header/>
<Window-Portal>
    <template v-slot:header>
        <div class="header">This is the Sample View - Kirk Allgeyer</div>
    </template>
    <Slide-Container v-model:activeSlideId="this.$store.getters.getIndexSlideSelected">
        <Slide slideId="0" name="Slide 1">
            <h2 class="panelTitle">Slide 1</h2>
                <div class="wrapper">
                    <div class="text">
                        <p class="panelText">

                        </p>
                    </div>
                    <div class="image">
                        <img src="../../../../../img/GFEBS.jpeg" />
                    </div>
                </div>
        </Slide>

    </Slide-Container>
</Window-Portal>
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

            activeSlideId: this.$store.getters.getIndexSlideSelected.ToString(),
            activeTermId: this.$store.getters.getActiveTermId
        }
    }
}
</script>

<style scoped>
@import '../../assets/testView.css';
</style>
