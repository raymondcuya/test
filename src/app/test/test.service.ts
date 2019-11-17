import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}
export const ScriptStore: Scripts[] = [
  { name: 'jquery', src: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js' }
];


@Injectable({
  providedIn: 'root'
})
export class TestService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(shadowDom: any, ...scripts: string[]) {
    var promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(shadowDom, script)));
    return Promise.all(promises);
  }

  loadScript(shadowDom: any, name: string) {
    return new Promise((resolve, reject) => {
      //resolve if already loaded
      if (this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
      else {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        script.onload = () => {
          this.scripts[name].loaded = true;
          resolve({ script: name, loaded: true, status: 'Loaded' });
        };
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        // document.getElementsByTagName('head')[0].appendChild(script);
        shadowDom.appendChild(script);
      }
    });
  }

}
