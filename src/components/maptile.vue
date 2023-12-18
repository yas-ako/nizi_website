<template>
  <!-- <div class="wrapper"> -->
  <img v-if="!tile.visivility" class="image" :src="tile.url" />
  <img v-else-if="tile.visivility" class="image-mark" :src="tile.url" />
  <!-- <span class="mark" v-if="tile.visivility"></span> -->
  <!-- </div> -->
</template>

<script setup lang="ts">
type Props = {
  url: string;
  visivility: boolean;
};

const tile = defineProps<Props>();
</script>

<style scoped>
.wrapper {
  height: auto;
  width: 100%;
  position: relative;
}
.image {
  width: 100%;
}
.image-mark {
  width: 100%;
  content: "◯";
  background-color: blue;
  /* filter: opacity(40%) invert(); */
  filter: opacity(80%) invert();
  /* filter: hue-rotate(180deg); */
  /* border: 1px solid #000; */
}

/* .wrapper .image-mark::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: blue; 
  opacity: 0.5; 
  z-index: -1; 
} */

/* .mark {
  display: block;
  position: relative;
  background-color: #375cff7e;
  width: 100%;
  height: 100%;
} */
</style>
