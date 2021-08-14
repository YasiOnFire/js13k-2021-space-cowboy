import { init, Sprite, GameLoop, loadImage, setImagePath, SpriteSheet } from 'kontra';
import cowboySprite from '../CowBoySmol.png'
import { PlanetDecor } from './planet.decor';
const STARS_COUNT = 30
const canv = document.getElementById('a');
canv.width = 1920
canv.height = 1080
let { canvas } = init(canv);

loadImage(cowboySprite).then(image => {
  let playerState = 'idle'
  let stars = []
  let rock = new PlanetDecor(100, 250 - 30).create()

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
    },
    render: () => {
      for (let i = 0; i < stars.length; i++) {
        stars[i].render()
      }
      planet.render();
      rock.forEach(element => {
        element.render()
      })

      hero.render();
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
