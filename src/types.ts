export interface PuzzlePiece {
  id: string;
  x: number;
  y: number;
  correctX: number;
  correctY: number;
  clipPath: string;
}

export interface Book {
  id: number;
  title: string;
}
