import L_Item from './L_Item';
import L_Rombo from './L_Rombo';
class Logic {

    items: any;
    private itemLenght = 0;

    constructor() {
        this.items = {};
    }

    addItem(item: L_Item) {
        item.setOrden(this.itemLenght);
        this.items[item.id] = item;
        this.itemLenght++;
    }

    getItems() {
        var objs = Object.values(this.items) as L_Item[];
        return objs;
    }

}

export default Logic;


