<template>
  <v-container
    height="100vh"
    fluid
    class="pa-8 hero d-flex flex-column align-center justify-center"
  >
    <div class="hero-content text-center">
      <h1 class="text-h2 font-weight-black mb-4">
        File Conversion Made Simple
      </h1>
      <p class="text-subtitle-1 mb-6">
        Convert your files to any format quickly, safely, and effortlessly.
      </p>

      <!-- Centered Card -->
      <div class="d-flex align-center justify-center">
        <v-card
          color="#ffcccb"
          width="500"
          height="200"
          class="pt-6 px-6 rounded-xl shadow-lg text-center"
        >
          <v-file-input
            v-model="file"
            label="Upload Image"
            accept="image/*"
            filled
            color="#ff69b4"
            prepend-icon="mdi-paperclip"
            show-size
            @change="onFileSelect"
            class="mb-4"
          ></v-file-input>
          <div class="d-flex">
            <v-select
              prepend-icon="mdi-file"
              v-model="format"
              :items="formats"
              label="Convert To"
              density="compact"
            />

            <v-btn
              :disabled="!selectedFile"
              color="#dc4d99"
              large
              @click="convertFile"
              class="text-center"
            >
              Convert
            </v-btn>
          </div>

          <div v-if="selectedFile" class="mt-4">
            <p>✅ File ready: {{ selectedFile?.name }}</p>
          </div>
        </v-card>
      </div>
    </div>

    <!-- Features Section -->
    <div class="features">
      <v-row align="center" justify="center" dense>
        <v-col v-for="feature in features" :key="feature.title" xs="12" sm="4">
          <v-card
            height="150"
            color="#fffd82"
            class="p-4 pt-4 rounded-lg shadow-md text-center"
          >
            <v-icon color="#ff69b4" size="40" class="mb-2">
              {{ feature.icon }}
            </v-icon>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.text }}</p>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <canvas ref="canvas" style="display: none"></canvas>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const selectedFile = ref(null);

function onFileSelect(file) {
  selectedFile.value = file;
}

const features = [
  {
    icon: "mdi-rocket",
    title: "Lightning Fast",
    text: "Convert files instantly with our high-speed service",
  },
  {
    icon: "mdi-shield-lock",
    title: "Safe & Private",
    text: "Your files stay private and are discarded immediately after conversion",
  },
  {
    icon: "mdi-sync",
    title: "Multiple Formats",
    text: "Support for PDF, PNG, MP4, MP3, and many more formats",
  },
];

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
      let mimeType = `image/${format.value}`;

      if (format.value === "jfif") mimeType = "image/jpeg";

      // Prepare canvas dimensions
      canvas.value.width = img.width;
      canvas.value.height = img.height;

      // Draw the image first
      const ctx = canvas.value.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Convert canvas to blob
      canvas.value.toBlob((blob) => {
        if (blob) {
          // Prepare a temporary link
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");

          a.href = url;
          a.download = `converted.${format.value}`;

          document.body.appendChild(a);
          a.click();

          a.remove();
          URL.revokeObjectURL(url);
        }
      }, mimeType);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file.value);
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #f180e2, #ffcccb, #fffd82);
  padding-bottom: 4rem;
  min-height: 100vh;
}

.hero-content {
  margin-bottom: 2rem;
  color: #ff69b4;
}

.features {
  color: #ff69b4;
}

.rounded-xl {
  border-radius: 24px;
}

.shadow-lg {
  box-shadow: 0 8px 24px -4px rgb(0 0 0 / 20%) !important;
}

.shadow-md {
  box-shadow: 0 4px 12px -2px rgb(0 0 0 / 15%) !important;
}

.text-center {
  text-align: center;
}
</style>
