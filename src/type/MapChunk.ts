interface Cell {
    cellValue: string;
    owner: number | null;
}

interface MapChunk {
    position: { x: number; y: number };
    cells: Cell[];
    protected: boolean;
}