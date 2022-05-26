import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _item:Array<Item> = [];
  private _cols:number = 4;
  private _rows:number = 10;

  constructor(opt:any) {
    super(opt)

    const num = this._cols * this._rows;
    for(let i = 0; i < num; i++) {
      const el = document.createElement('div')
      el.classList.add('item')
      this.getEl().append(el)
      const item = new Item({
        id:i,
        el:el,
      })
      this._item.push(item);
    }

    this._resize();
  }


  protected _update(): void {
    super._update();
  }


  protected _resize(): void {
    super._resize();

    const sw = Func.instance.sw();
    const sh = Func.instance.sh();

    this._item.forEach((val,i) => {
      const ix = ~~(i % this._cols);
      const iy = ~~(i / this._cols);

      const x = (sw / this._cols) * ix + 5;
      const y = (sh / this._rows) * iy + 5;

      Tween.instance.set(val.getEl(), {
        x:x,
        y:y
      })
    })
  }
}