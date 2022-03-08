// 引入其他类
import Snake from './Snake'
import Food from "./Food"
import ScorePanel from "./ScorePanel"

// 游戏控制器，控制其他的所有类
class GameControl {
  // 定义三个属性
  snake: Snake  // 蛇
  food: Food  // 食物
  scorePanel: ScorePanel  // 记分板

  // 创建一个属性来存储蛇的移动方向（也就是按键方向）
  direction: string = ''
  // 创建一个属性来记录游戏是否结束
  isLive = true;

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel(10, 2)

    this.init()
  }

  // 游戏的初始化方法，调用后游戏即开始
  init() {
    // 绑定键盘案件按下的事件
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    // 调用 run 方法，使蛇移动
    this.run();
  }

  /**
   * ArrowUp
   * ArrowDown
   * ArrowLeft
   * ArrowRight
   */

  // 创建一个键盘按下的响应函数
  keydownHandler(event: KeyboardEvent) {
    // 需要检查 event.key 的值是否合法（用户是否按了正确的按键）
    // 修改direction属性
    this.direction = event.key

  }

  // 创建一个控制蛇移动的方法
  run() {

    /**
     * 根据方向（this.direction）来使蛇的位置改变
     * 向上 top 减少
     * 向下 top 增加
     * 向左 left 减少
     * 向右 left 增加
     * */
    // 获取蛇现在的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        // 向上移动
        Y -= 10
        break;
      case "ArrowDown":
      case "Down":
        // 向下移动
        Y += 10
        break;
      case "ArrowLeft":
      case "Left":
        // 向在移动
        X -= 10
        break;
      case "ArrowRight":
      case "Right":
        // 向右移动
        X += 10
        break;
    }

    // 检查蛇吃否吃到了食物
    this.checkEat(X, Y)

    // 修改蛇的X和Y
    try {
      this.snake.X = X;
      this.snake.Y = Y
    } catch (e: any) {
      // 进入catch，说明出现了异常，游戏结束，他拿出提示信息
      alert(e.message + ' GAME OVER ')
      // 游戏结束将 isLive 设置为 false
      this.isLive = false
    }

    // 开启一个定时调用
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)

  }

  // 检测蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 吃到食物后改变食物的位置
      this.food.change()
      // 分数增加
      this.scorePanel.addScore()
      // 蛇要增加一节
      this.snake.addBody()
    }
  }


}

export default GameControl