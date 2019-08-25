// Interface style:
export default interface IConstructor<T> extends Function {
  new (...args: any[]): T;
}

// Union Type style:
export type ConstructorUnion<T> = new (...args: any[]) => T;
