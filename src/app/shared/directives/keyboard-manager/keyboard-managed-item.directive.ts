import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appKeyboardManagedItem]'
})
export class KeyboardManagedItemDirective {
  @Output()
  public focused = new EventEmitter<void>();

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  /**
   * Wrapper for focusing DOM element
   */
  public focus(): void {
    this.elementRef.nativeElement.focus();
    this.focused.emit();
  }

  /**
   * Wrapper for checkin if DOM element is focused
   * @returns boolean
   */
  public isFocused(): boolean {
    return this.elementRef.nativeElement === document.activeElement;
  }
}
