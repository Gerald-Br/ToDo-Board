<template>
    <div class="forecastDashboard w-100 p-4 shadow d-flex flex-column">
        <h1 class="py-2 px-3">3-Day Forecast</h1>
        <div class="forecastCardsWrapper d-flex flex-column">
            <div v-if="forecast[1]" class="forecastCard d-flex shadow mb-3 align-items-center p-2">
            <div class="forecastCardHeader">
                <h3 class="m-0">{{ moment.utc(forecast[1].time).format("dddd") }}</h3>
            </div>
            <div class="ms-auto d-flex align-items-center">
                <p class="m-0 me-4"> {{ forecast[1].rainprobability }}%</p>
                <div class="forecastCardBody ms-auto d-flex flex-column">
                    <p class="m-0">Max: {{ forecast[1].maxTemperature }}°C </p>
                    <p class="m-0">Min: {{ forecast[1].minTemperature }}°C </p>
                </div>
            </div>
        </div>
        <div v-if="forecast[2]" class="forecastCard d-flex shadow mb-3 align-items-center p-2">
            <div class="forecastCardHeader">
                <h3 class="m-0">{{ moment.utc(forecast[2].time).format("dddd") }}</h3>
            </div>
            <div class="ms-auto d-flex align-items-center">
                <p class="m-0 me-4"> {{ forecast[2].rainprobability }}%</p>
                <div class="forecastCardBody ms-auto d-flex flex-column">
                    <p class="m-0">Max: {{ forecast[2].maxTemperature }}°C </p>
                    <p class="m-0">Min: {{ forecast[2].minTemperature }}°C </p>
                </div>
            </div>
        </div>
        <div v-if="forecast[3]" class="forecastCard d-flex shadow mb-3 align-items-center p-2">
            <div class="forecastCardHeader">
                <h3 class="m-0">{{ moment.utc(forecast[3].time).format("dddd") }}</h3>
            </div>
            <div class="ms-auto d-flex align-items-center">
                <p class="m-0 me-4"> {{ forecast[3].rainprobability }}%</p>
                <div class="forecastCardBody ms-auto d-flex flex-column">
                    <p class="m-0">Max: {{ forecast[3].maxTemperature }}°C </p>
                    <p class="m-0">Min: {{ forecast[3].minTemperature }}°C </p>
                </div>
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
h1 {

}
.forecastDashboard {
    min-width: 300px;
    border-radius: 20px;
    height: 350px;
    background: linear-gradient(90deg, rgba(238, 231, 217, 0.574), rgba(201, 230, 230, 0.785));
    overflow: hidden;
}
.forecastCardsWrapper {
}
.forecastCard {
    border-radius: 10px;
    min-width: 300px;
    background: transparent;
    display: flex;
    flex: 1 1 30%;
    padding: 10px;
    min-width: 250px;
}
.forecastCardHeader {
    flex: 1 1 auto;
}

.forecastCardBody {
    flex: 1 1 auto;
}
@media screen and (max-width: 768px) {
    .forecastCard {
        flex: 1 1 100%;
    }
}
</style>