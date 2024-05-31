import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
    selector: '[deckRotation]',
    standalone: true,
})
export class deckRotationDirective implements OnInit {

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        const options = {
            root: null,
            threshold: 1
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.renderer.addClass(this.el.nativeElement, 'deck-rotate'); 
                    observer.unobserve(entry.target);
                }else {
                    this.renderer.removeClass(this.el.nativeElement, 'deck-rotate');
                }
            });
        }, options);

        observer.observe(this.el.nativeElement);
    }

}
