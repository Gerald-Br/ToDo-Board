<script setup lang="ts">
import TodoPage from '@/views/TodoPage.vue'
import WeatherPage from './views/WeatherPage.vue';
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 d-flex justify-content-start">
        <TodoPage />
      </div>
      <div class="col-12 d-flex justify-content-start">
        <WeatherPage />
      </div>
    </div>
  </div>
</template>
