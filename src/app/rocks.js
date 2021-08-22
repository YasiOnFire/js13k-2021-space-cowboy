import { Sprite as s } from "kontra";
export class Rocks {
  constructor() {
    this.r = []
    for (let i = 0; i < 4; i++) {
      let randY = this.ra(220, 280)
      this.r.push(this.get(100 * 2 * i * i, randY))
    }
  }
  ra(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
  get(x, y) {
    return [
      s({
        x,
        y,
        color: '#ddd',
        width: 90,
        height: 40,
      }),
      s({
        x,
        y,
        color: '#aaa',
        width: 40,
        height: 40,
      }),
      s({
        x: x + 30,
        y: y - 30,
        color: '#ddd',
        width: 60,
        height: 30,
      }),
      s({
        x: x + 30,
        y: y - 30,
        color: '#aaa',
        width: 30,
        height: 30,
      }),
      s({
        x: x + 90,
        y: y + 20,
        color: '#ddd',
        width: 10,
        height: 20,
      }),
      s({
        x: x - 20,
        y: y + 30,
        color: 'rgba(102, 102, 102,.5)',
        width: 20,
        height: 10,
      }),
    ]
  }
  draw() {
    this.r.forEach(r => {
      r.forEach(e => {
        e.render()
      })
    })
  }
}
