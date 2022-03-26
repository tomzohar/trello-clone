import { Icons } from './../button/icon/icons';
import { DropdownOption } from '../../core/interface/dropdown-option.interface';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() options: DropdownOption[] = [];
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('input') input!: ElementRef;
  selected!: DropdownOption;
  Icons = Icons;
  touched = false;
  disabled = false;
  onChange = (value: DropdownOption) => { };
  onTouched = () => { };
  constructor() { }
  writeValue(value: DropdownOption): void {
    this.selected = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onSelect(option: DropdownOption) {
    this.markAsTouched();
    this.selected = option;
    this.onToggle();
    this.onChange(option.code);
  }
  onToggle() {
    this.dropdown.nativeElement.classList.toggle('open');
    this.input.nativeElement.classList.toggle('open');
  }
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
