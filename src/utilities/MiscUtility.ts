export default class MiscUtility {
  public static createArrayChunk(arr: any[], size: number): any[] {
    const chunkSize: number = Math.ceil(arr.length / size);

    return Array.from({ length: chunkSize }, (_, i: number) => {
      const startIndex: number = i * size;
      const endIndex: number = startIndex + size;

      return arr.slice(startIndex, endIndex);
    });
  }
}
