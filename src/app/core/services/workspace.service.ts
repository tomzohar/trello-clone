import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, switchMap } from 'rxjs';
import { Workspace } from '../interface/workspace.interface';
import { Action, StateService } from './../../state/state.service';
import { MenuItem, MenuItems } from './../../ui-components/menu/menu/menu.component';
import { CacheKeys, CacheService } from './cache.service';
import { GotoService } from './goto.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  constructor(
    private cache: CacheService,
    private firestore: AngularFirestore,
    private goto: GotoService,
    private logger: LogService,
    private state: StateService,
  ) { }
  init() {
    const currentWorkspace = this.cache.getItem<Workspace>(CacheKeys.CurrentWorkspace);
    if (!!currentWorkspace) this.state.workspaceSetCurrent(currentWorkspace);
  }
  loadAll(userID: string): Observable<Workspace[]> {
    this.logger.logAction({ action: Action.WorkspaceGet, value: this });
    const collection = this.firestore.collection('workspace');
    return collection.get().pipe(
      map(ref => ref.docs.map(x => ({ ...x.data() as Workspace, id: x.id }))),
      map(workspaces => workspaces.filter(x => x.userID === userID)),
      map(workspaces => this.state.setWorkspaces(workspaces)),
      switchMap(() => this.state.getWorkspaces())
    );
  }
  getCurrentWorkspace(): Observable<Workspace | null> {
    this.logger.logAction({ action: Action.WorkspaceLoad, value: this });
    return this.state.getCurrentWorkspace();
  }
  setCurrentWorkspace(workspace: Workspace | null) {
    this.state.workspaceSetCurrent(workspace);
  }
  create(workspace: Partial<Workspace>): Observable<Workspace> {
    const collection = this.firestore.collection('workspace');
    return new Observable((observer) => {
      collection.add(workspace).then(ref => {
        ref.get().then(snap => {
          const id = snap.id;
          const newWorkspace = snap.data() as Workspace;
          newWorkspace.id = id;
          this.firestore.doc(`workspace/${id}`).set(newWorkspace)
            .then(() => observer.next(newWorkspace));
        });
      });
    });
  }
  getWorkspaceByID(workspaceID: string): Observable<Workspace> {
    this.logger.logAction({ action: Action.WorkspaceGetByID, value: this });
    return this.firestore.doc(`workspaces/${workspaceID}`).get().pipe(
      map(ref => ref.data() as Workspace)
    );
  }
  getMenuItems(userID: string): Observable<MenuItems[]> {
    return this.loadAll(userID).pipe(
      map(workspaces => {
        const menuItems: MenuItems = {
          headline: '',
          items: this.prepareMenuItems(workspaces)
        };
        return [menuItems];
      })
    );
  }
  private prepareMenuItems(workspaces: Workspace[]) {
    const items: MenuItem[] = workspaces.map(workspace => ({
      label: workspace.name,
      id: workspace.id,
      command: () => {
        this.state.workspaceSetCurrent(workspace);
        this.goto.workspace()
      }
    }));
    return items;
  }
}
