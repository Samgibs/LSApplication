<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="q-px-md">
        <!-- Menu Button -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <!-- Title -->
        <q-toolbar-title class="text-h5 q-mt-xs">LSApplication</q-toolbar-title>
        <div class="q-ml-auto text-subtitle2">Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list padding class="q-pa-md">
        <!-- Section Header -->
        <q-item-label header class="text-h6 text-primary q-mb-sm">
          Navigation
        </q-item-label>

        <!-- Essential Links -->
        <q-item v-for="link in linksList" :key="link.title" class="q-pa-none q-mb-xs">
          <EssentialLink v-bind="link" />
        </q-item>

        <!-- Section Divider -->
        <q-separator spaced />

        <!-- Custom Navigation Links -->
        <q-item to="/customers" class="drawer-link">
          <q-item-section avatar>
            <q-icon name="group" class="text-primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle1">Customers</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/projects" class="drawer-link">
          <q-item-section avatar>
            <q-icon name="folder" class="text-primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle1">Projects</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Page Container -->
    <q-page-container class="bg-grey-2 q-pa-md">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout'
})

// List of essential links
const linksList: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

// Drawer state management
const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
/* Header Styling */
.q-header {
  background-color: #1976D2;
  color: white;
}

/* Drawer Styling */
.q-drawer {
  width: 260px; /* Wider for better visibility */
}

/* Drawer Link Styling */
.drawer-link {
  transition: background-color 0.3s;
  border-radius: 8px;
}

.drawer-link:hover {
  background-color: #E3F2FD; /* Light blue on hover */
}

/* List Styling */
.q-list {
  padding-top: 0;
}

.q-item {
  margin-bottom: 10px;
}

/* Primary color for essential links and text */
.text-primary {
  color: #1976D2;
}

/* General page padding */
.q-page-container {
  padding: 24px;
}

/* Aligning essential links */
.q-item-section {
  display: flex;
  align-items: center;
}
</style>
