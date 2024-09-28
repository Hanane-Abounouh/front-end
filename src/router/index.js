// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import Home from '../views/Home.vue';
import AboutPage from '../views/About.vue';
import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';
import Dashboard from '../views/Dashboards/Dashboard.vue';
import UserList from '../views/Dashboards/Users/UserList.vue';
import RoleList from '../views/Dashboards/Roles/RoleList.vue';
import ProjetList from '../views/Dashboards/Projets/ProjetList.vue';
import ProjetCreate from '../views/Dashboards/Projets/ProjetCreate.vue';
import MesProjet from '../views/Dashboards/Projets/MesProjet.vue';
import TacheList from '../views/Dashboards/taches/TacheList.vue';
import TacheBoard from '../views/Dashboards/taches/TacheBoard.vue';
import TacheDetail from '../views/Dashboards/taches/TacheDetail.vue';
import CommentaireList from '../views/Dashboards/Commentaires/CommentaireList.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'login', name: 'Login', component: Login },
      { path: 'register', name: 'Register', component: Register },
      { path: 'AboutPage', name: 'AboutPage', component: AboutPage },
      
    ]
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Dashboard', component: Dashboard },
      { path: 'users', name: 'UserList', component: UserList },
      { path: 'roles', name: 'RoleList', component: RoleList },
      { path: 'projets', name: 'ProjetList', component: ProjetList },
      { path: 'ProjetCreate', name: 'ProjetCreate', component: ProjetCreate },
      { path: 'MesProjet', name: 'MesProjet', component: MesProjet },
      { path: 'Taches', name: 'TacheList', component: TacheList },
      { path: '/projets/:projectId/taches', name: 'TacheBoard', component: TacheBoard },
      {
        path: '/taches/:tacheId',name: 'TacheDetail', component: TacheDetail,
      },
      { path: 'Commentaires', name: 'CommentaireList', component: CommentaireList },






    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
