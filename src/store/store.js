import { reactive } from 'vue';

const CUSTOMERS_KEY = "CUSTOMERS";
const APPLICATIONS_KEY = "APPLICATIONS";

const state = reactive({
  customers: [],
  applications: []
});

export function useAppStore() {
  return {
    getCustomers() {
      var customersString = localStorage.getItem(CUSTOMERS_KEY);

      if (customersString !== null) {
        var customers = JSON.parse(customersString);
        if (customers.length > 0) {
            state.customers = [];
            for (let customer of customers) {
                state.customers.push(customer);
            }
        }
      }
      return state.customers;
    },

    getApplications() {
      var applicationsString = localStorage.getItem(APPLICATIONS_KEY);

      if (applicationsString !== null) {
        var applications = JSON.parse(applicationsString);
        if (applications.length > 0) {
            state.applications = [];
            for (let application of applications) {
                state.applications.push(application);
            }
        }
      }
      return state.applications;
    },

    getApplicationById(id) {
        this.getApplications();
        var application = state.applications.find(a => a.id == id);
        return application;
    },

    filterApplications(from, to) {
      var applicationsString = localStorage.getItem(APPLICATIONS_KEY);

      if (applicationsString !== null) {
        var applications = JSON.parse(applicationsString);
        if (applications.length > 0) {
            state.applications = [];
            for (let application of applications) {
                state.applications.push(application);
            }
        }
      }

      return state.applications.filter(a => a.date >= from && a.date <= to);
    },
   
    addCustomer(customer) {
      customer.id = Date.now();
      state.customers.push(customer);
      const jsonString = JSON.stringify(state.customers);
      localStorage.setItem(CUSTOMERS_KEY, jsonString)
    },

    addApplication(application) {
      application.id = Date.now();
      var customer = state.customers.find(c => c.id === application.customerId);

      application.customerName = customer.name + ' ' + customer.surname;

      state.applications.push(application);
      const jsonString = JSON.stringify(state.applications);
      localStorage.setItem(APPLICATIONS_KEY, jsonString)
    },

    updateApplication(application) {
        const index = state.applications.findIndex(a => a.id === application.id);
        if (index !== -1) {
            const updated = { ...application };
            state.applications[index] = updated;
        }

        const jsonString = JSON.stringify(state.applications);
        localStorage.setItem(APPLICATIONS_KEY, jsonString);
    },
  };
}