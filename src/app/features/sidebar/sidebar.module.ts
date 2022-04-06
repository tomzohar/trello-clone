import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuBoardsComponent } from './menu-boards/menu-boards.component';
import { MenuWorkspacesComponent } from './menu-workspaces/menu-workspaces.component';
import { SidebarDropdownComponent } from './sidebar-dropdown/sidebar-dropdown.component';
import { SidebarLinksComponent } from './sidebar-links/sidebar-links.component';
import { SidebarComponent } from './sidebar.component';
import { ButtonModule, MenuModule } from '@ui-components';

@NgModule({
  declarations: [
    MenuBoardsComponent,
    MenuWorkspacesComponent,
    SidebarComponent,
    SidebarDropdownComponent,
    SidebarLinksComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    MenuModule,
    RouterModule,
  ],
  exports: [
    SidebarComponent,
  ]
})
export class SidebarModule { }
