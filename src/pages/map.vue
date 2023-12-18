<template>
  <div class="container">
    <template v-for="item in items">
      <Maptile
        :url="`${url}${29084 + item[0]}/${12886 + item[1]}.png`"
        :visivility="item[2]"
      />

      <!-- <img
        class="image"
        :src="`${url}${29084 + item[0]}/${12886 + item[1]}.png`"
      />
      <span class="mark" v-if="item.visivility">◯</span> -->
    </template>
  </div>
</template>

<script setup>
import testData from "@/assets/testData.json";
const rainbowData = await $fetch("/api/getRainbowData");
const url = "https://cyberjapandata.gsi.go.jp/xyz/std/15/";
const urlTemplate = `https://cyberjapandata.gsi.go.jp/xyz/std/15/29084/12886.png`;

const items = new Array(1600);
for (let x = 0; x < 40; x++) {
  for (let y = 0; y < 40; y++) {
    items[x + 40 * y] = [x, y, false];
  }
}
// console.log(items);

// for (const point of testData) {
//   items[point[0] + 40 * point[1]][2] = true;
// }

for (const point of rainbowData.response.items) {
  items[point.x + 40 * point.y][2] = true;
}

console.log(items);
</script>

<style scoped>
.container {
  margin-bottom: auto;
  display: grid;
  grid-template-columns: repeat(40, 2.5%);
  /* grid-template-rows: repeat(40, 2.5%); */
}
.image {
  width: 100%;
}

.mark {
  position: absolute;
}
</style>
