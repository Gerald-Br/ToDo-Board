<template>
    <div class="weatherDashboard d-flex flex-column p-4 shadow">
        <div class="weatherHeader">
            <form @submit.prevent="onLocationEntered(location)" class="input-group mb-3 w-100 d-flex align-items-center">
                <input class="weatherInput me-2 flex-grow-1" type="text" v-model="location" placeholder="Enter location" required>
                <button type="submit" class="weatherButton btn btn-primary rounded-circle">
                    <i class="bi bi-search"></i>
                </button>
            </form>
        </div>
        <div v-if="currentWeatherData" class="d-flex flex-column flex-grow-1">
            <div class="weatherBody d-flex align-items-center justify-content-start flex-grow-1">
                <div class="weatherInfo align-items-center" v-show="currentWeatherData">
                    <img :src="getWeatherIcon(dayTime)" class="pic" />
                    <p class="fs-1 fw-medium">{{ currentWeatherData?.temperature }}°C</p>
                </div>
            </div>
            <div class="weatherFooter">
                <div class="d-flex mt-1" v-if="currentWeatherData">
                    <i class="bi bi-geo-alt"></i>
                    <div class="ms-2 fw-medium">{{ weatherLocation }}</div>
                </div>
                <div class="d-flex mt-1" v-if="currentWeatherData">
                    <i class="bi bi-clock"></i>
                    <div class="ms-2 fw-medium">{{ moment.utc(currentWeatherData?.time).format("DD MMM YYYY HH:mm") }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import moment from 'moment';
import dayIcon from '@/assets/animated-images/day.svg';
import nightIcon from '@/assets/animated-images/night.svg';
import { useWeatherStore } from '@/store/weatherStore';

const store = useWeatherStore();
const currentWeatherData = computed(() => store.weatherData?.data[0]);
const weatherLocation = computed(() => store.location)
const location = ref<string>('');
const dayTime = ref<boolean>(true);

const onLocationEntered = (location: string) => {
    store.fetchWeather(location);

}

const getWeatherIcon = (dayTime: boolean) => {
    if (dayTime) {
        return dayIcon
    } else {
        return nightIcon
    }
}
</script>

<style scoped lang="scss">
.weatherDashboard {
    border-radius: 20px;
    min-width: 300px;
    height: 350px;
    background: url('@/assets/images/v1015-101a.jpg');
    background-position: -50px -0px; /* Adjust to show the specific part of the image */
    background-size: 800px 500px; /* Adjust to the size of the image */
    margin-right: 2rem;

    .input-group {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        flex-wrap: nowrap;

        .weatherButton {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            flex-shrink: 0;
        }

        .weatherInput {
            background: transparent;
            border-bottom: 2px solid rgba(0, 0, 0, 0.25);;
            border-top: none;
            border-left: none;
            border-right: none;
            width: auto;
            flex-grow: 1;
            color: black;

            &::placeholder {
                color: black;
            }
        }
    }
}

.weatherInput:focus {
    outline: none;
}

.pic {
    transform: scale(2);
}

.weatherFooter {
    border-top: 2px solid rgba(0, 0, 0, 0.25);
}
@media screen and (max-width: 768px) {
    .weatherDashboard{
        margin-right: 0;
        margin-bottom: 2rem;
    }
    
}
</style>