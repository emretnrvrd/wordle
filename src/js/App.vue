<template>
  <div class="app-area bg-dark">
    <div class="head">
      <h1 class="app-title cl-light">WORDLE</h1>
    </div>
    <div class="main-area">
      <div class="word-slots">
        <word-slot
            v-for="(word, index) in wordSlots" :key="'key'+index"
            v-model="wordSlots[index]"
            :slotIndex="index"
        />
      </div>
    </div>
    <keyboard
        v-model="wordSlots[currentWordSlotIndex]"
        @enter="submit"
    />
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "App",
  computed:{
    ...mapGetters({
      "wordLength":"wordLength",
      "wordSlots":"wordSlots",
      "currentSlot":"currentSlot",
      "currentWordSlotIndex":"currentWordSlotIndex",
      "answer":"answer",
    }),
  },
  methods:{
    ...mapActions({
      "startGame":"startGame",
      "nextWordSlot":"nextWordSlot",
      "compareWords": "compareWords",
      "addWordSlotStatus": "addWordSlotStatus",
      "validateWord": "validateWord",
    }),
    async submit(){
      if(this.currentSlot.length == this.wordLength && await this.validateWord(this.currentSlot)){
          let status = await this.compareWords();
          await this.addWordSlotStatus(status);

          if(this.answer == this.currentSlot){
            setTimeout(()=>{
              alert("Tebrikler Kazandınız!!!");
              this.startGame();
            },3000);
            return 1;
          }

          if(this.wordSlots.length != this.currentWordSlotIndex){
            this.nextWordSlot();
          }else{
            alert("Kaybettiniz");
            this.startGame();
          }
      }else{
        alert("Kelime uzunluğu yetersiz yada yanlış kelime girdiğiniz!");
      }
    },
  },

  created() {
    this.startGame();
  }
}
</script>
