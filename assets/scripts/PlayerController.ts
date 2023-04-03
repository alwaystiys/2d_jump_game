import { _decorator, Component, Node, EventMouse, input, Input, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

export const BLOCK_SIZE = 40;

@ccclass('PlayerController')
export class PlayerController extends Component {

    private _startJump : boolean = false;
    private _jumpStep : number = 0;
    private _curJumpTime : number = 0;
    private _jumpTime : number = 0.3;
    private _curJumpSpeed : number = 0;
    private _curPos: Vec3 = new Vec3();
    private _deltaPos: Vec3 = new Vec3(0, 0, 0);
    private _targetPos: Vec3 = new Vec3();

    start() {
        input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        // input.on(Input.EventType.TOUCH_START, this.onMouseUp, this)
    }

    update(deltaTime: number) {
        if(this._startJump){
            this._curJumpTime += deltaTime;
            if(this._curJumpTime > this._jumpTime){
                this.node.setPosition(this._targetPos);
                this._startJump = false;
            }else{
                this.node.getPosition(this._curPos);
                this._deltaPos.x = this._curJumpSpeed * deltaTime;
                Vec3.add(this._curPos, this._curPos, this._deltaPos);
                this.node.setPosition(this._curPos);
            }
        }
    }

    onMouseUp(event : EventMouse){
        if(event.getButton() == 0){
            this.jumpBySteip(1);
        }else if(event.getButton() == 2){
            this.jumpBySteip(2);
        }
    }

    jumpBySteip(step: number) {
        if(this._startJump) return;

        this._startJump = true;
        this._jumpStep = step;
        this._curJumpTime = 0;
        this._curJumpSpeed = this._jumpStep * BLOCK_SIZE / this._jumpTime;
        this.node.getPosition(this._curPos);
        Vec3.add(this._targetPos, this._curPos, new Vec3(this._jumpStep * BLOCK_SIZE, 0, 0));

    }
    
}

