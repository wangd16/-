class Snake {
  // 表示蛇头的元素
  head: HTMLElement
  // 蛇的身体(包括蛇头)  HTMLCollection 是 HTML 元素的集合。
  bodies: HTMLCollection
  // 获取蛇的容器
  element: HTMLElement

  constructor() {
    this.element = document.getElementById('snake')!
    // querySelector只会取第一个
    this.head = document.querySelector('#snake > div') as HTMLElement
    this.bodies = document.getElementById('snake')!.getElementsByTagName('div')
  }

  // 获取蛇的X轴坐标（蛇头）
  get X() {
    return this.head.offsetLeft
  }
  // 获取蛇的Y轴坐标（蛇头）
  get Y() {
    return this.head.offsetTop
  }

  // 设置蛇头的坐标
  set X(value: number) {
    console.log(value, " + ", this.X)
    // 如果新值和旧值相同，则直接返回不再修改
    if (this.X === value) {
      return
    }

    // X 的值合法范围0-290之间
    if (value < 0 || value > 290) {
      // 进入判断说明蛇撞墙了，抛出异常
      throw new Error('蛇撞墙了！')
    }

    // 修改X时，是在修改水平坐标，蛇在左右移动，
    // 蛇在向左移动式，不能向右掉头，反之亦反
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      // 如果发生了掉头，让蛇向反方向继续移动
      /**
       * 
       * 
       * */
      if (value > this.X) {
        // 如果新值 value 大于旧值 X，则说嘛蛇在向右走，此时发生掉头，应该使蛇继续向左走
        // 蛇往左走时，想掉头往右走，此时 value > this.X 所以要让蛇一直左走，就是 - 10
        value = this.X - 10
      } else {
        // 蛇往右走时，想掉头往左走，此时 value < this.X 所以要让蛇一直往右走 是 +10
        value = this.X + 10
      }
    }


    // 移动身体
    this.moveBody()

    this.head.style.left = value + 'px'

    this.checkHeadBody()
  }
  set Y(value: number) {
    if (this.Y === value) {
      return
    }

    // Y 的值合法范围0-290之间
    if (value < 0 || value > 290) {
      // 进入判断说明蛇撞墙了
      throw new Error('蛇撞墙了！')
    }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      // console.log("水平方向发生了掉头");
      // 如果发生了掉头，让蛇向反方向继续移动
      if (value > this.Y) {
        // 如果新值 value 大于旧值 X，则说嘛蛇在向右走，此时发生掉头，应该使蛇继续向左走
        value = this.Y - 10
      } else {
        value = this.Y + 10
      }
    }

    // 移动身体
    this.moveBody()

    this.head.style.top = value + 'px'

    this.checkHeadBody()
  }

  // 设置蛇增加身体的方法
  addBody() {
    this.element.insertAdjacentHTML('beforeend', "<div></div>")
  }

  // 添加一个蛇身体移动的方法
  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';

    }
  }

  // 检查蛇头是否撞到自己的方法
  checkHeadBody() {
    // 获取所有的身体，检查是否和蛇头的坐标发生重叠
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = (this.bodies[i] as HTMLElement)
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        // 进入判断说明蛇头撞到了身体，游戏结束
        throw new Error('撞到了自己！')
      }
    }

  }

}

export default Snake