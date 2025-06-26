<script setup lang="ts">
import { ref } from 'vue';
import { useAppStore } from '../store/store.js'
import ApplicationCard from './ApplicationCard.vue'
import SearchApplications from './SearchApplications.vue'
import type Application from '../models/Application.js'

const appStore: any = useAppStore();

const applications = ref<Application[]>(appStore.getApplications());

const searchByDates = (filter: { from: string, to: string }) => {
    applications.value = appStore.filterApplications(filter.from, filter.to)
}

</script>

<template>
    <h2>Заяви</h2>
    <SearchApplications @search="searchByDates"/>
    <ApplicationCard v-if="applications.length > 0" v-for="application in applications" :key="application.id" :application="application"/>
</template>