import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmitterComponent } from './pages/create-emitter/create-emitter.component';
import { CreateListenerComponent } from './pages/create-listener/create-listener.component';
import { ListenerComponent } from './pages/listener/listener.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'listener' },
  { path: 'create-listener', component: CreateListenerComponent },
  { path: 'create-emitter', component: CreateEmitterComponent },
  { path: 'create-emitter/:id', component: CreateEmitterComponent },
  {
    path: 'listener/:id',
    component: ListenerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
