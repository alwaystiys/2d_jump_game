import { _decorator, Component, Node, Prefab, CCInteger, instantiate } from 'cc';
import { BLOCK_SIZE } from './PlayerController';
const { ccclass, property } = _decorator;

enum BlockType {
    BT_NONE,
    BT_STONE,
};

@ccclass('GameManager')
export class GameManager extends Component {

    @property({type : Prefab})
    public boxPrefab : Prefab|null = null;

    // @property({type : CCInteger})
    public roadLength : number = 4;
    
    private _road : BlockType[] = [];

    start() {
        this.generateRoad();
    }

    update(deltaTime: number) {
        
    }

    generateRoad(){
        
        this.node.removeAllChildren();

        this._road = [1, 1, 1, 1];
        // this._road.push(BlockType.BT_STONE);

        // for(let i = 1; i < this.roadLength; i++){
        //     if(this._road[i - 1] === BlockType.BT_NONE){
        //         this._road.push(BlockType.BT_STONE)
        //     }else{
        //         this._road.push(Math.floor(Math.random() * 2));
        //     }
        // }

        let linkedBlocks = 0;
        for(let j = 0; j < this._road.length; j++){
            if(this._road[j]){
                ++linkedBlocks;
            }
            if(this._road[j] == 0){
                if(linkedBlocks > 0){
                    this.swpanBlockByCount(j - 1, linkedBlocks);
                    linkedBlocks = 0;
                }
            }
            if(this._road.length == j + 1){
                if(linkedBlocks > 0){
                    this.swpanBlockByCount(j, linkedBlocks);
                    linkedBlocks = 0;
                }
            }
        }




    }

    spawnBlockByTpye(type : BlockType){
        if(!this.boxPrefab) return null;

        let block : Node|null = null;
        switch(type){
            case BlockType.BT_STONE:
                block = instantiate(this.boxPrefab);
                break
        }
        return block;
    }

    swpanBlockByCount(lastPos : number, count : number){
        let block : Node|null = this.spawnBlockByTpye(BlockType.BT_STONE);
        if(block){
            this.node.addChild(block);
            block?.setScale(count, 1, 1);
            console.log(lastPos, count - 1);
            console.log((lastPos - (count - 1) * 0.5));
            console.log((lastPos - (count - 1) * 0.5) * BLOCK_SIZE);
            block?.setPosition((lastPos - (count - 1) * 0.5) * BLOCK_SIZE, -1.5, 0);
        }
    }
}

