import { Routes } from '@angular/router';
import { PrivacyComponent } from './privacy/privacy.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: "privacy", component: PrivacyComponent},
    {path: "", component: HomeComponent},
    {path: "404", component: HomeComponent},
    {path: "**", component: HomeComponent}
  ];
