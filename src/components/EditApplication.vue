<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAppStore } from '.././store/store.js'
import { useRouter, useRoute } from 'vue-router';

const props = defineProps(['id'])

const appStore = useAppStore();
const router = useRouter();
const route = useRoute();

const customers = ref(appStore.getCustomers());
const application = ref(null);

const printSection = ref(null);

onMounted(() => {
    console.log("here");
    const id = route.params.id;
    const app = appStore.getApplicationById(id);
    console.log(id);
    console.log(app)
    if (app) {
        application.value = { ...app };
    } else {
        console.warn(`Заява з id=${id} не знайдена`);
        router.push('/');
    }
})


const fileChanged = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        application.value.file = {
            name: file.name,
            type: file.type,
            data: reader.result, // Base64 string (data URL)
        };
    };
    reader.readAsDataURL(file);
}

const updateApplication = () => {
    appStore.updateApplication({ ...application.value });

    router.push('/');
}

const print = () => {
    const originalTitle = document.title;
  document.title = "Заява";

  const printContent = printSection.value.innerHTML;
  const printWindow = window.open('', '', 'height=600,width=800');

  printWindow.document.write(`
    <html>
      <head>
        <title>Заява</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          .text-center { text-align: center; }
          .print-container {
            max-width: 700px;
            margin: auto;
            border: 1px solid #333;
            padding: 40px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          p { font-size: 16px; line-height: 1.5; }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();

  document.title = originalTitle;
}

const fileUrl = computed(() => {
  const file = application.value.file;
  if (file?.data?.startsWith('data:')) {
    return file.data; // це вже data URL
  }
  return null;
});

</script>

<template>
    <h2>Редагування заяви</h2>

    <form @submit.prevent="updateApplication" v-if="application">
        <div class="row my-3">
            <label for="inputDate" class="col-sm-2 col-form-label">Дата</label>
            <div class="col-sm-10">
                <input v-model="application.date" type="date" class="form-control" id="inputDate">
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputReason" class="col-sm-2 col-form-label">Причина</label>
            <div class="col-sm-10">
                <select v-model="application.reason" class="form-select" aria-label="Default select example" placeholder="Причина">
                    <option value="нове підключення">Нове підключення</option>
                    <option value="збільшення потужності">Збільшення існуючої потужності</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputPower" class="col-sm-2 col-form-label">Потужність</label>
            <div class="col-sm-10">
                <input v-model.number="application.power" type="number" step="0.1" class="form-control" id="inputPower" placeholder="Потужність" />
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputComment" class="col-sm-2 col-form-label">Коментар</label>
            <div class="col-sm-10">
                <textarea v-model="application.comment" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Коментар"></textarea>
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputComment" class="col-sm-2 col-form-label">Замовник</label>
            <div class="col-sm-10">
                <select v-model="application.customerId" class="form-select" aria-label="Default select example">
                    <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name + ' ' + c.surname + ', ' + c.address }}</option>
                </select>
            </div>
        </div>
        <div class="row mb-3" v-if="application.file !== null">
            <label for="inputFile" class="col-sm-2 col-form-label">Назва файлу</label>
            <label for="inputFile" class="col-sm-2 col-form-label">{{application.file.name}}</label>
        </div>
        <div class="row mb-3">
            <label for="inputFile" class="col-sm-2 col-form-label">Змінити файл</label>
            <div class="col-sm-10">
                <input @change="fileChanged" type="file" accept=".pdf,.doc,.docx" class="form-control" id="inputFile" placeholder="Потужність" />
            </div>
        </div>
        <div class="row mb-3" v-if="application.file">
            <label for="inputFile" class="col-sm-2 col-form-label">Перегляд</label>
            <div class="col-sm-10">
                <a :href="fileUrl" target="_blank" class="btn btn-outline-primary">Переглянути</a>
            </div>
        </div>
        <div class="d-grid gap-2">
            <button type="submit" class="btn btn-outline-primary">Оновити</button>
        </div>
    </form>

    <button @click="print" class="btn btn-outline-primary d-grid gap-2 my-3">Друкувати</button>

    <br/>

     <!-- Print-only section -->
    <div ref="printSection" class="print-area" style="display: none;" v-if="application">
        <div class="print-container">
        <h2 class="text-center">Заява</h2>

        <p><strong>Дата:</strong> {{ application.date }}</p>
        <p><strong>Причина підключення:</strong> {{ application.reason }}</p>
        <p><strong>Потужність (кВт):</strong> {{ application.power }}</p>
        <p><strong>Коментар:</strong> {{ application.comment }}</p>
        <p><strong>Замовник:</strong>
            {{
            customers.find(c => c.id === application.customerId)?.name +
            ' ' +
            customers.find(c => c.id === application.customerId)?.surname
            }},
            {{
            customers.find(c => c.id === application.customerId)?.address
            }}
        </p>
        <p><strong>Назва файлу:</strong> {{ application.file?.name }}</p>

        <br />
        <p>___________________________</p>
        <p><em>Підпис замовника</em></p>
        </div>
  </div>
</template>