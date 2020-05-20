import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';

import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './inc/header/header.component';
import { SidebarComponent } from './inc/sidebar/sidebar.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { AddPostComponent } from './admin/add-post/add-post.component';
import { LoginComponent } from './auth/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CategoryComponent } from './pages/category/category.component';
import { SingleComponent } from './pages/single/single.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'category/:categoryId', component: CategoryComponent },
      { path: 'single/:postId', component: SingleComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'add-post', component: AddPostComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    ContactComponent,
    AddPostComponent,
    AddCategoryComponent,
    LoginComponent,
    MainLayoutComponent,
    AdminLayoutComponent,
    CategoryComponent,
    SingleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, { }),
    HttpClientModule,
  ],
  providers: [PostService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
