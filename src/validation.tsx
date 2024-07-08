export function validateReels(input: string): number {
  const reels = parseInt(input);
  if (isNaN(reels) || reels <= 0) {
    alert('Число колонок должно быть больше 0');
    return 1;
  }
  return reels;
}

export function validateRows(input: string): number {
  const rows = parseInt(input);
  if (isNaN(rows) || rows <= 0) {
    alert('Число рядов должно быть больше 0');
    return 1;
  }
  return rows;
}

export function validateBaseSymbolIds(input: string): Array<number> {
  const stringSymbolIds = input;
  const baseSymbolIds = stringSymbolIds
    .split(' ')
    .filter((el) => el !== '')
    .map((str) => parseInt(str));
  if (baseSymbolIds.some((id) => Number.isNaN(id))) {
    window.alert('Id символов должны быть числами, разделенными пробелом');
    return [0, 1, 2, 3];
  }
  return baseSymbolIds;
}

export function validateReplacingId(input: string): number {
  const id = parseInt(input);
  if (isNaN(id) || id <= 0) {
    alert('ID должен быть числом больше 0');
    return 0;
  }
  return id;
}
