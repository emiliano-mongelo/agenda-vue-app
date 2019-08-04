import VueRouter from 'vue-router';
import List from './pages/List';
import Edit from './pages/Edit';
import View from './pages/View';
import NotFound from './pages/NotFound';

const routes = [
  { path: '/', name: 'dashboard', component: List },
  { path: '/contact/new', name: 'new', component: Edit },
  { path: '/contact/:contactId', name: 'view', component: View },
  { path: '/contact/:contactId/edit', name: 'edit', component: Edit },
  { path: '*', name: 'not-found', component: NotFound }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
