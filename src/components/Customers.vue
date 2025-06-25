<script setup>
import { ref } from 'vue';
import { useAppStore } from '.././store/store.js'
import AddCustomer from './AddCustomer.vue'
import Customer from './Customer.vue'

const appStore = useAppStore();

const customers = ref(appStore.getCustomers());

</script>

<template>
    <h2>Замовники</h2>

    <AddCustomer />
   
    <br/>

    <Customer v-if="customers.length > 0" v-for="customer in customers" :key="customer.id" :customer="customer"/>
</template>