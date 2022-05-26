
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Val } from "../libs/val";
import { Expo } from "gsap";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _id:number;
  private _text:HTMLTextAreaElement;
  private _rate:Val = new Val();
  private _isPlaying:boolean = false;
  private _isRollover:boolean = false;
  private _str:string = '';
  private _hoverStr:string = '';

  constructor(opt:any) {
    super(opt)

    this._id = opt.id;
    this._c = this._id * 2;

    const strNum = Util.instance.randomInt(8, 20);
    for(let i = 0; i < strNum; i++) {
      this._str += Util.instance.randomArr('ABCDEFGHIKLMNOPRSTUVWXYZ0123456789'.split(''));
    }

    this._hoverStr = Util.instance.randomArr(['@','%','#','-','¥'])

    this._text = document.createElement('textarea');
    this.getEl().append(this._text);
    this._text.rows = 2;
    this._text.cols = 20;

    this._update();
    this._setHover();
  }


  //
  protected _eRollOver() {
    this._isRollover = true;

    if(this._isPlaying) return;
    this._isPlaying = true;

    Tween.instance.a(this._rate, {
      val:[0, 1]
    }, 0.5, 0, Expo.easeOut, null, null, () => {
      this._eCompRollOver();
    })
  }


  //
  // ------------------------------------
  private _eCompRollOver():void {
    this._isPlaying = false;
    if(!this._isRollover) {
        this._eRollOut();
    }
  }


  //
  protected _eRollOut() {
    this._isRollover = false;

    if(this._isPlaying) return;
    this._isPlaying = true

    Tween.instance.a(this._rate, {
        val:0
    }, 0.75, 0, Expo.easeInOut, null, null, () => {
        this._eCompRollOut()
    })
  }


  //
  // ------------------------------------
  private _eCompRollOut():void {
    this._isPlaying = false
    if(this._isRollover) {
      this._eRollOver()
    }
  }


  protected _update(): void {
    super._update();

    let txt = this._str + '\n';

    const num = ~~(Util.instance.map(this._rate.val, 0, this._str.length, 0, 0.8));
    for(let i = 0; i < num; i++) {
      txt += this._hoverStr;
    }
    this._text.value = txt;
  }
}