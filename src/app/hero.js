import { emit, Sprite, SpriteSheet } from "kontra";
import { HealthBar } from "./health-bar";

export class Hero {
  constructor(health, attack, spriteSheet, x, y) {
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
    this.state = 'idle'
    this.healthBar = new HealthBar(this.health, this.health, this.x + 335, this.y + 270);
  }
  draw() {
    this.sprite.render()
    this.healthBar.draw()
  }
  update() {
    this.sprite.playAnimation(this.state)
    this.sprite.update()
    this.healthBar.update()
  }
  damage(power) {
    this.setState('hurt');
    this.health -= power;
    setTimeout(() => {
      this.healthBar.updateHealth(this.health);
      if (this.health <= 0) {
        this.setState('die');
        this.die()
      } else {
        this.setState('idle');
      }  
    }, 400);
  }
  setState(state) {
    this.state = state
  }
  die() {
    emit('hero_dead', 1)
    setTimeout(() => {
      this.setState('dead');
    }, 800)
  }
}
