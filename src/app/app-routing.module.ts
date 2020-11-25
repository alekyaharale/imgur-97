import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {PostDetailsComponent} from './post-details/post-details.component';
import {SignInComponent} from './sign-in/sign-in.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'details/:type/:index', component: PostDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
