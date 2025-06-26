import Application from '@/models/Application';
import { Customer } from '@/models/Customer';
import { reactive } from 'vue';

const CUSTOMERS_KEY: string = "CUSTOMERS";
const APPLICATIONS_KEY: string = "APPLICATIONS";

interface State {
  customers: Customer[],
  applications: Application[]
}

const state = reactive<State>({
  customers: [],
  applications: []
});

export function useAppStore(): any {
  return {
    getCustomers(): Customer[] {
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

    getApplications(): Application[] {
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

    getApplicationById(id: number): Application {
        this.getApplications();
        var application = state.applications.find(a => a.id == id);
        return application;
    },

    filterApplications(from: string, to: string): Application[] {
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
   
    addCustomer(customer: Customer): void {
      customer.id = Date.now();
      state.customers.push(customer);
      const jsonString = JSON.stringify(state.customers);
      localStorage.setItem(CUSTOMERS_KEY, jsonString)
    },

    addApplication(application: Application): void {
      application.id = Date.now();
      var customer = state.customers.find(c => c.id === application.customerId);

      application.customerName = customer.name + ' ' + customer.surname;

      state.applications.push(application);
      const jsonString = JSON.stringify(state.applications);
      localStorage.setItem(APPLICATIONS_KEY, jsonString)
    },

    updateApplication(application: Application): void {
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