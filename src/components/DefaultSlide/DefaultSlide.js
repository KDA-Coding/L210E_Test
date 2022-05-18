/*
  Using H Render to make rendering html for the slides dynamic
*/
import { h } from "vue";

export const SlideContainer = {
  props: {
    activeSlideId: {
      type: Number,
      required: true,
    },
  },
  render() {
    const $slots = this.$slots.default();
    const slides = $slots
      .filter((x) => x.type == Slide)
    const content = $slots.find((x) => {
      
      return x.props.slideId === this.activeSlideId.toString();
    });
    console.log(this.$store.getters.getIndexSlideSelected);
    return h("div", { class: "contain" }, content);
  },
};

const slideData = (content) => ({
  ...content,
  props: {
    slideId: {
      type: String,
      required: true,
    },
  },
  render() {
    
    return h(this.$slots.default);
  },
  mounted(){
    console.log(content + " Content")
  }
});

export const Slide = slideData({ name: "Slide" });
