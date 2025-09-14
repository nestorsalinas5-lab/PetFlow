// Fix: The reference to 'vite/client' was failing. Providing manual type
// definitions for imported assets as a workaround to resolve errors.
declare module '*.png' {
  // Fix: Renamed 'src' to 'value' to resolve a "Duplicate identifier" error,
  // which was likely caused by a naming conflict with another type definition.
  const value: string;
  export default value;
}

declare module '*.css' {}
