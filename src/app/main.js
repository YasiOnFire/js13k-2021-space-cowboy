import { init, Sprite, GameLoop, loadImage, SpriteSheet, Text } from 'kontra';
import cs from '../h.png'
import a from '../a.png'
import { Card } from './card';
import { PlanetDecor } from './planet.decor';
import { Enemy } from './enemy';
import { Hero } from './hero';
const STARS_COUNT = 30
const canv = document.getElementById('a');
canv.width = 1920
canv.height = 1080
let { canvas } = init(canv);

const r = (min, max)=>Math.floor(Math.random() * (max - min) + min)

loadImage(cs).then(image => {
  loadImage(a).then(_a => {
    let stars = []
    let rocks = []
    for (let i = 0; i < 4; i++) {
      const randY = r(220, 280)
      rocks.push(new PlanetDecor(100 * 2 * i* i, randY).create())
    }

    let text = Text({
      text: 'SPACE COWBOY!',
      font: '64px "8_bit_1_6"',
      color: 'white',
      x: 30,
      y: -10,
      textAlign: 'center',
      dx: -2
    })

    let hero = new Hero(100, 2, image, 150, 150, 'idle')

    let planet = Sprite({
      x: 0,
      y: 250,
      color: '#ddd',
      width: canv.width,
      height: canv.height,
    });
    
    let card = new Card(300, 600, {_a: _a, value: 3, power: 'a', cost: 9});
    let card2 = new Card(550, 600, {_a: _a, value: 5, power: 'd', cost: 7});

    let enemy = new Enemy(10, 30);

    // make stars
    for (let i = 0; i < STARS_COUNT; i++) {
      const randomStarSize = ~~(Math.random() * 10) + 1
      const randomStarSpeed = (Math.random() * .2) + .01
      stars.push(Sprite({
        x: Math.random() * canv.width,
        y: Math.random() * 250,
        width: randomStarSize,
        height: randomStarSize,
        color: '#fff',
        opacity: 0.5,
        dx: randomStarSpeed * -1
      }))
    }

    let loop = GameLoop({
      update: () => {
        for (let i = 0; i < stars.length; i++) {
          stars[i].update()
        }
        
        hero.update();
        text.update();

        enemy.update();
        
        card.draw();
        card2.draw();
      },
      render: () => {
        for (let i = 0; i < stars.length; i++) {
          stars[i].render()
        }
        planet.render();

        rocks.forEach(rock => {
          rock.forEach(element => {
            element.render()
          })
        })
              
        hero.draw();
        text.render();

        enemy.draw();

        card.draw();
        card2.draw();
        if (text.x < text.width * -1) {
          text.x = canvas.width;
        }
      }
    });

    loop.start();

    // setTimeout(() => {
    //   hero.setPlayerState('attack');
    // }, 2000);
    // setTimeout(() => {
    //   hero.setPlayerState('idle');
    // }, 5000);
    // setTimeout(() => {
    //   hero.setPlayerState('hurt');
    // }, 5000);
    // setTimeout(() => {
    //   hero.setPlayerState('idle');
    // }, 10000);
    
    setInterval(() => {
      hero.damageHero(1)
    }, 5000);

    setTimeout(() => {
      enemy.damageEnemy(1)
    }, 1000);
    setTimeout(() => {
      enemy.damageEnemy(8)
    }, 2000);
    setTimeout(() => {
      enemy.damageEnemy(1)
    }, 4000);
  })
})
