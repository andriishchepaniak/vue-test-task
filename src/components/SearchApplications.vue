<script setup lang="ts">
import { ref } from 'vue';
import { useAppStore } from '../store/store.js'

const fromDate: string = ref<string>(new Date().toISOString().slice(0, 10));

const toDate: string = ref<string>(new Date().toISOString().slice(0, 10));

const emit = defineEmits<{
  (e: 'search', payload: { from: string; to: string }): void;
}>();

const searchClicked = (): void => {
  emit('search', { from: fromDate.value, to: toDate.value });
};

</script>

<template>
    <form class="row g-3" @submit.prevent="searchClicked">
        <div class="col-auto">
            <label for="staticEmail2" class="visually-hidden">Email</label>
            <h3>Пошук: </h3>
        </div>
        <div class="col-auto">
            <input v-model="fromDate" type="date" class="form-control" id="inputFrom">
        </div>
         <div class="col-auto">
            <input v-model="toDate" type="date" class="form-control" id="inputTo">
        </div>
        <div class="col-auto">
            <button type="submit" class="btn btn-outline-primary mb-3">Знайти</button>
        </div>
    </form>
</template>