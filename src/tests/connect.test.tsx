// Импортируем функцию totalPrice
import { totalPrice } from '../components/Sidebar';
// Тест-кейсы
describe('totalPrice function', () => {
  it('should return 0 when filteredItems is empty', () => {
    const result = totalPrice([], []);
    expect(result).toBe(0);
  });

  it('should return 0 when no items are checked', () => {
    const filteredItems = [{ price: 10 }, { price: 20 }, { price: 30 }];
    const isChecked = [false, false, false];
    const result = totalPrice(filteredItems, isChecked);
    expect(result).toBe(0);
  });

  it('should calculate total price correctly when some items are checked', () => {
    const filteredItems = [{ price: 10 }, { price: 20 }, { price: 30 }];
    const isChecked = [true, false, true];
    const result = totalPrice(filteredItems, isChecked);
    // 10 (checked) + 20 (unchecked) + 30 (checked) = 40
    expect(result).toBe(40);
  });

  it('should calculate total price correctly when all items are checked', () => {
    const filteredItems = [{ price: 10 }, { price: 20 }, { price: 30 }];
    const isChecked = [true, true, true];
    const result = totalPrice(filteredItems, isChecked);
    // 10 (checked) + 20 (checked) + 30 (checked) = 60
    expect(result).toBe(60);
  });
});