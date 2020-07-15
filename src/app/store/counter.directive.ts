import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[counterOf]'
})
export class CounterDirective {

  @Input('counterOf') set counter(num: number) {
    this.viewContainer.clear();
    for (let i = 0; i < num; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef, new CounterDirectiveContext(i + 1));
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}

class CounterDirectiveContext {
  constructor(public $implicit: any) { }
}
