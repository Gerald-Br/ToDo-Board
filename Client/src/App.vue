<script setup lang="ts">
import TodoPage from '@/views/TodoPage.vue'
import WeatherPage from './views/WeatherPage.vue';
</script>

<template>
  <div class="container d-flex flex-column justify-content-center">
    <h1 class="d-flex justify-content-center mb-4">Dashboard</h1>
      <div>
        <TodoPage />
      </div>
      <div class="d-flex justify-content-start">
        <WeatherPage />
      </div>
  </div>
</template>
