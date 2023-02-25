export function enumToObjectMapper<V extends Object>(enumType: V): string[] {
   return Object.values(enumType);
}