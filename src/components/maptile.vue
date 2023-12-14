<template>
  <img class="image" :src="`${url}${29084 + item[0]}/${12886 + item[1]}.png`" />
  <span class="mark" v-if="item.visivility">◯</span>
</template>

<script setup lang="ts">
type Props = {
  tile: any;
};

const tile = defineProps<Props>();
</script>
