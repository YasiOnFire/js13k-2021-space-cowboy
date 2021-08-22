import { getCanvas, getContext, Sprite, Text, track } from "kontra";

export class Popup {
  constructor(title, button = {}) {
    this.title = title
    this.sprite = [
      Sprite({
        x: 0,
        y: 0,
        width: 1920,
        height: 1080,
        color: 'rgba(21,22,24,0.9)',
      }),
      Text({
        text: `${this.title}`,
        font: '90px "8_bit_1_6"',
        color: 'white',
        x: 1920 / 2,
        y: 240,
        anchor: { x: 0.5, y: 0.5 },
        textAlign: 'center',
      }),
      Text({
        text: button.text || 'START',
        font: '60px "8_bit_1_6"',
        color: 'white',
        x: 1920 / 2,
        y: (1080 / 2) + 100,
        anchor: { x: 0.5, y: 0.5 },
        textAlign: 'center',
        onDown: button.callback,
        onOver: function() {
          this.color = 'red';
        },
        onOut: function() {
          this.color = 'white';
        },
      })
    ]
  }
  draw() {
    this.sprite.forEach(sprite => {
      if (sprite.onDown) {
        track(sprite)
      }
      sprite.render();
    })
  }
  update() {
    this.sprite.forEach(sprite => {
      sprite.update();
    })
  }
}
