<template>
  <div class="video"></div>
</template>

<script setup>
import { ref } from "vue";
let currentindex = ref(0);
const hanleClick = (v) => {
  currentindex.value = v;
};
</script>

<style lang="less" scoped>
.active {
  color: red;
}
</style>
