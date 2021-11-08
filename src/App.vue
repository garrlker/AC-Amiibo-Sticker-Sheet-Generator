<script setup>
import { ref, reactive } from 'vue';
// 3/8 from sides
// 5/8 from bottom
// 1/2 from top
let villagers = reactive([]);
for (var i = 0; i < 63; i += 1) {
  villagers.push(null);
}

console.log("test", import.meta);
if (import.meta.hot) {
  console.log("Setting generate-pdf hook")
  import.meta.hot.on('generate-pdf', (data) => {
    // perform custom update
    console.log(data);
  })
}

</script>

<template>
  <div class="parent">
    <div v-for="(bla, index) in villagers" :key="index" class="child">
      <div class="sticker">
        <p>Enter Text</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  // padding-top: 2px;
}

#app {
  width: 100%;
  height: 100%;
  display: grid;
  // place-items: center;

  .parent {
    width: 8.5in;
    height: 11in;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(9, 1fr);
    // grid-gap: 0.03125in;
    // grid-gap: 0.0625in;
    // grid-gap: 0.125in;
    grid-gap: 0.13in;
    padding-left: 0.395in;
    padding-right: 0.375in;
    padding-top: 0.515in;
    // padding-left: 0.375in; // 3/8in
    // padding-right: 0.375in; // 3/8in
    // padding-top: 0.5in; // 1/2in
    // padding-bottom: 0.625in; // 5/8in
    padding-bottom: 0.5in;

    .child {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;

      .sticker {
        width: 1.135in; // Unfortunately magic numbers, wished 1in would work
        height: 1.135in; // Unfortunately magic numbers, wished 1in would work
        border: 1px solid black;
        border-radius: 50%;
        display: grid;
        place-items: center;
        box-sizing: border-box;
      }
    }
  }
}

@page {
  margin: 0;
}

// @media print {
//     @page {
//         size: 8.5in 11in;
//     }
// }
</style>
