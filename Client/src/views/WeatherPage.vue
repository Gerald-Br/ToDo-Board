<template>
    <div class="container-fluid weatherContainer p-0">
        <CurrentWeatherCard />
        <ForecastWeatherCard />
    </div>
</template>

<script setup lang="ts">
import CurrentWeatherCard from '@/components/Weather/CurrentWeatherCard.vue';
import ForecastWeatherCard from '@/components/Weather/ForecastWeatherCard.vue';
import { useGeolocation } from '@vueuse/core'
import { watch, ref } from 'vue'

const { coords, locatedAt, error, resume, pause } = useGeolocation();
const hasLoggedCoords = ref(false);

watch(coords, (newCoords) => {
    if (newCoords && !hasLoggedCoords.value) {
        console.log('New Coords:', newCoords);
        hasLoggedCoords.value = true;
    }
});
</script>

<style>
.weatherContainer {
    display: flex;
    flex-direction: row;
    color: black;
}
</style>