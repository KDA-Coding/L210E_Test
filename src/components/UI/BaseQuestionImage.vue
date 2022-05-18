<template >
    <img v-if="this.$store.getters.getIsQuestionCorrect === 'true'" src="../../../img/correct.png" name="correct" />
    <img v-else-if="this.$store.getters.getIsQuestionCorrect === 'false'" src="../../../img/incorrect.png" name="incorrect" />
    <img v-else src="../../../img/question-answer.png" name="question" />
</template>
<script>
export default {
    
}
</script>
<style>
    
</style>