<template>
  <router-view></router-view>
  <denglong v-if="hasdenglong"></denglong>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import denglong from "./components/denglong.vue";
if (document.getElementById("Loading"))
  document.getElementById("Loading")?.remove();
let hasdenglong = ref(false);
let hasdl = localStorage.getItem("HASDL");
if (hasdl == "1") {
  hasdenglong.value = true;
} else {
  hasdenglong.value = false;
}
</script>
<style></style>
