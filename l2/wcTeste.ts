/// <mls shortName="wcTeste" project="102027" enhancement="_100000_enhancementLit" />

 import { html, LitElement } from 'lit'; 
 import { customElement, property } from 'lit/decorators.js';

@customElement('wc-teste-102027')
 export class WcTeste100000 extends LitElement {
    
     @property() name: string = 'Somebody';

     render() {
         return html`<p> Hello, ${ this.name } !</p>`;
     }
 }
