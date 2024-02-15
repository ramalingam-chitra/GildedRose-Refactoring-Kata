export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  /* Func: updateQuality 
   * Desc: update the quality value based on the item name and invoke updateSellin method
   * Params: none
   * Return: Array of item
  */ 
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes' && this.items[i].name != 'Conjured' && this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        if (this.items[i].quality > 0) {
          this.items[i].quality = this.items[i].quality - 1
        }
      } else if (this.items[i].name == 'Conjured') { //feat: gilded rose typescript - include conjured item and reduce quality by 2 instead of 1 each day
        this.items[i].quality = this.items[i].quality - 2;
      } else {
        if (this.items[i].quality < 50 && this.items[i].name != 'Conjured') {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Backstage passes') {
            if (this.items[i].sellIn < 11) {
              this.items[i].quality = this.items[i].quality + 2
            }
            if (this.items[i].sellIn < 6) {
              this.items[i].quality = this.items[i].quality + 5
            }
           /* if (this.items[i].sellIn == 'concert'){
              this.items[i].quality = 0;
            } */ //unsure about concert condition - TBD
          }
        }
      }
     this.updateSellin(this.items[i]);
    }
    return this.items;
  }

  /* Func: updateSellin 
   * Desc: update the sellin value based on the name and update quality
   * Params: item of type Item
   * Return: item
  */  
  updateSellin(item: Item) {
    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      item.sellIn = item.sellIn - 1;
    }
    if (item.sellIn < 0) {
      if (item.name != 'Aged Brie' && item.name != 'Backstage passes' && item.name != 'Sulfuras, Hand of Ragnaros') {
          if (item.quality > 0) {
            item.quality = item.quality - 1
          }
        } else {
          item.quality = item.quality - item.quality
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
        }
      }
    }
    return item;
  }
}
