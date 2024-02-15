export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    if (quality >= 0){
     this.quality = quality;
    } else {
      throw new Error(" Quality cannot be negative");
    }
  }
}

// Enums to hold the item names
enum ItemName {
  AGED_BRIE = 'Aged Brie',
  BACKSTAGE_PASSES = 'Backstage passes',
  CONJURED = 'Conjured',
  SULFURAS = 'Sulfuras',
};

export class GildedRose {
  items: Array<Item>;
  degradeQualityCount: number = 1;
 

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  /* Function: updateQuality
    * Desc: Update the quality based on item names and sellin value
    * Param: none
    * Return: Array of Item
  */
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != ItemName.SULFURAS) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].quality > 0 && this.items[i].quality < 50) { //Quality can never be negative
        switch (this.items[i].name) {
          case ItemName.AGED_BRIE: {
            this.items[i].quality = this.items[i].quality + 1;
            break;
          }
          case ItemName.BACKSTAGE_PASSES: {
            this.updateQualityForBackstage(this.items[i]);
            break;
          }
          case ItemName.CONJURED: {
            this.items[i].quality = this.items[i].quality - this.degradeQualityCount * 2;
            break;
          }
          default: {
            if (this.items[i].sellIn >= 0) {
              this.items[i].quality = this.items[i].quality - this.degradeQualityCount;
            } else if (this.items[i].sellIn < 0) {
              this.items[i].quality = this.items[i].quality - this.degradeQualityCount * 2;
            }
            break;
          }
        }

      }
    }
    return this.items;
  }

  /* Function: updateQualityForBackstage
    * Desc: Update the quality for item 'backstage passes'
    * Param: none
    * Return: Updated Item
  */
  updateQualityForBackstage(item: Item) {
    if (item.sellIn > 5 && item.sellIn < 11) {
      item.quality = item.quality + 2;
    } else if (item.sellIn > 0 && item.sellIn <= 5) {
      item.quality = item.quality + 3;
    } else if (item.sellIn > 11) {
      item.quality = item.quality + 1;
    } else {
      item.quality = 0; //after the concert means past sellin date? TBD
    }
    return item;
  }
}