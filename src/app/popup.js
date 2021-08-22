import { Sprite, Text as t, track } from "kontra";

export class Popup {
  constructor(title, button = {}) {
    this.title = title
    this.s = [
      Sprite({
        x: 0,
        y: 0,
        width: 1920,
        height: 1080,
        color: 'rgba(21,22,24,0.9)',
      }),
      t({
        text: `${this.title}`,
        font: '90px "8_bit_1_6"',
        color: 'white',
        x: 1920 / 2,
        y: 240,
        anchor: { x: 0.5, y: 0.5 },
        textAlign: 'center',
      }),
      t({
        text: button.text,
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
    this.s.forEach(s => {
      if (s.onDown) {
        track(s)
      }
      s.render();
    })
  }
  update() {
    this.s.forEach(s => {
      s.update();
    })
  }
}
