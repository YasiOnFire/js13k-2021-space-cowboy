import { init, Sprite, GameLoop, loadImage, SpriteSheet, Text } from 'kontra';
import cowboySprite from '../CowBoySmol.png'
import { PlanetDecor } from './planet.decor';
const STARS_COUNT = 30
const canv = document.getElementById('a');
canv.width = 1920
canv.height = 1080
let { canvas } = init(canv);

const r = (min, max)=>Math.floor(Math.random() * (max - min) + min)

loadImage(cowboySprite).then(image => {
  let playerState = 'idle'
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
    // anchor: {x: 0.5, y: 0.5},
    textAlign: 'center',
    dx: 2
  })

  let spriteSheet = SpriteSheet({
    image,
    frameWidth: 23,
    frameHeight: 10,
    animations: {
      idle: {
        frames: '0..0',
        frameRate: 2
      },
      hurt: {
        frames: '0..4',
        frameRate: 6
      },
      attack: {
        frames: '5..6',
        frameRate: 6
      }
    }
  });
  let hero = Sprite({
    x: 150,
    y: 150, 
    width: 575,
    height: 250,
    // anchor: {x: 0.5, y: 0.5},
    animations: spriteSheet.animations
  });

  let planet = Sprite({
    x: 0,
    y: 250,
    color: '#ddd',
    width: canv.width,
    height: canv.height,
  });

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

      hero.playAnimation(playerState);
      hero.update();
      text.update();

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

      hero.render();
      text.render();
      if (text.x > canvas.width) {
        text.x = -text.width;
      }
    }
  });

  loop.start();

  setTimeout(() => {
    playerState = 'attack';
  }, 2000);
  setTimeout(() => {
    playerState = 'idle';
  }, 5000);
  setTimeout(() => {
    playerState = 'hurt';
  }, 5000);
  setTimeout(() => {
    playerState = 'idle';
  }, 10000);
})
