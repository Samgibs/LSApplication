<template>
  <div class="project-page-container">
    <h1 class="title">Projects</h1>

    <!-- Form for adding/editing projects -->
    <form @submit.prevent="submitProject" class="project-form">
      <input v-model="name" placeholder="Project Name" required class="input-field" />
      <textarea v-model="description" placeholder="Project Description" required class="textarea-field"></textarea>

      <!-- Select customer dropdown -->
      <div v-if="loadingCustomers" class="loading-message">
        Loading customers...
      </div>
      <div v-else-if="customerLoadError" class="error-message">
        Error loading customers. Please try again later.
      </div>
      <select v-if="!loadingCustomers && !customerLoadError" v-model="customerId" required class="select-field">
        <option disabled value="">Select Customer</option>
        <option v-for="customer in customers" :key="customer.id" :value="customer.id">
          {{ customer.name }}
        </option>
      </select>

      <button type="submit" class="submit-button">Submit Project</button>
    </form>

    <!-- Project List -->
    <h2 class="subtitle">Project List</h2>
    <ul class="project-list">
      <li v-for="project in projects" :key="project.id" class="project-item">
        {{ project.name }} - {{ project.description }}
        <button @click="editProject(project)" class="edit-button">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Interfaces
interface Project {
  id: number;
  name: string;
  description: string;
  customerId: number;
}

interface Customer {
  id: number;
  name: string;
}

// State variables
const name = ref<string>('')
const description = ref<string>('')
const customerId = ref<number | null>(null)
const projects = ref<Project[]>([])
const customers = ref<Customer[]>([])
const isEditing = ref<boolean>(false)
const editingProjectId = ref<number | null>(null)

// Loading and error states
const loadingCustomers = ref<boolean>(false)
const customerLoadError = ref<boolean>(false)

// Function to load projects
const loadProjects = async () => {
  try {
    const response = await axios.get('/api/projects')
    projects.value = response.data
  } catch (error) {
    console.error('Error loading projects:', error)
  }
}

// Function to load customers
const loadCustomers = async () => {
  loadingCustomers.value = true
  customerLoadError.value = false
  try {
    const response = await axios.get('/api/customers')
    customers.value = response.data
  } catch (error) {
    console.error('Error loading customers:', error)
    customerLoadError.value = true
  } finally {
    loadingCustomers.value = false
  }
}

// Load projects and customers on component mount
onMounted(() => {
  loadProjects()
  loadCustomers()
})

// Function to submit a project
const submitProject = async () => {
  if (!customerId.value) {
    console.error('Please select a valid customer.')
    return
  }

  const newProject = {
    name: name.value,
    description: description.value,
    customerId: customerId.value
  }

  try {
    if (isEditing.value && editingProjectId.value !== null) {
      await axios.put(`http://localhost:5000/api/projects/${editingProjectId.value}`, newProject)
    } else {
      await axios.post('http://localhost:5000/api/projects', newProject)
    }
    loadProjects()
    resetForm()
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Server Error:', error.response.status)
      } else if (error.request) {
        console.error('Network Error:', error.request)
      } else {
        console.error('Error:', error.message)
      }
    } else {
      console.error('Unexpected Error:', error)
    }
  }
}

// Function to edit a project
const editProject = (project: Project) => {
  isEditing.value = true
  editingProjectId.value = project.id
  name.value = project.name
  description.value = project.description
  customerId.value = project.customerId
}

// Function to reset the form
const resetForm = () => {
  name.value = ''
  description.value = ''
  customerId.value = null
  isEditing.value = false
  editingProjectId.value = null
}
</script>

<style scoped>
.project-page-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.title {
  text-align: center;
  color: #333;
}

.project-form {
  display: flex;
  flex-direction: column;
}

.input-field,
.textarea-field,
.select-field {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.input-field:focus,
.textarea-field:focus,
.select-field:focus {
  border-color: #007bff;
  outline: none;
}

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #0056b3;
}

.subtitle {
  margin-top: 20px;
  color: #555;
}

.project-list {
  list-style-type: none;
  padding: 0;
}

.project-item {
  padding: 10px;
  border: 1px solid #ddd;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
}

.edit-button {
  background-color: #ffc107;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #e0a800;
}

.loading-message {
  font-size: 14px;
  color: #007bff;
}

.error-message {
  font-size: 14px;
  color: #ff0000;
}
</style>
