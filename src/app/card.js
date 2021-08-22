import { Sprite as s, Text as t, SpriteSheet } from "kontra"

export class Card {
  constructor(x, y, a) {
    this._x = x
    this._y = y
    this._a = a._a
    this.cost = a.cost
    this.power = a.power
    this.value = a.value
    this.ss = SpriteSheet({
      image: a._a,
      frameWidth: 6,
      frameHeight: 6,
      animations: {
        defense: {
          frames: '0..0',
          frameRate: 0
        },
        attack: {
          frames: '1..1',
          frameRate: 0
        },
      }
    })
  }
  getCard() {
    const icon = s({
      x: this._x + 100,
      y: this._y + 200,
      width: 100,
      height: 100,
      anchor: {x: 0.5, y: 0.5},
      animations: this.ss.animations
    })
    if (this.power === 'a') {
      icon.playAnimation('attack')
    } else {
      icon.playAnimation('defense')
    }
    return [
      s({
        x: this._x,
        y: this._y,
        color: '#fff',
        width: 200,
        height: 300,
      }),
      s({
        x: this._x - 20,
        y: this._y + 20,
        color: '#fff',
        width: 240,
        height: 260,
      }),
      s({
        x: this._x + 50,
        y: this._y + 60,
        color: '#ffc363',
        radius: 40,
        render: function() {
          this.context.fillStyle = this.color
      
          this.context.beginPath()
          this.context.arc(0, 0, this.radius, 0, 2  * Math.PI)
          this.context.fill()
        }
      }),
      icon,
      t({
        text: this.cost,
        font: '70px "8_bit_1_6"',
        color: 'black',
        x: this._x +  30,
        y: this._y + 10,
        textAlign: 'center',
      }),
      t({
        text: this.value,
        font: '40px "8_bit_1_6"',
        color: 'black',
        x: this._x +  150,
        y: this._y + 210,
        textAlign: 'center',
      })
    ]
  }
  draw() {
    this.getCard().forEach(e => {
      e.render()
    })
  }
  update() {
    this.getCard().forEach(e => {
      e.update()
    })
  }
}
