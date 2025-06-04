<!-- <template>
  <v-container>
    <v-file-input v-model="file" label="Upload Image" accept="image/*" />
    <v-select v-model="format" :items="formats" label="Convert To" />
    <v-btn @click="convertFile">Convert</v-btn>
    <v-btn v-if="convertedFile" :href="convertedFile" download="convertedImage"
      >Download</v-btn
    >
    <canvas ref="canvas" style="display: none"></canvas>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const file = ref(null);
const format = ref(null);
const formats = ["jpeg", "png", "webp", "jfif"];
const convertedFile = ref(null);
const canvas = ref(null);

function convertFile() {
  if (!file.value || !format.value) return;

  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.value.getContext("2d");
      canvas.value.width = img.width;
      canvas.value.height = img.height;
      ctx.drawImage(img, 0, 0);

      let mimeType = `image/${format.value}`;
      if (format.value === "jfif") mimeType = "image/jpeg"; // JFIF is a JPEG subtype

      const dataURL = canvas.value.toDataURL(mimeType);
      const byteString = atob(dataURL.split(",")[1]);
      const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      convertedFile.value = URL.createObjectURL(blob);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file.value);
}
</script> -->

<template><h1>hjhjh</h1></template>
