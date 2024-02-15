import { expect } from 'chai';
import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should check if item name is rendered ', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal('foo');
  });

  it('should check if quality reduces by 2 when the item is Conjured', () => {
    const gildedRose = new GildedRose([new Item('Conjured', 10, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(38);
  });
});
