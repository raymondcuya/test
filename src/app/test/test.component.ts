import { Component, OnInit, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { TestService } from './test.service';

declare var $: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TestComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {


  }
  loadAPI: Promise<any>;

  shadowRoot: DocumentFragment = this.element.nativeElement.shadowRoot;

  constructor(private element: ElementRef, private test: TestService) {
    // this.loadScript('https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js');

  }

  ngOnInit() {
    this.test.load(this.shadowRoot, 'jquery').then(data => {
      console.log('script loaded ', data);
      $("p", this.shadowRoot).html("Hello from shadow dom!");
    }).catch(error => console.log(error));

  }

  public loadScript(url: string) {
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    this.shadowRoot.appendChild(script);
  }

}
