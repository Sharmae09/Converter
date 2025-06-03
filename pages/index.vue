<template>
  <v-container>
    <v-file-input v-model="file" label="Upload File" />
    <v-select v-model="format" :items="formats" label="Convert To" />
    <v-btn @click="convertFile">Convert</v-btn>
    <v-btn v-if="convertedFile" :href="convertedFile" download>Download</v-btn>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const file = ref(null);
const format = ref(null);
const formats = ["txt", "pdf", "jpg"]; // example
const convertedFile = ref(null);

function convertFile() {
  if (!file.value || !format.value) return;

  // Example: read as text and convert to .txt
  const reader = new FileReader();
  reader.onload = () => {
    const blob = new Blob([reader.result], { type: "text/plain" });
    convertedFile.value = URL.createObjectURL(blob);
  };
  reader.readAsText(file.value);
}
</script>
