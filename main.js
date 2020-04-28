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
  }

  initGUI() {
    this.div.innerHTML = '<h1>' + this.div.id + '</h1>';
  }

  strToCap(s) {
    return s.split` `.map( w => {
      return w[0].toUpperCase() + w.substr(1);
    }).join` `;
  }

}

class Prestige extends Game {
}

class Prestige2 extends Game {
}

class Prestige3 extends Game {
}

class Metaprestige extends Game {
  initGUI() {
    let html = '';

    //header
    html += `
<div>
  <h1><span id='coinsM'>0</span> coins</h1>
  <h3><span id='gainM'>0</span> coins/second</h3>
  <div><span id='bonus_taken'>0</span>x from other games</div>
  <div><span id='bonus_given'>0</span>x to other games</div>
</div>
    `;

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
      html += `<td>${this.strToCap(pnames[i] + 'metaprestige')}</td>`;
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

const games = [];

games.push(new Metaprestige('game0'));
games.push(new Prestige('game1'));
games.push(new Prestige2('game2'));
games.push(new Prestige3('game3'));

const main = new Main(games);
