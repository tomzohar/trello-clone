import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '../../ui-components/button/button.module';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { MenuModule } from './../../ui-components/menu/menu.module';
import { TopnavComponent } from './topnav.component';

@NgModule({
  declarations: [
    ProfileMenuComponent,
    TopnavComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    MenuModule,
    RouterModule,
  ],
  exports: [
    TopnavComponent,
  ]
})
export class TopnavModule { }
