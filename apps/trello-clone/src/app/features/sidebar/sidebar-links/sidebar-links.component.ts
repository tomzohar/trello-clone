import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {MenuItem} from '@ui-components';
import {Theme} from '@trello-clone/trello-interface';

@Component({
  selector: 'app-sidebar-links',
  templateUrl: './sidebar-links.component.html',
  styleUrls: ['./sidebar-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarLinksComponent implements AfterViewInit {
  @Input() menuItems: MenuItem[] | null = [];
  @Input() theme: Theme | undefined;
  @ViewChild('links') links: ElementRef | undefined;
  linkStyles = {};
  ngAfterViewInit(): void {
    this.initStyles();
  }
  initStyles() {
    this.setLinksStyle({
      color: this.theme?.sidebarText,
      backgroundColor: 'initial'
    });

  }
  onItmeClick(item: MenuItem) {
    if (item.command) item.command();
  }
  onLinkHover(index: number) {
    this.setSingleLinkSyle({
      backgroundColor: this.theme?.sidebarLinksHover
    }, index);
  }
  onLinkBlur(index: number) {
    this.setSingleLinkSyle({
      backgroundColor: 'initial'
    }, index);
  }
  setLinksStyle(styles: object) { // set styles to all links
    if (this.links) {
      const collection = (this.links.nativeElement.children as HTMLCollection);
      let i = 0;
      while (i < collection.length) {
        const parent = collection.item(i) as HTMLDivElement;
        const element = parent.children.item(0) as HTMLAnchorElement;
        Object.assign(element.style, styles);
        i++;
      }
    }
  }
  setSingleLinkSyle(styles: object, index: number) {
    if (this.links) {
      const collection = this.links.nativeElement.children as HTMLCollection;
      const element = collection.item(index)?.children.item(0) as HTMLAnchorElement;
      Object.assign(element.style, styles);
    }
  }

}
