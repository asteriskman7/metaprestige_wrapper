'use strict';

const pnames = 'nano,micro,mini,small ,partial ,full ,multi,hyper,ultra,final '.split`,`;
const roman = 'coins,I,II,III,IV,V,VI,VII,VIII,IX,X'.split`,`;

class Game {
  constructor(divName, defaultSave) {
    this.div = document.getElementById(divName); 
    this.divName = divName;
    this.defaultSave = defaultSave;
    
    this.load();

  }

  save() {
    let saveData;
    if (localStorage.MPW) {
      saveData = JSON.parse(localStorage.MPW);      
    } else {
      saveData = {};
    }

    saveData[this.divName] = this.data;

    localStorage.MPW = JSON.stringify(saveData);
  }

  load() {
    let saveData;
    if (localStorage.MPW) {
      saveData = JSON.parse(localStorage.MPW);
      if (saveData[this.divName]) {
        this.data = saveData[this.divName];
      }
    }
    if (!this.data) {
      this.data = this.defaultSave;
    }
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


  getMetaBonus() {
    return games[0].multiForOthers;
  }

}


class Prestige extends Game {
  constructor(divName, defaultSave, meta) {
    super(divName, defaultSave);
    this.meta = meta;
    this.initGUI();
    this.ecoins = document.getElementById(`coins_${this.divName}`);
    this.egain = document.getElementById(`gain_${this.divName}`);
    this.ecost = [];
    this.ea = [];
    this.emul = [];
    this.ebtn = [];

    for (let i = 0; i < 10; i++) {
      this.ecost.push(document.getElementById(`tier${i+1}cost_${this.divName}`));
      this.ea.push(document.getElementById(`tier${i+1}a_${this.divName}`));
      this.emul.push(document.getElementById(`tier${i+1}mul_${this.divName}`));
      const btn = document.getElementById(`tier${i+1}btn_${this.divName}`);
      this.ebtn.push(btn);
      btn.onclick = () => {this.activatePrestige(i);};
    }

    this.draw();

    setInterval(() => {
      this.update();
      this.draw();
    }, 1000);
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
      html += `<td><span id='tier${i+1}cost_${this.divName}'>0</span>x Tier ${roman[i]}</td>`;
      html += `<td id='tier${i+1}a_${this.divName}'>0</td>`;
      html += `<td id='tier${i+1}mul_${this.divName}'>x1</td>`;
      html += `<td><button id='tier${i+1}btn_${this.divName}'>Activate</button></td>`;
      html += '</tr>';
    });

    html += '</table>';

    this.div.innerHTML = html;
  }

  getGain() {
    let gain = 1;
    this.data.prestiges.forEach(el => {
      gain *= 1+el;
    });
    return gain * this.getMetaBonus();
  }

  getRequirement(id) {
    if (id === 0) {
      return Math.floor(Math.pow(1.5, this.data.prestiges[0])*10);
    } else {
      return Math.pow(id+1, this.data.prestiges[id]+1);
    }
  }

  canActivatePrestige(id) {
    if (id === 0) {
      return (this.data.coins >= this.getRequirement(0));
    } else {
      return (this.data.prestiges[id - 1] >= this.getRequirement(id));
    }
  }

  activatePrestige(id) {
    if (this.canActivatePrestige(id)) {
      this.data.coins = 0;
      for (let i = 0; i < id; i++) {
        this.data.prestiges[i] = 0;
      }
      this.data.prestiges[id]++;
    }
    this.draw();
  }

  update() {
    const curTime = (new Date()).getTime();
    const deltaTime = (this.data.lastTime === undefined) ? 1 : ((curTime - data.lastTime) / 1000);
    this.data.lastTime = curTime;
    this.data.coins += this.getGain() * deltaTime;
    this.save();
  }

  draw() {
    this.ecoins.innerHTML = Math.floor(this.data.coins);
    this.egain.innerHTML = this.getGain();
    this.data.prestiges.forEach( (el, i) => {
      this.ecost[i].innerHTML = this.getRequirement(i);
      this.ea[i].innerHTML = el;
      this.emul[i].innerHTML = 'x' + (el + 1);
      this.ebtn[i].disabled = !this.canActivatePrestige(i);
    });

  }
    
}

class Prestige2 extends Game {
  constructor(divName, defaultSave) {
    super(divName, defaultSave);
    this.initGUI();
  }

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
  constructor(divName, defaultSave) {
    super(divName, defaultSave);
    this.initGUI();
  }

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

games.push(new Prestige('metaGame', 
  {coins: 0, prestiges: [0,0,0,0,0,0,0,0,0,0], tokens: 0, multiForOthers: 1}, true));
games.push(new Prestige('prestigeGame', 
  {coins: 0, prestiges: [0,0,0,0,0,0,0,0,0,0]}, false));

const p2save = {
  coins: 0,
  prestiges: (()=>{
    let a = [];
    for (let x = 0; x < 10; x++) {
      a[x] = [];
      for (let y = 0; y < 10; y++) {
        a[x][y] = 0;
      }
    }
    return a;
  })()
};
games.push(new Prestige2('prestige2Game', p2save));

const p3save = {
  coins: 0,
  prestiges: (()=>{
    let a = [];
    for (let x = 0; x < 10; x++) {
      a[x] = [];
      for (let y = 0; y < 10; y++) {
        a[x][y] = [];
        for (let z = 0; z < 10; z++) {
          a[x][y][z] = 0;
        }
      }
    }
    return a;
  })()
};
games.push(new Prestige3('prestige3Game', p3save));
