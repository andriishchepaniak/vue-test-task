<script setup>
import { useRouter } from 'vue-router';

const props = defineProps(['application'])

const router = useRouter();

const editApplication = () => {
  router.push({ name: 'editApplication', params: { id: props.application.id } })
  //router.push('/editApplication/' + props.application.id);
}

</script>

<template>
    <div class="card my-3">
      <div class="card-body">
        <h5 class="card-title">Номер: {{ application.id }}</h5>
        <p class="card-text">{{ application.customerName }}</p>
        <p class="card-text">{{ application.power }}</p>
        <p class="card-text">{{ application.reason }}</p>
        <button @click="editApplication" class="btn btn-outline-primary">Редагувати</button>
      </div>
    </div>
</template>