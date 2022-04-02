import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { List } from 'src/app/core/interface/list.interface';
import { Icons } from 'src/app/ui-components/button/icon/icons';
import { Card } from './../../core/interface/card.interface';
import { ListCardPreviewComponent } from './../../ui-components/list-card-preview/list-card-preview.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  @Input() list!: List;
  @Output() createCard: EventEmitter<Partial<Card>> = new EventEmitter();
  Icons = Icons;
  createMode: boolean = false;
  newCardName: FormControl = new FormControl('');
  constructor() { }
  ngOnInit(): void {
  }
  onAddCard() { this.createMode = true; }
  onCancel() { this.createMode = false; }
  onSubmit() {
    const card: Partial<Card> = {
      listID: this.list.id,
      name: this.newCardName.value,
      position: this.list.cards.length,
    };
    this.createCard.emit(card);
    this.createMode = false;
  }
  onDrop(event: CdkDragDrop<Card[]>) {
    moveItemInArray(this.list.cards, event.previousIndex, event.currentIndex);
  }
  getHeight(element: ListCardPreviewComponent): string {
    const height = element.elementRef.nativeElement.parentElement.offsetHeight;
    return `${height}px`;
  }
}
