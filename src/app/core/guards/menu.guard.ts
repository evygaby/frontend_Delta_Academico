import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { MenuItem } from '../layouts/sidebar/menu.model';
import { GlobalComponent } from '../global-component';
@Injectable({
  providedIn: 'root'
})
export class MenuGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const storedMenu = localStorage.getItem(GlobalComponent.Menu);
    const menu: MenuItem[] = storedMenu ? JSON.parse(storedMenu) as MenuItem[] : [];

    const currentPath = route.routeConfig?.path;

    function existsInMenu(items: MenuItem[], path: string | undefined): boolean {
      if (!path) return false;
      for (let item of items) {
        const normalizedLink = item.link?.replace(/^\//, '').toLowerCase();
        const normalizedPath = path.replace(/^\//, '').toLowerCase();
        if (normalizedLink === normalizedPath) return true;
        // 🔹 Regla especial: si tiene acceso a "empleados", también a "infoempleados"
    if (normalizedLink === 'empleados' && normalizedPath === 'empleadosdetalle') return true;
        if (item.subItems && existsInMenu(item.subItems, path)) return true;
      }
      return false;
    }

    if (existsInMenu(menu, currentPath)) {
      return true;
    } else {
      this.router.navigate(['/Home']);
      return false;
    }
  }
}
