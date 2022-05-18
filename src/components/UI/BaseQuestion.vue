<template>
    <BaseQuestionButton v-slot="scope">
  <div class="question">
    <input type="radio" :name="name" @click="scope.getAnswer" :value="value" :id="id" />
    <label class="questionLabel" :for="id">{{ labelName }}</label>
  </div>
    </BaseQuestionButton>
</template>
<script>
  import BaseQuestionButton from "../UI/BaseQuestionButton.vue";
  export default {
    props: ["value", "id", "labelName", "name"],
    components: { BaseQuestionButton },
    data() {
      return {
        checked: this.id,
      };
    },
    computed: {
      isChecked() {
        if (this.id != this.checked) {
            console.log(this.checked)
        }
      },
    },
  };
</script>
<style scoped>
  .question {
    margin: 1%;

    padding: 1%;
    display: flex;
    /* DISPLAY: FLEX; */
    justify-content: flex-start;
   
  }
  .questionLabel {
    margin-left: 1%;
  }
</style>
