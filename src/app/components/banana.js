import riot from 'riot';
import componentFactory from '../component-factory';

import test from './test';

componentFactory.createComponent('banana', `

 <h1>-=We sell bananas=- :</h1>
  <div>
    <p each="{ data }">{name}</p>
  </div>
  <div>
      <test message="{text1}"></test>
  </div>

  <p each="{ data }">{name}</p>
  <div>
    <test message="{text2}"></test>
  </div>

 <style>
     banana h1 {
         color: yellow;
     }
     banana p {
         color: #eeff00;
     }
 </style>
 `,
 function(opts) {
    this.text1 = "LOOP PROTECTED BY DIV";
    this.text2 = "LOOP NOT PROTECTED BY DIV";
    this.data = [{name: 'One'}, {name: 'Two'}, {name: 'Three'}]
    this.condition = true;
});


