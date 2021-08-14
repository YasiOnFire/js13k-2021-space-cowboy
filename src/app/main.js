import { init, Sprite, GameLoop, loadImage, setImagePath, SpriteSheet } from 'kontra';
// import ss from '../ss.png'
import ss from '../CowBoySmol.png'
import { PlanetDecor } from './planet.decor';

const canv = document.getElementById('a');
canv.width = 1920
canv.height = 1080
let { canvas } = init(canv);

loadImage(ss).then(im => {
  let spriteSheet = SpriteSheet({
    image: im,
    // frameWidth: 165,
    // frameHeight: 57,
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
    y: canv.height / 2 - 100, 
    width: 575,     // width and height of the sprite rectangle
    height: 250,
    // anchor: {x: 0.5, y: 0.5},
    animations: spriteSheet.animations
  });

  let sprite = Sprite({
    x: 0,        // starting x,y position of the sprite
    y: canv.height / 2,
    color: '#ddd',  // fill color of the sprite rectangle
    width: canv.width,     // width and height of the sprite rectangle
    height: canv.height / 2,
  });
  var isAttacking = false
  var isHurt = false

  let rock = new PlanetDecor(100, canv.height / 2 - 30)
  rock = rock.create()
  let loop = GameLoop({  // create the main game loop
    update: () => {
      // sprite.update();
      if (isAttacking) {
        hero.playAnimation('attack');
      } else if (isHurt) {
        hero.playAnimation('hurt');
      } else {
        hero.playAnimation('idle');
      }
      hero.update();
    },
    render: () => { // render the game state
      sprite.render();
      hero.render();
      rock.forEach(element => {
        element.render()
      })
    }
  });

  loop.start();    // start the game

  setTimeout(() => {
    isAttacking = true;
  }, 2000);
  setTimeout(() => {
    isAttacking = false;
  }, 5000);
  setTimeout(() => {
    isHurt = true;
  }, 5000);
  setTimeout(() => {
    isHurt = false;
  }, 10000);

}).catch(err => {
  console.log(err);
})
