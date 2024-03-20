<template>
  <div class="container">
    <canvas id="map"></canvas>
  </div>
</template>

<script setup>
//地図の種類を15の場合と14の場合で別にする．13 は実装のハードルが上がる．
const is15 = true;

// 地図の設定．15と14で分岐させる
const tileInfo = {
  numberOfSheetsPerSide: is15 ? 40 : 20,
  startX: is15 ? 29084 : 14542,
  strtY: is15 ? 12886 : 6443,
  canvasSize: 4000,
};

// api/getRainbowDataから取ってくる
const rainbowData = await $fetch("/api/getRainbowData");
console.log(rainbowData);

// 地理院地図のURL．この後に，`${x座標}/${y座標}.png` と続く．
const url = "https://cyberjapandata.gsi.go.jp/xyz/std/15/";

// 虹が見れるかどうかを代入する配列を作成
const items = new Array(1600);
for (let x = 0; x < 40; x++) {
  for (let y = 0; y < 40; y++) {
    items[x + 40 * y] = [x, y, false];
  }
}

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

// DOMが読み込み終わったら
onMounted(() => {
  // キャンバスの取得
  const canvas = document.getElementById("map");
  canvas.width = tileInfo.canvasSize;
  canvas.height = tileInfo.canvasSize;
  const ctx = canvas.getContext("2d");

  // 画像を取得，描画
  for (const key in imageURLs) {
    if (Object.hasOwnProperty.call(imageURLs, key)) {
      const img = new Image();

      // `key` 番目の画像のURLを取得
      img.src = imageURLs[key];

      // 画像が読み込まれたら
      img.onload = () => {
        const x = (key % 40) * 100;
        const y = Math.floor(key / 40) * 100;
        ctx.drawImage(img, x, y, 100, 100);
      };
    }
  }
});
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
