<script setup lang="ts">
import { ref } from 'vue';
import { useAppStore } from '../store/store.ts';
import AddCustomer from './AddCustomer.vue';
import CustomerCard from './CustomerCard.vue';
import type { Customer } from '@/models/Customer';

const appStore: any = useAppStore();

const customers = ref<Customer[]>(appStore.getCustomers());

</script>

<template>
    <h2>Замовники</h2>

    <AddCustomer />
   
    <br/>

    <CustomerCard v-if="customers.length > 0" v-for="customer in customers" :key="customer.id" :customer="customer"/>
</template>