'use strict'
// 1行目に記載している 'use strict' は削除しないでください

const gameData = {
  player:{
    rpsSelect:3,  //0:グー 1:チョキ 2:パー
    dice:0,       //さいころの目
    HP:50
  },
  cpu:{
    rpsSelect:0,
    dice:0,
    HP:50
  }
}

const process = {
  // じゃんけんの出す手を決める
  // さいころの目を決める
  rpsSelector() { 
    gameData.cpu.rpsSelect = Math.floor(Math.random() * 3) + 1;
    gameData.cpu.dice = Math.floor(Math.random() * 6) + 1;
    gameData.player.dice = Math.floor(Math.random() * 6) + 1;
  },

  // じゃんけん勝敗判定
  // * @returns {number} 判定結果　0:あいこ 1:player勝ち 2:CPU勝ち

  rpsJudgment() {
    const player = gameData.player.rpsSelect;
    const cpu = gameData.cpu.rpsSelect;

    if (player === cpu) {
      return 0;
    } else if ((player === 1 && cpu === 2) || (player === 2 && cpu === 3) || (player === 3 && cpu === 1)) {
      this.damageCalculation("cpu");
      // gameData.cpu.HP -= gameData.player.dice;
      return 1;
    } else {
      // gameData.player.HP -= gameData.player.dice;
      this.damageCalculation("player");
      return 2;
    }
  },

  // ダメージ計算
  //@param {string} ダメージを受ける側

  damageCalculation(receiver) {
    if (receiver === "player") {
      gameData.player.HP -= gameData.cpu.dice;
    } else {
      gameData.cpu.HP -= gameData.player.dice;
    } 
  }

}

process.rpsSelector();
process.rpsJudgment();

console.log(gameData.player);
console.log(gameData.cpu);
