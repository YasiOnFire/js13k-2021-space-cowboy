import { Sprite } from "kontra";

export class PlanetDecor {
  constructor(x, y) {
    this._x = x
    this._y = y
  }
  getRock() {
    return [
      Sprite({
        x: this._x,
        y: this._y,
        color: '#ddd',
        width: 90,
        height: 40,
      }),
      Sprite({
        x: this._x,
        y: this._y,
        color: '#aaa',
        width: 40,
        height: 40,
      }),
      Sprite({
        x: this._x + 30,
        y: this._y - 30,
        color: '#ddd',
        width: 60,
        height: 30,
      }),
      Sprite({
        x: this._x + 30,
        y: this._y - 30,
        color: '#aaa',
        width: 30,
        height: 30,
      }),
      Sprite({
        x: this._x + 90,
        y: this._y + 20,
        color: '#ddd',
        width: 10,
        height: 20,
      }),
      Sprite({
        x: this._x - 20,
        y: this._y + 30,
        color: 'rgba(102, 102, 102,.5)',
        width: 20,
        height: 10,
      }),
    ]
  }
  create() {
    return [...this.getRock()]
  }

}
