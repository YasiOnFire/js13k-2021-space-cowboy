import { Sprite, SpriteSheet } from "kontra";
import { HealthBar } from "./health-bar";

export class Hero {
  constructor(health, attack, spriteSheet, x, y, playerState) {
    this.health = health;
    this.attack = attack;
    this.x = x
    this.y = y
    this.spriteSheet = SpriteSheet({
      image: spriteSheet,
      frameWidth: 23,
      frameHeight: 10,
      animations: {
        idle: {
          frames: '0..0',
          frameRate: 2
        },
        hurt: {
          frames: '0..4',
          frameRate: 12
        },
        attack: {
          frames: '5..6',
          frameRate: 6
        }
      }
    });
    this.sprite = Sprite({
      x: this.x,
      y: this.y, 
      width: 575,
      height: 250,
      animations: this.spriteSheet.animations
    })
    this.playerState = playerState || 'idle'
    this.healthBar = new HealthBar(this.health, this.health, this.x + 335, this.y + 270);
  }
  draw() {
    this.sprite.render()
    this.healthBar.draw()
  }
  update() {
    this.sprite.playAnimation(this.playerState)
    this.sprite.update()
    this.healthBar.update()
  }
  damageHero(power) {
    this.setPlayerState('hurt');
    setTimeout(() => {
      this.health -= power;
      this.healthBar.updateHealth(this.health);
      this.setPlayerState('idle');
    }, 400);
    if (this.health <= 0) {
      this.die()
    }
  }
  setPlayerState(state) {
    this.playerState = state
  }
  die() {

  }
}
