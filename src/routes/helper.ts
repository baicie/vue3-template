import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import NProgress from 'nprogress';

export function beforeEach(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  // eslint-disable-next-line no-console
  console.log(`[route] from ${from.fullPath} to ${to.fullPath}`);
  NProgress.start();
  next();
}

export function afterEach(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  if (to.path !== from.path) {
    NProgress.done();
    document.documentElement.scrollTop = 0;
  }
}
