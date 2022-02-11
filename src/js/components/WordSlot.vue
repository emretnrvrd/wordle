<template>
  <div class="word-slot">
    <letterSlot
        v-for="(letter,index) in letters" :key="letter.key"
        :letter="letter.value"
        :status="getStatus(index)"
        :index="index"
    />
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "WordSlot", components: {},
  props:["value","slotIndex"],
  computed:{
    ...mapGetters({
      "wordLength":"wordLength",
      "wordSlotStatus":"wordSlotStatus",
    }),
    letters(){
      const letters = {};
      for (let i = 0; i<this.wordLength; i++){
        letters[i] = {
          value : this.value[i] ?? "",
        }
      }
      return letters;
    }
  },
  methods:{
    getStatus(index){
      return this.wordSlotStatus[this.slotIndex] ? this.wordSlotStatus[this.slotIndex][index] : "?";
    }
  }
}
</script>