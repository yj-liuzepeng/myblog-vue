<template>
  <router-view />
  <!-- <router-view #default="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="keepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!keepAlive" />
  </router-view> -->
</template>

<script lang="ts" setup>
// import { ref, watch } from 'vue'
// import { useRoute } from 'vue-router'
// let keepAlive = ref(false)
// const route = useRoute()
if (document.getElementById('Loading')) document.getElementById('Loading')?.remove();
// watch(()=>route.path,()=> {
//   keepAlive.value = route.meta.keepAlive as boolean
// })
</script>
<style>
</style>