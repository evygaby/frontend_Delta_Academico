import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MenuGuard } from '../../app/core/guards/menu.guard';
import { HomeComponent } from './Home/Home.component';


const routes: Routes = [
  {
    path: "usuario",
    component: UsuarioComponent
  },
  {path: "Home", component: HomeComponent},

  ///////////ACADEMICO
  //{path: "DistributivoMaestras", component: DistributivoMaestrasComponent, canActivate: [MenuGuard]},
  
  
  // fallback por si ponen una ruta que no existe
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
