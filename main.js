'use strict';

const pnames = 'nano,micro,mini,small ,partial ,full ,multi,hyper,ultra,final '.split`,`;
const roman = 'coins,I,II,III,IV,V,VI,VII,VIII,IX,X'.split`,`;

class Main {
  constructor(games) {
    this.games = games;  
    this.initGUI();
  }

  update() {
  }

  initGUI() {
    this.games.forEach( g => {
      g.initGUI();
    });
  }
}

class Game {
  constructor(divName) {
    this.div = document.getElementById(divName); 
    this.divName = divName;
  }

  initGUI() {
    let html = '';

    html += `
<div>
  <h1><span id='coins_${this.divName}'>0</span> coins</h1>
  <h3><span id='gain_${this.divName}'>0</span> coins/second</h3>
`;

    this.div.innerHTML = html; 
  }

  strToCap(s) {
    return s.split` `.map( w => {
      return w[0].toUpperCase() + w.substr(1);
    }).join` `;
  }

}


class Prestige extends Game {
  constructor(divName, meta) {
    super(divName);
    this.meta = meta;
  }

  initGUI() {
    Game.prototype.initGUI.call(this);
    let html = this.div.innerHTML;

    //header

    if (this.meta) {
      html += `
  <div><span id='bonus_taken'>0</span>x from other games</div>
  <div><span id='bonus_given'>0</span>x to other games</div>
`;
    }

    html += ` </div> `;

    //table header
    const columns = 'Tier,Name,Requirement,Amount,Effect'.split`,`;
    html += `
<table>
  <tr>
`;

    columns.forEach( c => {
      html += `<th>${c}</th>`;
    });

    html += '</tr>';

    pnames.forEach( (n, i) => {
      html += '<tr>';
      html += `<td>${roman[i + 1]}</td>`;
      html += `<td>${this.strToCap(pnames[i] + (this.meta ? 'meta' : '') + 'prestige')}</td>`;
      html += `<td><span id='tier${i+1}costM'>0</span>x Tier ${roman[i]}</td>`;
      html += `<td id='tier${i+1}aM'>0</td>`;
      html += `<td id='tier${i+1}mulM'>x1</td>`;
      html += `<td><button id='tier${i+1}btnM'>Activate</button></td>`;
      html += '</tr>';
    });

    html += '</table>';

    this.div.innerHTML = html;
  }
}

class Prestige2 extends Game {
  initGUI() {
    Game.prototype.initGUI.call(this);
    let html = this.div.innerHTML;

    html += `<table>`;

    for (let row = 0; row < 10; row++) {
      html += '<tr>';

      for (let col = 0; col < 10; col++) {
        html += `<td><button id='tier${row}${col}' class='btier'>(${row},${col}) x0</button></td>`;
      }

      html += '</tr>';
    }

    html += `</table>`;

    this.div.innerHTML = html;
  }
}

class Prestige3 extends Game {
  initGUI() {
    Game.prototype.initGUI.call(this);
    let html = this.div.innerHTML;

    html += `<h3><button id='layer_prev'>-</button>Layer: <span id='layer'>0</span><button id='layer_next'>+</button></h3>`;


    html += `<table>`;

    for (let row = 0; row < 10; row++) {
      html += '<tr>';

      for (let col = 0; col < 10; col++) {
        html += `<td><button id='tier${row}${col}z' class='btier'>(${row},${col},0) x0</button></td>`;
      }

      html += '</tr>';
    }

    html += `</table>`;

    this.div.innerHTML = html;
  }
}

const games = [];

games.push(new Prestige('game0', true));
games.push(new Prestige('game1', false));
games.push(new Prestige2('game2'));
games.push(new Prestige3('game3'));

const main = new Main(games);
