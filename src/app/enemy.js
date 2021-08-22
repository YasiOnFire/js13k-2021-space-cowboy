import { emit, Sprite, SpriteSheet } from "kontra";
import { HealthBar } from "./health-bar";
import { Hero } from "./hero";

export class Enemy extends Hero {
  constructor(health, attack, spriteSheet, x, y) {
    super(health, attack, spriteSheet, x, y)
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
        },
        die: {
          frames: '7..10',
          frameRate: 4
        },
        dead: {
          frames: '10..10',
          frameRate: 0
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
    this.healthBar = new HealthBar(this.health, this.health, this.x, this.y + 220);
  }
  
  die() {
    emit('enemy_dead', 1)
    setTimeout(() => {
      this.setState('dead');
    }, 800)
  }
}
