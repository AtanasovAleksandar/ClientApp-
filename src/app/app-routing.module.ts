import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';
import { UnauthorizedComponent } from './unauthorized.component';

const routes: Routes = [
  { path: 'Home', component: WelcomeComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Data', component: WelcomeComponent },
  { path: 'unauthorized', component: UnauthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
