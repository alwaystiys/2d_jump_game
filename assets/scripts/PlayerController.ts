import { _decorator, Component, Node, EventMouse, input, Input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    start() {
        input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
    }

    update(deltaTime: number) {
        
    }

    onMouseUp(event : EventMouse){

    }
}

