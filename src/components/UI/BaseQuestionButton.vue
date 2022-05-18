<template>
  <div>
    <slot :getAnswer="checkAnswer"> </slot>
  </div>
</template>
<script>
  import store from "../../store/index";
  export default {
    props: ["Qanswer"],
    data() {
      return {
        questionAnswered: false,
        questionNumber: "",
        q: false,
      };
    },
    mounted() {
      store.dispatch("setQuestionAnswered", false);
    },
    methods: {
      checkAnswer($event) {
        if ($event.target.value === "true") {
          //return flag to show button
          store.dispatch("setQuestionAnswered", true);
          //return flag to show img true
          store.dispatch("setIsQuestionCorrect", "true");
        }
        if ($event.target.value === "false") {
            //return flag to show img false
          store.dispatch("setIsQuestionCorrect", "false");
        }
      },
    },
  };
</script>
<style></style>
