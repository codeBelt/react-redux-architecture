// Interface style:
export type IConstructor<T> = new (...args: any[]) => T;

// Union Type style:
export type ConstructorUnion<T> = new (...args: any[]) => T;
