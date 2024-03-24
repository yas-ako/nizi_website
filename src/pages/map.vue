<template>
  <div>
    <div class="container">
      <div class="map_wrapper">
        <canvas class="tile" id="map_filter"></canvas>
        <canvas class="tile" id="map_tile"></canvas>
        <!-- <canvas id=""></canvas> -->
      </div>
    </div>
    <p m-4>虹が見える可能性があると判定された部分を青く表示します．</p>
  </div>
</template>

<script setup>
import { nextTick } from "vue";
import testData from "@/assets/testData.json";

//地図の種類を15の場合と14の場合で別にする．13 は実装のハードルが上がる．
const is15 = false;

// 地図の設定．15と14で分岐させる
const tileInfo = {
  numberOfSheetsPerSide: is15 ? 40 : 20,
  startX: is15 ? 29084 : 14542,
  strtY: is15 ? 12886 : 6443,
  canvasSize: 1600,
};

// api/getRainbowDataから取ってくる
const response = await $fetch("/api/getRainbowData");
console.log(response);

// 地理院地図のURL．この後に，`${x座標}/${y座標}.png` と続く．
const url = `https://cyberjapandata.gsi.go.jp/xyz/std/${is15 ? 15 : 14}/`;

// 虹が見れるかどうかを代入する配列を作成
const items = new Array(tileInfo.numberOfSheetsPerSide ** 2);
for (let x = 0; x < tileInfo.numberOfSheetsPerSide; x++) {
  for (let y = 0; y < tileInfo.numberOfSheetsPerSide; y++) {
    items[x + tileInfo.numberOfSheetsPerSide * y] = [x, y, false];
  }
}

for (const point of testData) {
  items[point[0] + tileInfo.numberOfSheetsPerSide * point[1]][2] = true;
}

// for (const point of rainbowData.response) {
//   items[point.x + tileInfo.numberOfSheetsPerSide * point.y][2] = true;
// }

console.log(items);

// 画像のURLリスト
const imageURLs = [];
for (let x = 0; x < tileInfo.numberOfSheetsPerSide; x++) {
  for (let y = 0; y < tileInfo.numberOfSheetsPerSide; y++) {
    imageURLs[tileInfo.numberOfSheetsPerSide * y + x] = `${url}${
      tileInfo.startX + x
    }/${tileInfo.strtY + y}.png`;
  }
}

// DOMが読み込み終わったら
onMounted(() => {
  // canvasを取得
  const map_tile = document.getElementById("map_tile");
  map_tile.width = tileInfo.canvasSize;
  map_tile.height = tileInfo.canvasSize;
  const map_tile_ctx = map_tile.getContext("2d");
  renderMapImage(map_tile_ctx);
  nextTick();

  const map_filter = document.getElementById("map_filter");
  map_filter.width = tileInfo.canvasSize;
  map_filter.height = tileInfo.canvasSize;
  const map_filter_ctx = map_filter.getContext("2d");
  renderMapVisibleArea(map_filter_ctx);
  function renderMapImage(ctx) {
    for (const key in imageURLs) {
      if (Object.hasOwnProperty.call(imageURLs, key)) {
        const img = new Image();

        // `key` 番目の画像のURLを取得
        img.src = imageURLs[key];

        // 画像が読み込まれたら
        img.onload = () => {
          const x =
            (key % tileInfo.numberOfSheetsPerSide) *
            (tileInfo.canvasSize / tileInfo.numberOfSheetsPerSide);
          const y =
            Math.floor(key / tileInfo.numberOfSheetsPerSide) *
            (tileInfo.canvasSize / tileInfo.numberOfSheetsPerSide);
          ctx.globalAlpha = 1.0;
          ctx.drawImage(
            img,
            x,
            y,
            tileInfo.canvasSize / tileInfo.numberOfSheetsPerSide,
            tileInfo.canvasSize / tileInfo.numberOfSheetsPerSide
          );
        };
      }
    }
  }
  function renderMapVisibleArea(ctx) {
    console.log(ctx);
    // return new Promise(function (resolve, reject) {
    console.log(200);

    // Error
    // console.log(JSON.stringify(response));
    for (const data of response.response) {
      // Error

      const x = data[0] * (tileInfo.canvasSize / 40);
      const y = data[1] * (tileInfo.canvasSize / 40);
      // console.log(
      //   `data[0] : ${data[0]} , data[1] : ${data[1]} , x: ${x} , y: ${y}`
      // );
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "DarkBlue";
      ctx.fillRect(x, y, tileInfo.canvasSize / 40, tileInfo.canvasSize / 40);
    }
    // });
  }
});
</script>

<style scoped>
.container {
  /* margin-bottom: auto; */
  overflow: scroll;
  height: 70svh;
}

.tile {
  /* 画面幅若しくは縦のうち小さいほうの3倍 */
  width: 300vmin;
  height: 300vmin;
  position: absolute;
}

.map_wrapper {
  position: relative;
}

#map_filter {
  z-index: 1;
}

.image {
  width: 100%;
}

.mark {
  position: absolute;
}
</style>
