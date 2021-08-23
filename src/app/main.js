import { init, Sprite, GameLoop, loadImage, Text, on, initPointer } from 'kontra'
import cs from '../h.png'
import a from '../a.png'
import { Card } from './card'
import { Rocks } from './rocks'
import { Enemy } from './enemy'
import { Hero } from './hero'
import { Popup } from './popup'
const STARS_COUNT = 30
const canv = document.getElementById('a')
canv.width = 1920
canv.height = 1080
let { canvas } = init(canv)

// TODO: refactor - rocks, stars, popup, planet as a single object
// try upgrade html webpack plugin

loadImage(cs).then(image => {
  loadImage(a).then(_a => {
    let stars = []
    let rocks = new Rocks()
    let deck = []
    let cardsDrawn = []
    let playerStars = 3
    let round = 1

    let hero = new Hero(100, 2, image, 150, 150)
    let enemy = new Enemy(10, 30, image, 1160, 150)
    
    let intro = Text({
      text: 'SPACE COWBOY!',
      font: '64px "8_bit_1_6"',
      color: 'white',
      x: 30,
      y: -10,
      textAlign: 'center',
      dx: -2
    })

    let planet = Sprite({
      x: 0,
      y: 250,
      color: '#ddd',
      width: canv.width,
      height: canv.height,
    })

    let startGame = () => {
      popup = null
      hero = new Hero(100, 2, image, 150, 150)
      enemy = new Enemy(10, 30, image, 1160, 150)
      deck = []
    }

    let popup = new Popup(
      'PLAY\nSPACE COWBOY!',
      {
        text: 'START',
        callback: () => (startGame()),
      }
    )

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

    let generateRandomDeck = () => {
      for (let i = 0; i < 20; i++) {
        deck.push({
          value: Math.floor(Math.random() * 10) + 1,
          power: Math.random() > 0.5 ? 'a' : 'd',
          cost: Math.floor(Math.random() * 10) + 1
        })
      }
    }
    generateRandomDeck()
    console.log(deck);

    let drawCards = () => {
      // get 3 cards from deck
      cardsDrawn.push(
        new Card(300, 600, {_a, value: 3, power: 'a', cost: 9})
      )
      cardsDrawn.push(
        new Card(550, 600, {_a, value: 5, power: 'd', cost: 7})
      )
      cardsDrawn.push(
        new Card(800, 600, {_a, value: 1, power: 'a', cost: 2})
      )
    } 

    let loop = GameLoop({
      update: () => {
        for (let i = 0; i < stars.length; i++) {
          stars[i].update()
        }
        
        hero.update()
        intro.update()

        enemy.update()

        cardsDrawn.forEach(card => {
          card.update()
        })

        if (popup) {
          popup.update()
        }
      },
      render: () => {
        for (let i = 0; i < stars.length; i++) {
          stars[i].render()
        }
        planet.render()

        rocks.draw()
              
        hero.draw()
        intro.render()
        enemy.draw()

        cardsDrawn.forEach(card => {
          card.draw()
        })

        if (popup) {
          popup.draw()
        }
        if (intro.x < intro.width * -1) {
          intro.x = canvas.width
        }
      }
    })

    initPointer()
    loop.start()

    // DEMO
    setTimeout(()=>{
      drawCards()
      hero.damage(100)
    }, 3000)
  })
})
