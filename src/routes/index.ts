import { createRouter, createWebHistory } from 'vue-router';
import { afterEach, beforeEach } from './helper';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(beforeEach);
router.afterEach(afterEach);

export default router;
