import { Sprite, SpriteSheet } from "kontra";
import { HealthBar } from "./health-bar";

export class Enemy {
  constructor(health, attack) {
    this.health = health;
    this.attack = attack;
    this.x = 1600
    this.y = 200
    this.sprite = [
      Sprite({
        x: this.x,
        y: this.y,
        width: 100,
        height: 200,
        color: "red",
      })
    ]
    this.healthBar = new HealthBar(this.health, this.health, this.x, this.y + 220);
  }
  draw() {
    this.sprite.forEach(sprite => {
      sprite.render();
    })
    this.healthBar.draw()
  }
  update() {
    this.sprite.forEach(sprite => {
      sprite.update();
    })
    this.healthBar.update()
  }
  damageEnemy(power) {
    this.health -= power;
    this.healthBar.updateHealth(this.health);
    if (this.health <= 0) {
      this.die()
    }
  }
  die() {

  }
}
