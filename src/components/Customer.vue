<script setup>
defineProps(['customer'])
</script>

<template>
    <div class="card my-3">
        <div class="card-body">
            <figure>
            <blockquote class="blockquote">
                <p>{{ customer.surname + ' ' + customer.name }}</p>
            </blockquote>
            <figcaption class="blockquote-footer">
                {{ customer.address }}
            </figcaption>
            </figure>
        </div>
    </div>
</template>