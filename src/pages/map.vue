<template>
  <div class="container">
    <template v-for="item in items">
      <img
        class="image"
        :src="`${url}${29084 + item[0]}/${12886 + item[1]}.png`"
      />
    </template>
  </div>
</template>

<script setup>
const url = "https://cyberjapandata.gsi.go.jp/xyz/std/15/";
const urlTemplate = `https://cyberjapandata.gsi.go.jp/xyz/std/15/29084/12886.png`;

const items = new Array(1600);
for (let x = 0; x < 40; x++) {
  for (let y = 0; y < 40; y++) {
    items[40 * x + y] = [y, x];
  }
}
</script>

<style>
.container {
  display: grid;
  grid-template-columns: repeat(40, 2.5%);
}
.image {
  width: 100%;
}
</style>
