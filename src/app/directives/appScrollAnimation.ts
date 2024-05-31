import { Directive, ElementRef, Renderer2, OnInit, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[appScrollAnimation]',
    standalone: true,
})
export class ScrollAnimationDirective implements OnInit {
    @Input() rootMargin!: string; 

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        const options = {
            root: null,
            // rootMargin: this.rootMargin || '200px', 
            threshold: 0.5
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.renderer.addClass(this.el.nativeElement, 'fadeIn'); 
                    observer.unobserve(entry.target);
                }else {
                    this.renderer.removeClass(this.el.nativeElement, 'fadeIn');
                }
            });
        }, options);

        observer.observe(this.el.nativeElement);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 320 && screenWidth < 500) {
            this.rootMargin = '50px'; 
        } else {
            this.rootMargin = '200px'; 
        }
    }
}
