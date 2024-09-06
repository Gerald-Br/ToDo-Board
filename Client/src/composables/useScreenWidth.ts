import { ref, onMounted, onUnmounted } from 'vue'

export const useScreenWidth = () => {
    const screenWidth = ref(window.innerWidth);

    const updateScreenWidth = () => {
        screenWidth.value = window.innerWidth;
    };

    onMounted(() => window.addEventListener('resize', updateScreenWidth));
    onUnmounted(() => window.removeEventListener('resize', updateScreenWidth));

    return screenWidth;
}