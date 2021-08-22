import { Sprite as s, Text } from "kontra"

export class HealthBar {
  constructor(current, max, x, y) {
    this.max = max
    this.c = current
    this.x = x
    this.y = y
    this.w = 100
    this.s = [
      s({
        x: this.x,
        y: this.y,
        width: this.w,
        height: 20,
        color: "black",
      }),
      s({
        x: this.x + 4,
        y:  this.y + 4,
        width: this.w - 8,
        height: 20 - 8,
        color: "green",
      }),
      Text({
        text: `${this.c}`,
        font: '16px "8_bit_1_6"',
        color: 'white',
        x: this.x +  55,
        y: this.y + 7,
        anchor: { x: 0.5, y: 0.5 },
        textAlign: 'center',
      })
    ]
  }
  draw() {
    this.s.forEach(s => {
      s.render()
    })
  }
  update() {
    this.s.forEach(s => {
      s.update()
    })
  }
  updateHealth(current) {
    this.c = current
    this.s[1].width = (this.c / this.max) * (this.w - 8)
    this.s[2].text = `${this.c}`
    if (this.s[1].width <= 10) {
      this.s[1].color = "red"
    }
  }
}
