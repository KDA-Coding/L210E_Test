<template >
    <img v-if="this.$store.getters.getIsQuestionCorrect === 'true'" src="../../../public/img/correct.png" name="correct" />
    <img v-else-if="this.$store.getters.getIsQuestionCorrect === 'false'" src="../../../public/img/incorrect.png" name="incorrect" />
    <img v-else src="../../../public/img/question-answer.png" name="question" />
</template>
<script>
export default {
    
}
</script>
<style>
    
</style>