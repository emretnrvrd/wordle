<template>
  <div class="keyboard-button" :class="styles" @click="$emit('clicked',char)">
    {{char}}
  </div>
</template>

<script>
export default {
  name: "KeyboardButton",
  props:{
    char:{
      required:true
    },
    backgroundColor:{
      default : "bg-gray"
    }
  },
  computed:{
    styles(){
      return {
        [this.backgroundColor]:true,
        "cl-light" : true,
      }
    }
  }
}
</script>

<style scoped>

</style>