interface Pkg {
  version: string;
}

declare module '*.json' {
  const value: Pkg;
  export default value;
}

declare module 'canvas';
