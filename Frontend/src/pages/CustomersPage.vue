<template>
  <div class="customers-page">
    <h1 class="title">Customer List</h1>

    <!-- Form to create or update a customer -->
    <form @submit.prevent="submitForm" class="customer-form">
      <input v-model="form.name" placeholder="Customer Name" required />
      <input v-model="form.email" placeholder="Customer Email" required />
      <button type="submit">{{ editingCustomer ? 'Update' : 'Add' }} Customer</button>
      <button type="button" @click="clearForm">Clear</button>
    </form>

    <div v-if="customers.length === 0" class="no-customers">
      <p>No customers found.</p>
    </div>

    <ul class="customer-list">
      <li v-for="customer in customers" :key="customer.id" class="customer-item">
        <div>
          <span class="customer-name">{{ customer.name }}</span>
          <span class="customer-email">{{ customer.email }}</span>
          <span class="customer-id">ID: {{ customer.id }}</span>
        </div>
        <div class="customer-actions">
          <button @click="editCustomer(customer)">Edit</button>
          <button @click="deleteCustomer(customer.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios, { AxiosError } from 'axios'
import { Customer } from '../types'

const customers = ref<Array<Customer>>([])
const form = ref<{ name: string; email: string; id?: number }>({ name: '', email: '' })
const editingCustomer = ref<boolean>(false)

const loadCustomers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/customers')
    customers.value = response.data
  } catch (error) {
    const err = error as AxiosError
    if (err.response) {
      console.error('Error loading customers:', err.response.data)
    } else {
      console.error('Error loading customers:', err.message)
    }
  }
}

const submitForm = async () => {
  try {
    if (editingCustomer.value) {
      // Update customer
      const response = await axios.put(`http://localhost:3000/api/customers/${form.value.id}`, form.value)
      const index = customers.value.findIndex(customer => customer.id === form.value.id)
      if (index !== -1) {
        customers.value[index] = response.data
      }
    } else {
      // Create new customer
      const response = await axios.post('http://localhost:3000/api/customers', form.value)
      customers.value.push(response.data)
    }
    clearForm()
  } catch (error) {
    const err = error as AxiosError
    if (err.response) {
      console.error('Error submitting form:', err.response.data)
    } else {
      console.error('Error submitting form:', err.message)
    }
  }
}

const editCustomer = (customer: Customer) => {
  form.value.name = customer.name
  form.value.email = customer.email
  form.value.id = customer.id
  editingCustomer.value = true
}

const deleteCustomer = async (id: number) => {
  try {
    await axios.delete(`http://localhost:3000/api/customers/${id}`)
    customers.value = customers.value.filter(customer => customer.id !== id)
  } catch (error) {
    const err = error as AxiosError
    if (err.response) {
      console.error('Error deleting customer:', err.response.data)
    } else {
      console.error('Error deleting customer:', err.message)
    }
  }
}

const clearForm = () => {
  form.value = { name: '', email: '' }
  editingCustomer.value = false
}

onMounted(() => {
  loadCustomers()
})
</script>

<style scoped>
.customers-page {
  padding: 20px;
  max-width: 600px;
  margin: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.title {
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
}

.customer-form {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.customer-form input {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.customer-form button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
}

.customer-form button:hover {
  background-color: #0056b3;
}

.no-customers {
  color: #777;
  font-style: italic;
  text-align: center;
}

.customer-list {
  list-style-type: none;
  padding: 0;
}

.customer-item {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  background-color: #f9f9f9;
}

.customer-name {
  font-weight: bold;
}

.customer-email {
  color: #555;
  margin: 0 10px;
}

.customer-id {
  color: #555;
}

.customer-actions {
  display: flex;
  align-items: center;
}

.customer-actions button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #dc3545;
  color: #fff;
}

.customer-actions button:hover {
  background-color: #c82333;
}
</style>
