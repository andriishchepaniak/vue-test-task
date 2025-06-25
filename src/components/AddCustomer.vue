<script setup>
import { ref } from 'vue';
import { useAppStore } from '.././store/store.js'

const appStore = useAppStore();

const newCustomer = ref({
    name: '',
    surname: '',
    address: ''
});

const addCustomer = () => {
    console.log(newCustomer.value);
    appStore.addCustomer({ ...newCustomer.value });
    newCustomer.value = { name: '', address: '' };
}
</script>

<template>
    <form @submit.prevent="addCustomer">
        <div class="row my-3">
            <label for="inputName" class="col-sm-2 col-form-label">Ім'я</label>
            <div class="col-sm-10">
                <input v-model="newCustomer.name" type="input" class="form-control" id="inputName">
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputSurname" class="col-sm-2 col-form-label">Прізвище</label>
            <div class="col-sm-10">
                <input v-model="newCustomer.surname" type="input" class="form-control" id="inputSurname">
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputAddress" class="col-sm-2 col-form-label">Адреса</label>
            <div class="col-sm-10">
                <input v-model="newCustomer.address" type="input" class="form-control" id="inputAddress">
            </div>
        </div>
        <div class="d-grid gap-2">
            <button type="submit" class="btn btn-outline-primary">Створити</button>
        </div>
    </form>
</template>