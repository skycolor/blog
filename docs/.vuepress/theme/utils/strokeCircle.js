let colors = ['#FFE300', '#FF7494', '#00E6FF', '#89FF47']
class Circle {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.r = Math.random() * 10 + 10;
    this.v = Math.random()
    this.step = 60
    this.ctx = ctx
    // 颜色的取值范围
    this.color = colors[Math.floor((Math.random() * colors.length))]
    //随机方向
    this.dx = Math.random() * 7 - 3.5;
    this.dy = Math.random() * 7 - 3.5;
  }
  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
    this.ctx.closePath();
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.r -= this.v;
    this.step--
  }
}
export default Circle