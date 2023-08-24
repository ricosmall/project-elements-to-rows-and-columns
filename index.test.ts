// index.test.ts
import { describe, test, expect } from '@jest/globals';
import { Rect, projectElementsToRowsAndColumns } from '.';
import exp = require('constants');

describe('project elements', () => {
  test('elements should be in 2 rows and 2 columns', () => {
    const elements: Rect[] = [
      { x: 10, y: 10, width: 50, height: 30 },
      { x: 70, y: 10, width: 50, height: 30 },
      { x: 10, y: 50, width: 50, height: 30 },
      { x: 70, y: 50, width: 50, height: 30 },
    ];
    const { rows, columns } = projectElementsToRowsAndColumns(elements);

    expect(rows.length).toBe(2);
    expect(columns.length).toBe(2);

    const expectRows = [
      [
        { x: 10, y: 10, width: 50, height: 30 },
        { x: 70, y: 10, width: 50, height: 30 },
      ],
      [
        { x: 10, y: 50, width: 50, height: 30 },
        { x: 70, y: 50, width: 50, height: 30 },
      ],
    ];

    const expectColumns = [
      [
        { x: 10, y: 10, width: 50, height: 30 },
        { x: 10, y: 50, width: 50, height: 30 },
      ],
      [
        { x: 70, y: 10, width: 50, height: 30 },
        { x: 70, y: 50, width: 50, height: 30 },
      ],
    ];

    expect(rows).toMatchObject(expectRows as any);
    expect(columns).toMatchObject(expectColumns as any);
  });

  test('elements should be in 1 row and 2 columns, column 1 has 2 elements, column 2 has 1 element', () => {
    const elements: Rect[] = [
      { x: 10, y: 10, width: 50, height: 30 },
      { x: 70, y: 10, width: 50, height: 70 },
      { x: 10, y: 50, width: 50, height: 30 },
    ];
    const { rows, columns } = projectElementsToRowsAndColumns(elements);
    expect(rows.length).toBe(1);
    expect(columns.length).toBe(2);
    expect(columns[0].length).toBe(2);
    expect(columns[1].length).toBe(1);

    const expectColumns: Rect[][] = [
      [
        { x: 10, y: 10, width: 50, height: 30 },
        { x: 10, y: 50, width: 50, height: 30 },
      ],
      [{ x: 70, y: 10, width: 50, height: 70 }],
    ];
    expect(columns).toMatchObject(expectColumns as any);
  });

  test('elements should be in 1 row and 2 columns, column 1 has 1 element, column 2 has 2 elements', () => {
    const elements: Rect[] = [
      { x: 70, y: 10, width: 50, height: 30 },
      { x: 10, y: 10, width: 50, height: 70 },
      { x: 70, y: 50, width: 50, height: 30 },
    ];

    const { rows, columns } = projectElementsToRowsAndColumns(elements);

    expect(rows.length).toBe(1);
    expect(columns.length).toBe(2);
    expect(columns[0].length).toBe(1);
    expect(columns[1].length).toBe(2);

    const expectRows = [
      [
        { x: 10, y: 10, width: 50, height: 70 },
        { x: 70, y: 10, width: 50, height: 30 },
        { x: 70, y: 50, width: 50, height: 30 },
      ],
    ];

    const expectColumns = [
      [{ x: 10, y: 10, width: 50, height: 70 }],
      [
        { x: 70, y: 10, width: 50, height: 30 },
        { x: 70, y: 50, width: 50, height: 30 },
      ],
    ];

    expect(rows).toMatchObject(expectRows as any);
    expect(columns).toMatchObject(expectColumns as any);
  });

  test('elements should be in 2 rows and 1 column, row 1 has 1 element, row 2 has 2 elements', () => {
    const elements: Rect[] = [
      { x: 70, y: 50, width: 50, height: 30 },
      { x: 10, y: 50, width: 50, height: 30 },
      { x: 10, y: 10, width: 110, height: 30 },
    ];

    const { rows, columns } = projectElementsToRowsAndColumns(elements);

    expect(rows.length).toBe(2);
    expect(columns.length).toBe(1);
    expect(rows[0].length).toBe(1);
    expect(rows[1].length).toBe(2);

    const expectRows = [
      [{ x: 10, y: 10, width: 110, height: 30 }],
      [
        { x: 10, y: 50, width: 50, height: 30 },
        { x: 70, y: 50, width: 50, height: 30 },
      ],
    ];

    const expectColumns = [
      [
        { x: 10, y: 10, width: 110, height: 30 },
        { x: 10, y: 50, width: 50, height: 30 },
        { x: 70, y: 50, width: 50, height: 30 },
      ],
    ];

    expect(rows).toMatchObject(expectRows as any);
    expect(columns).toMatchObject(expectColumns as any);
  });

  test('elements should be in 2 rows and 1 column, row 1 has 2 elements, row 2 has 1 elements', () => {
    const elements: Rect[] = [
      { x: 70, y: 10, width: 50, height: 30 },
      { x: 10, y: 50, width: 110, height: 30 },
      { x: 10, y: 10, width: 50, height: 30 },
    ];

    const { rows, columns } = projectElementsToRowsAndColumns(elements);

    expect(rows.length).toBe(2);
    expect(columns.length).toBe(1);
    expect(rows[0].length).toBe(2);
    expect(rows[1].length).toBe(1);

    const expectRows = [
      [
        { x: 10, y: 10, width: 50, height: 30 },
        { x: 70, y: 10, width: 50, height: 30 },
      ],
      [{ x: 10, y: 50, width: 110, height: 30 }],
    ];

    const expectColumns = [
      [
        { x: 10, y: 10, width: 50, height: 30 },
        { x: 70, y: 10, width: 50, height: 30 },
        { x: 10, y: 50, width: 110, height: 30 },
      ],
    ];
    expect(rows).toMatchObject(expectRows as any);
    expect(columns).toMatchObject(expectColumns as any);
  });

  test('elements should be in 2 rows and 2 column, row 1 has 3 elements, row 2 has 2 elements, column 1 has 2 elements, column 2 has 3 elements', () => {
    const elements: Rect[] = [
      { x: 70, y: 10, width: 50, height: 30 },
      { x: 10, y: 50, width: 50, height: 30 },
      { x: 10, y: 10, width: 50, height: 30 },
      { x: 70, y: 50, width: 110, height: 30 },
      { x: 130, y: 10, width: 50, height: 30 },
    ];

    const { rows, columns } = projectElementsToRowsAndColumns(elements);

    expect(rows.length).toBe(2);
    expect(columns.length).toBe(2);
    expect(rows[0].length).toBe(3);
    expect(rows[1].length).toBe(2);
    expect(columns[0].length).toBe(2);
    expect(columns[1].length).toBe(3);

    const expectRows = [
      [
        { x: 10, y: 10, width: 50, height: 30 },
        { x: 70, y: 10, width: 50, height: 30 },
        { x: 130, y: 10, width: 50, height: 30 },
      ],
      [
        { x: 10, y: 50, width: 50, height: 30 },
        { x: 70, y: 50, width: 110, height: 30 },
      ],
    ];

    const expectColumns = [
      [
        { x: 10, y: 10, width: 50, height: 30 },
        { x: 10, y: 50, width: 50, height: 30 },
      ],
      [
        { x: 70, y: 10, width: 50, height: 30 },
        { x: 130, y: 10, width: 50, height: 30 },
        { x: 70, y: 50, width: 110, height: 30 },
      ],
    ];

    expect(rows).toMatchObject(expectRows as any);
    expect(columns).toMatchObject(expectColumns as any);
  });

  test('elements should be in 1 row and 3 columns, row 1 has 5 elements, column 1 has 2 elements, column 2 has 1 element, column 3 has 2 elements', () => {
    const elements: Rect[] = [
      { x: 70, y: 10, width: 50, height: 70 },
      { x: 10, y: 50, width: 50, height: 30 },
      { x: 10, y: 10, width: 50, height: 30 },
      { x: 130, y: 50, width: 50, height: 30 },
      { x: 130, y: 10, width: 50, height: 30 },
    ];

    const { rows, columns } = projectElementsToRowsAndColumns(elements);

    expect(rows.length).toBe(1);
    expect(columns.length).toBe(3);
    expect(rows[0].length).toBe(5);
    expect(columns[0].length).toBe(2);
    expect(columns[1].length).toBe(1);
    expect(columns[2].length).toBe(2);

    const expectRows = [
      [
        { x: 10, y: 10, width: 50, height: 30 },
        { x: 10, y: 50, width: 50, height: 30 },
        { x: 70, y: 10, width: 50, height: 70 },
        { x: 130, y: 10, width: 50, height: 30 },
        { x: 130, y: 50, width: 50, height: 30 },
      ],
    ];

    const expectColumns = [
      [
        { x: 10, y: 10, width: 50, height: 30 },
        { x: 10, y: 50, width: 50, height: 30 },
      ],
      [{ x: 70, y: 10, width: 50, height: 70 }],
      [
        { x: 130, y: 10, width: 50, height: 30 },
        { x: 130, y: 50, width: 50, height: 30 },
      ],
    ];

    expect(rows).toMatchObject(expectRows as any);
    expect(columns).toMatchObject(expectColumns as any);
  });

  test('elements should be in 1 row and 2 columns, row 1 has 7 elements, column 1 has 1 element, column 2 has 6 elements', () => {
    const elements: Rect[] = [
      { x: 140, y: 90, width: 60, height: 70 },
      { x: 70, y: 90, width: 60, height: 30 },
      { x: 70, y: 50, width: 130, height: 30 },
      { x: 170, y: 10, width: 30, height: 30 },
      { x: 110, y: 10, width: 50, height: 30 },
      { x: 70, y: 10, width: 50, height: 30 },
      { x: 10, y: 10, width: 50, height: 110 },
    ];

    const { rows, columns } = projectElementsToRowsAndColumns(elements);

    expect(rows.length).toBe(1);
    expect(columns.length).toBe(2);
    expect(rows[0].length).toBe(7);
    expect(columns[0].length).toBe(1);
    expect(columns[1].length).toBe(6);

    const expectRows = [
      [
        { x: 10, y: 10, width: 50, height: 110 },
        { x: 70, y: 10, width: 50, height: 30 },
        { x: 70, y: 50, width: 130, height: 30 },
        { x: 70, y: 90, width: 60, height: 30 },
        { x: 110, y: 10, width: 50, height: 30 },
        { x: 140, y: 90, width: 60, height: 70 },
        { x: 170, y: 10, width: 30, height: 30 },
      ],
    ];

    const expectColumns = [
      [{ x: 10, y: 10, width: 50, height: 110 }],
      [
        { x: 70, y: 10, width: 50, height: 30 },
        { x: 110, y: 10, width: 50, height: 30 },
        { x: 170, y: 10, width: 30, height: 30 },
        { x: 70, y: 50, width: 130, height: 30 },
        { x: 70, y: 90, width: 60, height: 30 },
        { x: 140, y: 90, width: 60, height: 70 },
      ],
    ];

    expect(rows).toMatchObject(expectRows as any);
    expect(columns).toMatchObject(expectColumns as any);

    // project columns[1]
    const { rows: subRows, columns: subColumns } =
      projectElementsToRowsAndColumns(columns[1]);

    console.log(subRows, subColumns);

    expect(subRows.length).toBe(3);
    expect(subColumns.length).toBe(1);
    expect(subRows[0].length).toBe(3);
    expect(subRows[1].length).toBe(1);
    expect(subRows[2].length).toBe(2);
    expect(subColumns[0].length).toBe(6);

    const expectSubRows = [
      [
        { x: 70, y: 10, width: 50, height: 30 },
        { x: 110, y: 10, width: 50, height: 30 },
        { x: 170, y: 10, width: 30, height: 30 },
      ],
      [{ x: 70, y: 50, width: 130, height: 30 }],
      [
        { x: 70, y: 90, width: 60, height: 30 },
        { x: 140, y: 90, width: 60, height: 70 },
      ],
    ];

    const expectSubColumns = [
      [
        { x: 70, y: 10, width: 50, height: 30 },
        { x: 110, y: 10, width: 50, height: 30 },
        { x: 170, y: 10, width: 30, height: 30 },
        { x: 70, y: 50, width: 130, height: 30 },
        { x: 70, y: 90, width: 60, height: 30 },
        { x: 140, y: 90, width: 60, height: 70 },
      ],
    ];

    expect(subRows).toMatchObject(expectSubRows as any);
    expect(subColumns).toMatchObject(expectSubColumns as any);
  });
});
