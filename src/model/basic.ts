export type Coord = { row: number, column: number, block: number };

export function intoCoord(index: number): Coord {
    return {
        row:    index % 9,
        column: Math.floor(index / 9),
        block:  Math.floor(index / 27) * 3 + Math.floor((index % 9) / 3),
    };
}

export function fromCoord(coord: Coord): number {
    return coord.column * 9 + coord.row;
}
