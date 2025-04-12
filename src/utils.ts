// src/utils/imageSplitter.js

/**
 * Menghasilkan informasi posisi background berdasarkan index (0-15)
 * untuk grid 4x4.
 */
export function getPiecePosition(index, tileSize = 64) {
  const row = Math.floor(index / 4);
  const col = index % 4;

  return {
    backgroundPosition: `-${col * tileSize}px -${row * tileSize}px`,
  };
}
