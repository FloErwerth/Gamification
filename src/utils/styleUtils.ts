import {css, CSSInterpolation} from "@emotion/css";

export type Styles<T extends string = string> = Record<T, CSSInterpolation>;

export function style<T extends string>(styles: Styles<T>): Styles<T> {
   return styles;
}

export type ClassNameMap<Type extends string> = Record<Type, string>;

export function getClasses<T extends string>(styles: Styles<T>): ClassNameMap<T> {
   const classes: Partial<ClassNameMap<T>> = {};
   Object.entries<CSSInterpolation>(styles).forEach(([key, val]: [string, CSSInterpolation]) => {
      if (typeof val === 'object') {
         classes[key as T] = css(val);
      }
   });
   return classes as ClassNameMap<T>;
}
