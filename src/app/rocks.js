import { Sprite } from "kontra";

export class Rocks {
  constructor() {
    this.rocks = []
    this.create()
  }
  r (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
  getRock(x, y) {
    return [
      Sprite({
        x,
        y,
        color: '#ddd',
        width: 90,
        height: 40,
      }),
      Sprite({
        x,
        y,
        color: '#aaa',
        width: 40,
        height: 40,
      }),
      Sprite({
        x: x + 30,
        y: y - 30,
        color: '#ddd',
        width: 60,
        height: 30,
      }),
      Sprite({
        x: x + 30,
        y: y - 30,
        color: '#aaa',
        width: 30,
        height: 30,
      }),
      Sprite({
        x: x + 90,
        y: y + 20,
        color: '#ddd',
        width: 10,
        height: 20,
      }),
      Sprite({
        x: x - 20,
        y: y + 30,
        color: 'rgba(102, 102, 102,.5)',
        width: 20,
        height: 10,
      }),
    ]
  }
  create() {
    for (let i = 0; i < 4; i++) {
      const randY = this.r(220, 280)
      this.rocks.push(this.getRock(100 * 2 * i * i, randY))
    }
  }
  draw() {
    this.rocks.forEach(rock => {
      rock.forEach(element => {
        element.render()
      })
    })
  }
}
