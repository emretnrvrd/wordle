<template>
  <div class="letter-slot animation-flip-360" :class="Object.values(classes)">
    {{letter}}
  </div>
</template>

<script>
export default {
  name: "LetterSlot",
  props :["letter","status","index"],
  data(){
    return {
      classes :{
        currentColor: { "border-success" : true },
        animation : { "animation-running" : false }
      },
    }
  },
  methods:{
    getCurrentColor(){
      if(this.status == "1")
        return { "bg-success" : true }
      else if (this.status == "0")
        return { "bg-warning" : true }
      else
        return { "bg-transparent" : true }
    },
    changeStatus(){
      setTimeout(()=>{
        this.classes.animation = { "animation-running": true };
        setTimeout(()=>{
          this.classes.currentColor = this.getCurrentColor();
          this.classes.animation = { "animation-running": false };
        },500)
      },(this.index) * 500)
    }
  },
  mounted() {
    this.classes.currentColor = this.getCurrentColor();
  },
  watch:{
    status(){
      this.changeStatus();
    }
  }
}
</script>
