<template>
  <div class="container">
    <canvas id="map"></canvas>
  </div>
</template>

<script setup>
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
const rainbowData = await $fetch("/api/getRainbowData");
console.log(rainbowData);

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
  const canvas = document.getElementById("map");
  canvas.width = tileInfo.canvasSize;
  canvas.height = tileInfo.canvasSize;
  const ctx = canvas.getContext("2d");

  // 画像を取得，描画
  // for (const key in imageURLs) {
  //   if (Object.hasOwnProperty.call(imageURLs, key)) {
  //     const img = new Image();

  //     // `key` 番目の画像のURLを取得
  //     img.src = imageURLs[key];

  //     // 画像が読み込まれたら
  //     img.onload = () => {
  //       const x =
  //         (key % tileInfo.numberOfSheetsPerSide) *
  //         (tileInfo.canvasSize / tileInfo.numberOfSheetsPerSide);
  //       const y =
  //         Math.floor(key / tileInfo.numberOfSheetsPerSide) *
  //         (tileInfo.canvasSize / tileInfo.numberOfSheetsPerSide);
  //       ctx.globalAlpha = 1;
  //       ctx.drawImage(
  //         img,
  //         x,
  //         y,
  //         tileInfo.canvasSize / tileInfo.numberOfSheetsPerSide,
  //         tileInfo.canvasSize / tileInfo.numberOfSheetsPerSide
  //       );
  //     };
  //   }
  // }
  // renderMapImage(ctx);

  //   for (const data of testData) {
  //     const x = data[0] * (tileInfo.canvasSize / 40);
  //     const y = data[1] * (tileInfo.canvasSize / 40);
  //     console.log(
  //       `data[0] : ${data[0]} , data[1] : ${data[1]} , x: ${x} , y: ${y}`
  //     );
  //     ctx.globalAlpha = 0.5;
  //     ctx.fillStyle = "blue";
  //     ctx.fillRect(x, y, tileInfo.canvasSize / 40, tileInfo.canvasSize / 40);
  //   }

  //   // for (const key in testData) {
  //   // if (Object.hasOwnProperty.call(testData, key)) {
  //   // const x = key[0] * (tileInfo.canvasSize / 40);
  //   // const y = key[1] * (tileInfo.canvasSize / 40);
  //   // console.log(
  //   //   `key[0] : ${key[0]} , key[1] : ${key[1]} , x: ${x} , y: ${y}`
  //   // );
  //   // ctx.globalAlpha = 0.5;
  //   // ctx.fillStyle = "blue";
  //   // ctx.fillRect(x, y, tileInfo.canvasSize / 40, tileInfo.canvasSize / 40);
  //   // }
  //   // }

  // Promise.all([renderMapImage(ctx), renderMapVisibleArea(ctx)]);
  function render(ctx) {
    console.log(150);
    renderMapImage(ctx).then(function () {
      console.log(200);
      // 最初の操作が完了した後に次の操作を行う
      return renderMapVisibleArea(ctx);
    });
    // .then(renderMapVisibleArea(ctx));
    // .then(function () {
    //   console.log(300);
    //   // 次の操作が完了した後の処理
    //   console.log("描画完了");
    // });
  }

  // render(ctx);

  function renderMapImage(ctx) {
    return new Promise(function (resolve, reject) {
      console.log(100);
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
            ctx.globalAlpha = 0.8;
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
      resolve();
    });
  }

  function renderMapVisibleArea(ctx) {
    // return new Promise(function (resolve, reject) {
    console.log(200);
    for (const data of testData) {
      const x = data[0] * (tileInfo.canvasSize / 40);
      const y = data[1] * (tileInfo.canvasSize / 40);
      console.log(
        `data[0] : ${data[0]} , data[1] : ${data[1]} , x: ${x} , y: ${y}`
      );
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = "blue";
      ctx.fillRect(x, y, tileInfo.canvasSize / 40, tileInfo.canvasSize / 40);
    }
    // });
  }

  renderMapImage(ctx).then(() => {
    // renderMapVisibleArea(ctx);
    for (const data of testData) {
      const x = data[0] * (tileInfo.canvasSize / 40);
      const y = data[1] * (tileInfo.canvasSize / 40);
      console.log(
        `data[0] : ${data[0]} , data[1] : ${data[1]} , x: ${x} , y: ${y}`
      );
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "blue";
      ctx.fillRect(x, y, tileInfo.canvasSize / 40, tileInfo.canvasSize / 40);
    }
  });
});

// for (const key in testData) {
// if (Object.hasOwnProperty.call(testData, key)) {
// const x = key[0] * (tileInfo.canvasSize / 40);
// const y = key[1] * (tileInfo.canvasSize / 40);
// console.log(
//   `key[0] : ${key[0]} , key[1] : ${key[1]} , x: ${x} , y: ${y}`
// );
// ctx.globalAlpha = 0.5;
// ctx.fillStyle = "blue";
// ctx.fillRect(x, y, tileInfo.canvasSize / 40, tileInfo.canvasSize / 40);
// }
// }
</script>

<style scoped>
.container {
  /* margin-bottom: auto; */
  overflow: scroll;
  height: 70svh;
}

#map {
  /* 画面幅若しくは縦のうち小さいほうの3倍 */
  width: 300vmin;
  height: 300vmin;
}
.image {
  width: 100%;
}

.mark {
  position: absolute;
}
</style>
