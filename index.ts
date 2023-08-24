// index.ts

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function projectElementsToRowsAndColumns(elements: Rect[]): {
  rows: Rect[][];
  columns: Rect[][];
} {
  const rows: Rect[][] = [];
  const columns: Rect[][] = [];

  // Sort elements by their x and y coordinates
  // Z order
  const orderedRowElements = elements
    .slice()
    .sort((a, b) => (a.y !== b.y ? a.y - b.y : a.x - b.x));

  orderedRowElements.forEach((element) => {
    let rowFound = false;

    for (let row of rows) {
      const tallestElementInRow = row.reduce((prev, current) =>
        prev.height > current.height ? prev : current
      );
      if (
        (element.y >= tallestElementInRow.y &&
          element.y <= tallestElementInRow.y + tallestElementInRow.height) ||
        (element.y + element.height >= tallestElementInRow.y &&
          element.y + element.height <=
            tallestElementInRow.y + tallestElementInRow.height)
      ) {
        row.push(element);
        rowFound = true;
        break;
      }
    }

    if (!rowFound) {
      rows.push([element]);
    }
  });

  // Sort elements by their x and y coordinates
  // N order
  const orderedColElements = elements
    .slice()
    .sort((a, b) => (a.x !== b.x ? a.x - b.x : a.y - b.y));

  orderedColElements.forEach((element) => {
    let columnFound = false;

    for (let column of columns) {
      const widestElementInColumn = column.reduce((prev, current) =>
        prev.width > current.width ? prev : current
      );
      if (
        (element.x >= widestElementInColumn.x &&
          element.x <= widestElementInColumn.x + widestElementInColumn.width) ||
        (element.x + element.width >= widestElementInColumn.x &&
          element.x + element.width <=
            widestElementInColumn.x + widestElementInColumn.width)
      ) {
        column.push(element);
        columnFound = true;
        break;
      }
    }

    if (!columnFound) {
      columns.push([element]);
    }
  });

  // Sort elements in each row and column by their x and y coordinates
  rows.forEach((row) => row.sort((a, b) => a.x - b.x));
  columns.forEach((column) => column.sort((a, b) => a.y - b.y));

  // Sort rows and columns by the position of their first element
  rows.sort((a, b) => a[0].y - b[0].y);
  columns.sort((a, b) => a[0].x - b[0].x);

  return { rows, columns };
}
