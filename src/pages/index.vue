<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <h2 class="text-h4 mb-8 text-center">虹予報</h2>
  <p class="m-5">30分後に虹が観測できる可能性のあるところを表示します</p>

  <h3 class="text-h5 my-3">注意</h3>
  <p class="my-3">
    予報情報につきましては、気象学的解析に基づくもので不可知要素を含んでおり、実際の結果とは異なる可能性がございます。また、本情報に基づいて遂行された活動において発生した、いかなる障害及び事故について、一切の責任は負いかねますので、あらかじめご了解の上ご利用くださいますよう
    お願い申し上げます。また、このサイトでは、Yahoo! JAPANのサービスを利用しています。
  </p>
<p class="my-3">虹が見える可能性が高いと判定された地域は、地図の色を反転させて表現しています。</p>

  <NuxtLink to="map" class="my-5 mx-auto">
    <v-btn color="info">地図を見る</v-btn>
  </NuxtLink>

  <div class="text-center m-5">
    <!-- Begin Yahoo! JAPAN Web Services Attribution Snippet -->
    <span class="text-center h1 p-5" style="margin: 15px 15px 15px 15px"
      ><a href="https://developer.yahoo.co.jp/sitemap/"
        >Webサービス by Yahoo! JAPAN</a
      ></span
    >
    <!-- End Yahoo! JAPAN Web Services Attribution Snippet -->
  </div>
</template>
