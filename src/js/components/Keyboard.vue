<template>
  <div class="keyboard">
    <div class="keyboard-row">
      <keyboard-button
          v-for="letter in alphabet.slice(0,12)"
          :key="letter"
          :char="letter"
          :backgroundColor="letterColors[letter]"
          @clicked="addLetter(letter)"
      />
    </div>
    <div class="keyboard-row">
      <keyboard-button
          v-for="letter in alphabet.slice(12,23)"
          :key="letter"
          :char="letter"
          :backgroundColor="letterColors[letter]"
          @clicked="addLetter(letter)"
      />
    </div>
    <div class="keyboard-row">
      <keyboard-button :char="'ENTER'" @clicked="enter"/>
      <keyboard-button
          v-for="letter in alphabet.slice(23,33)"
          :key="letter"
          :char="letter"
          :backgroundColor="letterColors[letter]"
          @clicked="addLetter(letter)"
      />
      <keyboard-button :char="'BACK'" @clicked="backspace"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Keyboard", components: {},
  props : ["value"],
  computed:{
    ...mapGetters({
      "wordLength":"wordLength",
      "findedLetters":"findedLetters",
      "alphabet":"alphabet",
    }),
    letterColors(){
      const letterColors={};
      this.findedLetters.warning.forEach(letter=>{
        letterColors[letter] = "bg-warning";
      });
      this.findedLetters.success.forEach(letter=>{
        letterColors[letter] = "bg-success";
      });

      return letterColors;
    }
  },
  methods:{
    enter(){
      this.$emit("enter");
    },
    backspace(){
      this.setValue( this.value.slice(0,-1))
    },
    addLetter(letter){
      if(this.value.length < this.wordLength) {
        this.setValue(this.value + letter)
      }
    },
    setValue(value){
      this.$emit('input',value);
    }
  },
}
</script>