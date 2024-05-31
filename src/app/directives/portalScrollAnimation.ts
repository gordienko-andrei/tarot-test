import { Directive, ElementRef, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive({
  selector: '[portalScrollAnimation]',
  standalone: true,
})
export class PortalScrollAnimationDirective implements OnInit {
  isSmallScreen: boolean | undefined;
 

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    const options = {
        root: null,
        threshold: 0.3
    } 

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            this.breakpointObserver.observe([
                Breakpoints.XSmall,
                Breakpoints.Small
              ]).subscribe(result => {
                this.isSmallScreen = result.matches;
                if (this.isSmallScreen) {
                  this.renderer.addClass(this.el.nativeElement, 'animated-card-mobile');
                } else {
                  this.renderer.addClass(this.el.nativeElement, 'animated-card');
                }
            });
        }
      });
    },options);

    
    observer.observe(this.el.nativeElement);
  }
}
