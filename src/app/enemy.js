import { emit, Sprite, SpriteSheet } from "kontra";
import { HealthBar } from "./health-bar";
import { Hero } from "./hero";

export class Enemy extends Hero {
  constructor(health, attack, spriteSheet, x, y) {
    super(health, attack, spriteSheet, x, y)
    this.spriteSheet = SpriteSheet({
      image: spriteSheet,
      frameWidth: 17,
      frameHeight: 8,
      animations: {
        idle: {
          frames: '0..0',
          frameRate: 2
        },
        hurt: {
          frames: '3..4',
          frameRate: 4
        },
        attack: {
          frames: '1..2',
          frameRate: 6
        },
        die: {
          frames: '4..9',
          frameRate: 3
        },
        dead: {
          frames: '9..9',
          frameRate: 0
        }
      }
    });
    this.sprite = Sprite({
      x: this.x,
      y: this.y, 
      width: 425,
      height: 200,
      animations: this.spriteSheet.animations
    })
    this.healthBar = new HealthBar(this.health, this.health, this.x + 140, this.y + 220);
  }
  
  die() {
    emit('enemy_dead', 1)
    setTimeout(() => {
      this.setState('dead');
    }, 800)
  }
}
