import { expect, assert } from 'chai';
import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  function throwError() {
    throw new Error("Error thrown");
}
  it('should check if item is initialized ', () => {
    const gildedRose = new GildedRose([new Item('foo', 10, 10)]);
    expect(gildedRose.items[0].name).to.equal('foo');
    expect(gildedRose.items[0].sellIn).to.equal(10);
    expect(gildedRose.items[0].quality).to.equal(10);
  });

  it('should check if system throws error when quality is negative ', () => {
    expect(() => new GildedRose([new Item('foo', 0, -10)])).to.throw('Quality cannot be negative');
  });

  it('should check if quality and sellin value is not updated when the item is Sulfuras', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras', 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(80);
  });

  it('should check if quality reduces by 2 when the item is Conjured', () => {
    const gildedRose = new GildedRose([new Item('Conjured', 0, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(38);
  });

  it('should check if quality is increased by 1 when the item name is Aged Brie', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(41);
  });

  it('should check if quality is increased by 2 when the item name is Backstage passes & sellin value is less than 11', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes', 10, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(42);
  });

  it('should check if quality is increased by 2 when the item name is Backstage passes & sellin value is less than 5', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes', 4, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(3);
    expect(items[0].quality).to.equal(43);
  });

  it('should check if quality is increased by 1 when the item name is Backstage passes & sellin value is less than 5', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes', 15, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(14);
    expect(items[0].quality).to.equal(41);
  });
  
  it('should check if quality is 0 when the item name is Backstage passes & sellin value is less than 0', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes', -2, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-3);
    expect(items[0].quality).to.equal(0);
  });

  it('should check if quality is reduced by 1 when the item name is any other value and sellin is greater than 0', () => {
    const gildedRose = new GildedRose([new Item('test item', 10, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(39);
  });

  it('should check if quality is reduced by 2 when the item name is any other value and sellin is greater than 0', () => {
    const gildedRose = new GildedRose([new Item('test item', -2, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-3);
    expect(items[0].quality).to.equal(38);
  });

  it('should check if quality for multiple items in array', () => {
    const gildedRose = new GildedRose([new Item('Conjured', 0, 40), new Item('test item', 10, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(38);
    expect(items[0].sellIn).to.equal(-1);
    expect(items[1].quality).to.equal(39);
    expect(items[1].sellIn).to.equal(9);
  });

});
