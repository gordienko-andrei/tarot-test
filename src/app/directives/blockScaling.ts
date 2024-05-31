import { Directive, ElementRef, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive({
  selector: '[blockScaling]',
  standalone: true,
})
export class blockScalingDirective implements OnInit {
  isSmallScreen: boolean | undefined;
 

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    const options = {
        root: null,
        threshold: 0.1
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
                  this.renderer.addClass(this.el.nativeElement, 'block_scale');
                } else {
                  this.renderer.removeClass(this.el.nativeElement, 'block_scale');
                }
            });
        }
      });
    },options);

    
    observer.observe(this.el.nativeElement);
  }
}
