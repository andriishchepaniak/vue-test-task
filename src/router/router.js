import { createRouter, createWebHistory } from 'vue-router';
import Applications from '../components/Applications.vue';
import Customers from '../components/Customers.vue';
import AddApplication from '@/components/AddApplication.vue';
import EditApplication from '@/components/EditApplication.vue';

const routes = [
      { path: '/', name: 'applications', component: Applications },
      { path: '/customers', name: 'customers', component: Customers },
      { path: '/addApplication', name: 'addApplication', component: AddApplication },
      { path: '/editApplication/:id', name: 'editApplication', props: true, component: EditApplication }
    ];

 const router = createRouter({
      history: createWebHistory(), // Use HTML5 history mode
      routes,
    });

export default router;