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
            rootMargin: this.rootMargin || '200px', 
            threshold: 0.1 
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.renderer.addClass(this.el.nativeElement, 'fadeIn'); 
                }else {
                    this.renderer.removeClass(this.el.nativeElement, 'fadeIn');
                }
            });
        }, options);

        observer.observe(this.el.nativeElement);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        // Get the current screen width (viewport width)
        const screenWidth = window.innerWidth;

        // Update rootMargin based on screen size
        if (screenWidth === 320) {
            this.rootMargin = '50px'; // Set a different value for 320px screen width
        } else {
            this.rootMargin = '200px'; // Use the default value for other screen sizes
        }

        // Reinitialize the IntersectionObserver with the updated rootMargin
        // (You might need to handle observer disconnect/reconnect if needed)
        // ...
    }
}
