<template>
    <div class="forecastDashboard w-100 p-4 shadow d-flex flex-column">
        <h1 class="py-2 px-3">3-Day Forecast</h1>
        <div v-if="forecast?.tomorrow" class="forecastCard d-flex shadow mb-3 align-items-center p-2">
            <div class="forecastCardHeader">
                <h3 class="m-0">{{ moment.utc(forecast.tomorrow.time).format("dddd") }}</h3>
            </div>
            <div class="ms-auto d-flex align-items-center">
                <p class="m-0 me-4"> {{ forecast.tomorrow.rainprobability }}%</p>
                <div class="forecastCardBody ms-auto d-flex flex-column">
                    <p class="m-0">Max: {{ forecast.tomorrow.maxTemperature }}°C </p>
                    <p class="m-0">Min: {{ forecast.tomorrow.minTemperature }}°C </p>
                </div>
            </div>
        </div>
        <div v-if="forecast?.dayAfterTomorrow" class="forecastCard d-flex shadow mb-3 align-items-center p-2">
            <div class="forecastCardHeader">
                <h3 class="m-0">{{ moment.utc(forecast.dayAfterTomorrow.time).format("dddd") }}</h3>
            </div>
            <div class="ms-auto d-flex align-items-center">
                <p class="m-0 me-4"> {{ forecast.dayAfterTomorrow.rainprobability }}%</p>
                <div class="forecastCardBody ms-auto d-flex flex-column">
                    <p class="m-0">Max: {{ forecast.dayAfterTomorrow.maxTemperature }}°C </p>
                    <p class="m-0">Min: {{ forecast.dayAfterTomorrow.minTemperature }}°C </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from '@/store/weatherStore';
import { computed } from 'vue';
import moment from 'moment';

const store = useWeatherStore();
const forecast = computed(() => store.forecast);

</script>
<style scoped lang="scss">
.forecastDashboard {
    border-radius: 20px;
    height: 350px;
    background: linear-gradient(90deg, rgba(238, 231, 217, 0.574), rgba(201, 230, 230, 0.785));
}

.forecastCard {
    border-radius: 10px;
    background: transparent;
}
</style>