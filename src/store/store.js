import { reactive } from 'vue';

const CUSTOMERS_KEY = "CUSTOMERS";

const state = reactive({
  customers: [],
});

export function useAppStore() {
  return {
    getCustomers() {
      var customersString = localStorage.getItem(CUSTOMERS_KEY);

      if (customersString !== null) {
        var customers = JSON.parse(customersString);
        if (customers.length !== 0) {
            for (let customer of customers) {
                state.customers.push(customer);
            }
        }
      }
      
      return state.customers;
    },
   
    addCustomer(customer) {
      customer.id = Date.now();
      state.customers.push(customer);
      const jsonString = JSON.stringify(state.customers);
      localStorage.setItem(CUSTOMERS_KEY, jsonString)
    },
  };
}