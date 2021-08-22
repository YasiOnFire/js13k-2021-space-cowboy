import { Sprite, Text } from "kontra";

export class HealthBar {
  constructor(current, max, x, y) {
    this.max = max;
    this.current = current;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.sprite = [
      Sprite({
        x: this.x,
        y: this.y,
        width: this.width,
        height: 20,
        color: "black",
      }),
      Sprite({
        x: this.x + 4,
        y:  this.y + 4,
        width: this.width - 8,
        height: 20 - 8,
        color: "green",
      }),
      Text({
        text: `${this.current}`,
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
    this.sprite.forEach(sprite => {
      sprite.render();
    })
  }
  update() {
    this.sprite.forEach(sprite => {
      sprite.update();
    })
  }
  updateHealth(current) {
    this.current = current;
    this.sprite[1].width = (this.current / this.max) * (this.width - 8);
    this.sprite[2].text = `${this.current}`;
    if (this.sprite[1].width <= 10) {
      this.sprite[1].color = "red";
    }
  }
}
