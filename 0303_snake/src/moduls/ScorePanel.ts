// 定义 表示记分牌的类
class ScorePanel {
  score = 0; // 分数
  level = 1; // 等级

  // 分数和等级所在的元素，在构造函数中进行初始化
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  // 设置一个变量限制等级
  maxLevel: number;
  // 设置一个变量表示多少分时升级
  upScore: number;

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  // 设置一个加分的方法
  addScore() {
    this.scoreEle.innerHTML = ++this.score + ''

    // 判断分数是多少，分数是10的倍数才会升一级
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }

  // 提升等级的方法
  levelUp() {
    // 设置等级
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + ''
    }
  }
}
export default ScorePanel

// 测试代码
// const scorePanel = new ScorePanel(100, 2)
// for (let i = 0; i < 400; i++) {
//   scorePanel.addScore()
// }