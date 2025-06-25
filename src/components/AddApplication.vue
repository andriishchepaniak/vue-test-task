<script setup>
import { ref } from 'vue';
import { useAppStore } from '.././store/store.js'
import { useRouter } from 'vue-router';

const appStore = useAppStore();
const router = useRouter();

const customers = ref(appStore.getCustomers());

const newApplication = ref({
    date: new Date().toISOString().slice(0, 10),
    reason: '',
    comment: '',
    power: null,
    customerId: '',
    file: null
});

const fileChanged = (e) => {
    const file = e.target.files[0];
    //newApplication.value.file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        newApplication.value.file = {
            name: file.name,
            type: file.type,
            data: reader.result, // Base64 string (data URL)
        };
    };
    reader.readAsDataURL(file); // important!
}

const addApplication = () => {
    console.log(newApplication.value);
    appStore.addApplication({ ...newApplication.value });
    newApplication.value = {
        date: new Date().toISOString().slice(0, 10),
        reason: '',
        comment: '',
        power: null,
        customerId: '',
        file: null
    }

    router.push('/');
}
</script>

<template>
    <h2>Створити заяву</h2>

     <form @submit.prevent="addApplication">
        <div class="row my-3">
            <label for="inputDate" class="col-sm-2 col-form-label">Дата</label>
            <div class="col-sm-10">
                <input v-model="newApplication.date" type="date" class="form-control" id="inputDate">
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputReason" class="col-sm-2 col-form-label">Причина</label>
            <div class="col-sm-10">
                <select v-model="newApplication.reason" class="form-select" aria-label="Default select example" placeholder="Причина">
                    <option value="нове підключення">Нове підключення</option>
                    <option value="збільшення потужності">Збільшення існуючої потужності</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputPower" class="col-sm-2 col-form-label">Потужність</label>
            <div class="col-sm-10">
                <input v-model.number="newApplication.power" type="number" step="0.1" class="form-control" id="inputPower" placeholder="Потужність" />
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputComment" class="col-sm-2 col-form-label">Коментар</label>
            <div class="col-sm-10">
                <textarea v-model="newApplication.comment" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Коментар"></textarea>
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputComment" class="col-sm-2 col-form-label">Замовник</label>
            <div class="col-sm-10">
                <select v-model="newApplication.customerId" class="form-select" aria-label="Default select example">
                    <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name + ' ' + c.surname + ', ' + c.address }}</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputFile" class="col-sm-2 col-form-label">Потужність</label>
            <div class="col-sm-10">
                <input @change="fileChanged" type="file" accept=".pdf,.doc,.docx" class="form-control" id="inputFile" placeholder="Потужність" />
            </div>
        </div>
        <div class="d-grid gap-2">
            <button type="submit" class="btn btn-outline-primary">Створити</button>
        </div>
    </form>
</template>