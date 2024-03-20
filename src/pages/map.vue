<template>
  <div class="container">
    <canvas id="map"></canvas>
    <!-- <template v-for="item in items"> -->
    <!-- <Maptile
        :url="`${url}${29084 + item[0]}/${12886 + item[1]}.png`"
        :visivility="item[2]"
      /> -->

    <!-- <img
        class="image"
        :src="`${url}${29084 + item[0]}/${12886 + item[1]}.png`"
      />
      <span class="mark" v-if="item.visivility">◯</span> -->
    <!-- </template> -->
  </div>
</template>

<script setup>
//地図の種類を15の場合と14の場合で別にする．13 は実装のハードルが上がる．
const is15 = true;
const tileInfo = {
  numberOfSheetsPerSide: is15 ? 40 : 20,
  startX: is15 ? 29084 : 14542,
  strtY: is15 ? 12886 : 6443,
  canvasSize: 4000,
};
console.log(tileInfo.numberOfSheetsPerSide);

import testData from "@/assets/testData.json";
const rainbowData = await $fetch("/api/getRainbowData");
console.log(rainbowData);
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

// for (const point of rainbowData.response) {
//   items[point.x + 40 * point.y][2] = true;
// }

console.log(items);

// 画像のURLリスト
const imageURLs = [
  // ここに画像のURLを追加してください
];
for (let x = 0; x < 40; x++) {
  for (let y = 0; y < 40; y++) {
    if (is15) {
      imageURLs[40 * y + x] = `${url}${29084 + x}/${12886 + y}.png`; //15
    } else {
      imageURLs[40 * y + x] = `${url}${14542 + x}/${6443 + y}.png`; //14
    }
  }
}
console.log(imageURLs);

onMounted(() => {
  // キャンバスの作成
  const canvas = document.getElementById("map");
  canvas.width = tileInfo.canvasSize;
  canvas.height = tileInfo.canvasSize;
  const ctx = canvas.getContext("2d");

  for (const key in imageURLs) {
    if (Object.hasOwnProperty.call(imageURLs, key)) {
      const img = new Image();
      img.src = imageURLs[key];
      img.onload = () => {
        const x = (key % 40) * 100;
        const y = Math.floor(key / 40) * 100;
        ctx.drawImage(img, x, y, 100, 100);
      };
    }
  }
});

// // 画像の読み込みカウンター
// let imagesLoaded = 0;

// // 画像の読み込みと描画
// function loadImageAndDraw(index) {
//   if (index >= imageURLs.length) {
//     // すべての画像が読み込まれたらキャンバスをDOMに追加
//     document.getElementById("map").innerHTML = canvas;
//     return;
//   }

//   const img = new Image();
//   img.src = imageURLs[index];
//   img.onload = () => {
//     const x = (index % 40) * 256;
//     const y = Math.floor(index / 40) * 256;
//     ctx.drawImage(img, x, y);
//     imagesLoaded++;
//     loadImageAndDraw(imagesLoaded); // 次の画像を読み込む
//   };
// }

// // 最初の画像を読み込みと描画を開始する
// loadImageAndDraw(imagesLoaded);
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
