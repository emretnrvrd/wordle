import Vue from "vue";
import words from "../../words";


export default {
  state : {
    wordLength: 5,
    wordSlotCount : 6,
    wordSlots : [],
    wordSlotStatus : [],
    currentWordSlotIndex : 0,
    findedLetters : {
      success : [],
      warning : [],
    },
    answer : "",
    alphabet : [
      "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Ğ", "Ü",
      "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ş",
      "İ", "Z", "X", "C", "V", "B", "N", "M", "Ö", "Ç",
    ]
  },

  getters : {
    wordLength: state => state.wordLength,
    wordSlotCount: state => state.wordSlotCount,
    wordSlots: state => state.wordSlots,
    wordSlotStatus : state => state.wordSlotStatus,
    currentWordSlotIndex: state => state.currentWordSlotIndex,
    currentSlot : state => state.wordSlots[state.currentWordSlotIndex] ?? null,
    findedLetters: state => state.findedLetters,
    answer: state => state.answer,
    alphabet: state => state.alphabet,
  },

  mutations : {
    setAnswer(state, answer){
      state.answer = answer;
    },
    setCurrentWordSlotIndex(state, index){
      state.currentWordSlotIndex = index;
    },
    setWordSlots(state, wordSlots){
      Vue.set(state,"wordSlots",wordSlots);
    },
    addFinded(state, {letter, source}){
      state.findedLetters[source].push(letter);
    },
    addWordSlotStatus(state,status){
      state.wordSlotStatus.push(status);
    },
    clearWordSlotStatus(state){
      state.wordSlotStatus = [];
    },
    clearFinded(state){
      state.findedLetters = {
        success: [],
        warning: [],
      };
    }
  },

  actions : {
    async startGame({dispatch,commit}){
      await commit("clearWordSlotStatus");
      await commit("clearFinded");
      await commit("setCurrentWordSlotIndex",0)
      await dispatch("fetchRandomWord");
      await dispatch("createWordSlots");
    },
    async fetchRandomWord({commit}){
      const answer = words[Math.floor(Math.random() * words.length)];
      await commit("setAnswer",answer);
    },
    async createWordSlots({getters, commit}){
      const wordSlots = [];
      for (let i = 0; i < getters.wordSlotCount; i++){
        wordSlots.push("");
      }
      await commit("setWordSlots",wordSlots);
    },
    async pushFinded({commit,getters}, {letter, source}){
      if(!getters.findedLetters[source].includes(letter)){
        return await commit("addFinded", {letter, source});
      }
      return false;
    },
    async nextWordSlot({getters,commit}){
      await commit("setCurrentWordSlotIndex", getters.currentWordSlotIndex+1)
    },
    async addWordSlotStatus({getters,commit},status){
      return await commit("addWordSlotStatus",status,getters.currentWordSlotIndex);
    },
    async compareWords({getters,dispatch}){
      const result = getters.currentSlot.split("");
      const tempAnswer = getters.answer.split("");
      for (let i = 0; i < result.length; i++) {
        let findedIndex = tempAnswer.indexOf(result[i]);
        if(findedIndex!=-1){
          if(findedIndex==i){
            await dispatch("pushFinded", {letter:result[i], source:"success"});
            result[i] = "1";
          }
          else{
            await dispatch("pushFinded", {letter:result[i], source:"warning"});
            result[i] = "0";
          }
          tempAnswer[findedIndex] = "?";
        }else{
          result[i] = "-";
        }
      }
      return result.join("");
    },
    async validateWord({},answer){
      return words.includes(answer);
    }
  }
}