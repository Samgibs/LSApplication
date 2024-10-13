const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'customers', component: () => import('pages/CustomersPage.vue') },
      { path: 'projects', component: () => import('pages/ProjectsPage.vue') }
    ]
  }
]

export default routes
