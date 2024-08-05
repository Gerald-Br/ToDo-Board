<template>
    <div class="container-fluid weatherContainer p-0">
        <div class="weatherDashboard d-flex flex-column px-4 py-4">
            <div class="weatherHeader">
                <div class="input-group mb-3 w-100 d-flex align-items-center">
                    <transition-group name="fade" tag="div">
                        <input v-if="showInput" class="weatherInput me-2 flex-grow-1" type="text" v-model="location"
                            placeholder="Enter location" @keyup.enter="onLocationEntered(location)">
                    </transition-group>
                    <button type="button" class="weatherButton btn btn-primary rounded-circle" @click="toggleInput">
                        <i class="bi bi-search"></i>
                    </button>
                </div>
            </div>
            <div class="weatherBody flex-grow-1 d-flex align-items-center justify-content-start">
                <div class="weatherInfo align-items-center" v-show="wData">
                    <img :src="getWeatherIcon(dayTime)" class="pic" />
                    <p class="fs-1 fw-medium">{{ wData?.today.temperature }}°C</p>
                </div>
            </div>
            <div class="weatherFooter d-flex flex-column justify-content-start border-top border-2">
                <div class="d-flex mt-1 " v-if="wData">
                    <i class="bi bi-geo-alt"></i>
                    <div class="ms-1">{{ wData?.location }}</div>
                </div>
                <div class="d-flex mt-1" v-if="wData">
                    <i class="bi bi-clock"></i>
                    <div class="ms-2">{{ moment.utc(wData?.today.time).format("DD MMM YYYY HH:mm") }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { getWeatherData } from '@/services/weatherApi';
import type { weatherData } from '@/services/weatherApi';
import { ref } from 'vue';
import dayIcon from '@/assets/animated-images/day.svg';
import nightIcon from '@/assets/animated-images/night.svg';

const wData = ref<weatherData | null>(null);
const location = ref<string>('');
const showInput = ref<boolean>(false);
const dayTime = ref<boolean>(true);

const onLocationEntered = (location: string) => {
    getWeatherData(location).then((data) => {
        wData.value = data;
        if (wData.value?.today.time) {
            dayTime.value = moment.utc(wData.value.today.time).hour() > 6 && moment.utc(wData.value.today.time).hour() < 18;
        }
    }).catch((error) => {
        console.error('Error fetching weather data:', error);
    });
}

const getWeatherIcon = (dayTime: boolean) => {
    if (dayTime) {
        return dayIcon
    } else {
        return nightIcon
    }
}

const toggleInput = () => {
    showInput.value = !showInput.value;
}
</script>

<style>
.pic {
    transform: scale(2);
}
.weatherContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    color: black;
}

.weatherDashboard {
    border-radius: 20px;
    width: 300px;
    height: 350px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.6);

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
            border-bottom: 1.5px solid #ccc;
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
</style>