'use strict'

const gameData = {
  player: {
    rpsSelect:0,  //1:グー 2:チョキ 3:パー
    dice:0,       //さいころの目
    HP:50
  },
  cpu: {
    rpsSelect:0,
    dice:0,
    HP:50
  },
}

  
const process = {
  // じゃんけんの出す手を決める & さいころの目を決める
  rpsSelector() { 
    gameData.cpu.rpsSelect = Math.floor(Math.random() * 3) + 1;
    gameData.cpu.dice = Math.floor(Math.random() * 6) + 1;
    gameData.player.dice = Math.floor(Math.random() * 6) + 1;
  },

  // じゃんけん勝敗判定
  // * @returns {number} 判定結果　
  rpsJudgment() {
    const player = gameData.player.rpsSelect;
    const cpu = gameData.cpu.rpsSelect;

    if (player === cpu) {
      return "draw";
    } else if ((player === 1 && cpu === 2) || (player === 2 && cpu === 3) || (player === 3 && cpu === 1)) {
      return "player";
    } else {
      return "cpu";
    }
  },

  // ダメージ計算
  //@param {string} 勝った側
  //@returns {Boolean} HP判定結果　どちらかのHPが0:True 
  damageCalculation(winner) { 
    let attacker;
    let damager;
    let damaged;

    console.log(winner)
    if (winner === "cpu") {
      attacker = "cpu";
      damager = "player";
    } else if (winner === "player") {
      attacker = "player";
      damager = "cpu";
    } else {
      console.log("err");
    }

    const attackDamage = gameData[attacker]["dice"];     
    elementMessage.textContent = `${attacker}は${damager}に${attackDamage}のダメージを与えた`;

    gameData[damager]["HP"] -= attackDamage;
    damaged = gameData[damager]["HP"];

    console.log("att:",attacker," dam:",damager,damaged)
    
    if (damaged <= 0) {
      gameData[damager]["HP"] = 0;
      if (damager === "cpu") {
        elementCpuHp.textContent = `HP:${gameData[damager]["HP"]}`;
      } else {
        elementPlayerHp.textContent = `HP:${gameData[damager]["HP"]}`;
      }
      return true;

    } else {
      if (damager === "cpu") {
        elementCpuHp.textContent = `HP:${gameData[damager]["HP"]}`;
      } else {
        elementPlayerHp.textContent = `HP:${gameData[damager]["HP"]}`;
      }  
      return false;
    }
  },

}

const view = {
  //さいころの画像を変更
  diceShow() {
    const cpuDiceFileName = String.raw`images/dice${gameData.cpu.dice}.jpg`;
    //const cpuDiceFileName = String.raw`images/dice4.jpg`;
    elementCpuDice.src = cpuDiceFileName;
    
    const playerDiceFileName = String.raw`images/dice${gameData.player.dice}.jpg`;
    elementPlayerDice.src = playerDiceFileName;
  },

  //CPUのじゃんけん画像変更
  cpuJanShow() {
    elementCpuGame.style.visibility = "visible";
    const cpuJanFileName = String.raw`images/janken${gameData.cpu.rpsSelect}.png`;
    elementCpuJan.src = cpuJanFileName;
  },

  //じゃんけん選択表示
  playerJanShow() {
    elementPlayerJan1.style.visibility = "visible";
    elementPlayerJan2.style.visibility = "visible";
    elementPlayerJan3.style.visibility = "visible";
  }

}


const eventHandling ={
  //グーをクリックしたときの処理
  jan1Click(){
    gameData.player.rpsSelect = 1;
    elementPlayerJan2.style.visibility = "hidden";
    elementPlayerJan3.style.visibility = "hidden";
    main();
  },

  //チョキをクリックしたときの処理
  jan2Click(){
    gameData.player.rpsSelect = 2;
    elementPlayerJan1.style.visibility = "hidden";
    elementPlayerJan3.style.visibility = "hidden";
    main();
  },

  //パーをクリックしたときの処理
  jan3Click(){
    gameData.player.rpsSelect = 3;
    elementPlayerJan1.style.visibility = "hidden";
    elementPlayerJan2.style.visibility = "hidden";
    main();
  },

  //グーにカーソルを乗せたときの処理
  jan1MouseOver(){
    elementPlayerJan1.style.border = "solid 6px red";
  },  

  //チョキにカーソルを乗せたときの処理
  jan2MouseOver(){
    elementPlayerJan2.style.border = "solid 6px red";
  },

  //パーにカーソルを乗せたときの処理
  jan3MouseOver(){
    elementPlayerJan3.style.border = "solid 6px red";
  },

  //グーからカーソルを外したときの処理
  jan1MouseOut(){
    elementPlayerJan1.style.borderWidth = "0px";
  },  

  //チョキからカーソルを外したときの処理
  jan2MouseOut(){
    elementPlayerJan2.style.borderWidth = "0px";
  },

  //パーからカーソルを外したときの処理
  jan3MouseOut(){
    elementPlayerJan3.style.borderWidth = "0px";
  },

}


// 要素を取得
const elementCpuHp = document.querySelector("#cpu-hp");
const elementPlayerHp = document.querySelector("#player-hp");
const elementMessage = document.querySelector("#message");
const elementCpuDice = document.querySelector("#cpu-dice");
const elementPlayerDice = document.querySelector("#player-dice");
const elementPlayerGame = document.querySelector(".player-game");
const elementCpuGame = document.querySelector(".cpu-game");
const elementCpuJan = document.querySelector("#cpu-jan");
const elementPlayerJan1 = document.querySelector("#player-jan1");
const elementPlayerJan2 = document.querySelector("#player-jan2");
const elementPlayerJan3 = document.querySelector("#player-jan3");
const elementBtn = document.querySelector("#start");

//　イベント処理
elementBtn.addEventListener('click', () => {
  elementBtn.style.visibility = "hidden";
  start()
});

elementPlayerJan1.addEventListener('click', eventHandling.jan1Click);
elementPlayerJan2.addEventListener('click', eventHandling.jan2Click);
elementPlayerJan3.addEventListener('click', eventHandling.jan3Click);
elementPlayerJan1.addEventListener('mouseover', eventHandling.jan1MouseOver);
elementPlayerJan2.addEventListener('mouseover', eventHandling.jan2MouseOver);
elementPlayerJan3.addEventListener('mouseover', eventHandling.jan3MouseOver);
elementPlayerJan1.addEventListener('mouseout', eventHandling.jan1MouseOut);
elementPlayerJan2.addEventListener('mouseout', eventHandling.jan2MouseOut);
elementPlayerJan3.addEventListener('mouseout', eventHandling.jan3MouseOut);


function start(jan = "jan") { 
  //CPUじゃんけんを消す
  elementCpuGame.style.visibility = "hidden";
  console.log(jan)
  if (jan === "drow") {
    elementMessage.textContent = "あいこで";
  } else {
    elementMessage.textContent = "じゃんけん";
  }
  
  //サイコロを振る&表示
    process.rpsSelector();
    console.log(gameData.cpu.dice,gameData.player.dice);
    view.diceShow();
  
  //じゃんけんメッセージを表示
  elementMessage.style.visibility = "visible";
  elementPlayerGame.style.visibility = "visible";
  view.playerJanShow();
}

function main() {
  view.cpuJanShow();
  elementMessage.textContent = "ぽん";

  setTimeout(function () {
    judge();
  }, 2000);
}

function judge() {
     
  let winner = process.rpsJudgment();

  if (winner === "draw") {
     //あいこの場合
    start("drow");
  } else {
    //負けまたは勝ち
    const isHpZero = process.damageCalculation(winner);
  
    //終了判定
    if (isHpZero === false) {
      start();
    } else {
      elementMessage.textContent = `${winner}の勝ちです`;
    }

  }
}
