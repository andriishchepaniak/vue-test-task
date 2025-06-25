<script setup>
import { ref } from 'vue';
import { useAppStore } from '.././store/store.js'
import ApplicationCard from './ApplicationCard.vue'

const appStore = useAppStore();


const fromDate = ref(new Date().toISOString().slice(0, 10));

const toDate = ref(new Date().toISOString().slice(0, 10));

const applications = ref(appStore.filterApplications(fromDate.value, toDate.value));


const searchByDates = () => {
    applications.value = appStore.filterApplications(fromDate.value, toDate.value)
}
</script>

<template>
    <h2>Заяви</h2>
    <form class="row g-3" @submit.prevent="searchByDates">
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
    <ApplicationCard v-if="applications.length > 0" v-for="application in applications" :key="application.id" :application="application"/>
</template>