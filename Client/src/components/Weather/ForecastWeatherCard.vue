<template>
    <div class="forecastDashboard w-100 p-4 shadow d-flex flex-column">
        <div class="forecastCardsWrapper h-100 d-flex flex-column justify-content-evenly">
            <div v-for="(day, index) in forecast" :key="day.time.toString()">
                <div v-if="index != 0 && index < 7" class="forecastCard d-flex align-items-center p-2">
                    <div class="forecastCardHeader flex-grow-1">
                        <h3 class="m-0 fw-light">{{ formatDay(day.time.toString()) }}</h3>
                    </div>
                    <div class="forecastCardRain d-flex align-items-center justify-content-center">
                        <i class="bi bi-droplet me-1"></i>
                        <p class="m-0" :style="{ fontWeight: day.rainprobability > 50 ? 'bold' : 'normal' }">{{
                            day.rainprobability }}%</p>
                    </div>
                    <div class="forecastCardMaxTemp d-flex justify-content-end">
                        <p class="m-0 fw-medium me-2">{{ day.maxTemperature }}°C</p>
                    </div>
                    <div class="forecastCardMinTemp d-flex justify-content-end">
                        <p class="m-0 fw-light">{{ day.minTemperature }}°C</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from '@/store/weatherStore';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import moment from 'moment';
import type { WeatherDataItem } from '@/services/weatherService';

const store = useWeatherStore();
const forecast = computed<WeatherDataItem[]>(() => store.forecast);
const screenWidth = ref(window.innerWidth);

const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth;
};

onMounted(() => {
    window.addEventListener('resize', updateScreenWidth);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth);
});

const formatDay = (time: string) => {
    return screenWidth.value <= 991 ? moment.utc(time).format("ddd") : moment.utc(time).format("dddd");
};
</script>
<style scoped lang="scss">
.forecastDashboard {
    min-width: 300px;
    border-radius: 20px;
    height: 350px;
    background: linear-gradient(45deg, #80CBC4, #B2DFDB);
    overflow: hidden;
}

.forecastCard {
    position: relative;
    border-radius: 10px;
    min-width: 300px;
    padding: 10px;
}

.forecastCardRain {
    width: 15%;
    padding: 0 10px;
}

.forecastCardMaxTemp {
    width: 15%;
}

.forecastCardMinTemp {
    width: 10%;
}

.forecastCardBody {
    flex: 1 1 auto;
}

.forecastCard p,
h3 {
    position: relative;
    z-index: 1;
    /* Ensure the text is in front of the background image */
}

@media screen and (max-width: 768px) {
    .forecastCard {
        flex: 1 1 100%;
    }
}

@media screen and (max-width: 991px) {
    .forecastCardRain {
        width: 35%;
        padding: 0 10px;
    }

    .forecastCardMaxTemp {
        width: 23%;
    }

    .forecastCardMinTemp {
        width: 18%;
    }
}
</style>