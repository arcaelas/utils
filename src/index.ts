/**
 * @description
 * The object must have al most one of these properties.
 * @example
 * interface PostProps {
 *  user: string;
 *  email: string;
 * }
 *  *
 * let post: AlmostOne<PostProps> = {} // throw Error
 *     post = { user: "" } // Success
 *     post = { email: "" } // Success
 *     post = { user:"", email: "" } // Success
 */
export type AlmostOne<T> = {
  [K in keyof T]: Record<K, T[K]>;
}[keyof T];
/**
 * @description
 * The object must have only one of these props, but not at time.
 * @example
 * interface ID {
 *  id: number
 *  uuid: string
 * }
 *
 * let post: OnlyOne<ID>
 *     post = {} // throw Error
 *     post = { id: 0, uuid: "" } // throw Error
 *     post = { id: 0 } // Success
 *     post = { uuid: "" } // Success
 */
export type OnlyOne<T> = {
  [K in keyof T]-?: Partial<Record<Exclude<keyof T, K>, never>> &
    Record<K, T[K]>;
}[keyof T];
/**
 * @deprecated
 * Utilizar {@link OnlyOne} en lugar de {@link OneOf}
 * @description
 * Create a type where only one prop is available
 */
export type OneOf<T> = {
  [K in keyof T]-?: Partial<Record<Exclude<keyof T, K>, never>> &
    Record<K, T[K]>;
}[keyof T];
/**
 * @description
 * Set self object for function
 * @example
 * const handler = function(this: Window, message: any){
 *  this.console.log( message )
 * }
 *
 * const handler: Bind<Window, Noop<[ message: string ]>> = function(message: any){
 *  this.console.log( message )
 * }
 */
export type Bind<T extends any, H extends Noop> = (
  this: T,
  ...args: Parameters<H>
) => ReturnType<H>;

/**
 * @description
 * Allow only values at number, string, bigint and booleans.
 */
export type Inmutables = boolean | string | number | bigint;

/**
 * @description
 * Create a plain object as JSON
 */
export type JsonObject = {
  [K: string | number | symbol]:
    | null
    | null[]
    | undefined
    | undefined[]
    | Inmutables
    | Inmutables[]
    | JsonObject
    | JsonObject[];
};

/**
 * @description
 * Create a JSON with Function props valid.
 */
export type JavaScriptObject = {
  [K: string | number | symbol]:
    | null
    | null[]
    | undefined
    | undefined[]
    | Inmutables
    | Inmutables[]
    | JsonObject
    | JsonObject[]
    | Noop;
};

/**
 * @deprecated
 * Use {@link JsonObject} instead.
 * @description
 * An object with static props and values.
 */
export interface IObject<T = unknown> {
  [K: string | number | symbol]:
    | string
    | number
    | boolean
    | bigint
    | IObject<T>
    | Array<string | number | boolean | bigint | T | IObject<T>>;
}
/**
 * @description
 * Create Sync and Async Function as FunctionType
 */
export type Noop<A = any, R = any> = (
  ...args: A extends any[] ? A : A[]
) => R | Promise<R>;
/**
 * @description
 * Create Sync Function as FunctionType
 */
export type NoopSync<A = any, R = any> = (
  ...args: A extends any[] ? A : A[]
) => R;
export interface Promify<S extends any = any, E extends any = any>
  extends Promise<S> {
  status: "pending" | "filled" | "failed";
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<S>;
  reject<O = E>(filled?: O): Promise<O>;
  resolve<O = S>(filled?: O): Promise<O>;
}
export interface SourceOptions {
  /**
   * @description
   * Pattern for match key
   * @example
   * /\${([^\$\{\}]+)}/g match with ${key} ${other_key}
   * @default
   * /\${([^\$\{\}]+)}/g
   */
  pattern?: RegExp;
}
export interface QueryTypes {
  /**
   * @description
   * The $eq operator matches documents where the value of a field equals the specified value.
   * @example
   * {
   *  age: 18
   * }
   * @example
   * {
   *  age: {
   *      $eq: 18
   *  }
   * }
   */
  $eq: Inmutables;
  /**
   * @description
   * Check if document have a field specified.
   */
  $exists: boolean;
  /**
   * @description
   * Matches documents where field value is matched with RegExp or RegExp ON (RegExp Object Notation)
   */
  $exp:
    | RegExp
    | {
        pattern: string;
        flags?: string;
      };
  /**
   * @description
   * Verify if field value is greater than (i.e. >) the specified value.
   */
  $gt: number;
  /**
   * @description
   * Verify if field value is greater than or equal (i.e. >=) the specified value.
   */
  $gte: number;
  /**
   * @description
   * Use $in operator to validate if field value exist in a specific array element
   */
  $in: Inmutables[];
  /**
   * @description
   * Check if field value contain a value specified
   */
  $includes: Inmutables;
  /**
   * @description
   * Verify if field value is less than (i.e. <) the specified value.
   */
  $lt: number;
  /**
   * @description
   * Verify if field value is less than or equal (i.e. <=) the specified value.
   */
  $lte: number;
  /**
   * @description
   * The $not operator matches documents where the value of a field not equals the specified value.
   * @example
   * { $not: { age: 18 } }
   * { age: { $not: 18 } }
   * { age: { $not: { $eq: 18 } } }
   */
  $not: Inmutables | RegExp | OneOf<Omit<QueryTypes, "$not">>;
}
export type Query<I = QueryTypes, T = NonNullable<I> & QueryTypes> = {
  [K in keyof T]?: never;
} & {
  [K in string]-?: Inmutables | RegExp | Query<T> | OneOf<T>;
};

/**
 * @description "Blank" is a method to check if a value is never or is empty value.
 * @example
 * blank('') // true
 * blank([]) // true
 * blank({}) // true
 * blank(null) // true
 * blank('   ') // true
 * blank(undefined) // true
 */
export function blank(arr: any): boolean {
  return (
    null ||
    arr === null ||
    arr === undefined ||
    (Array.isArray(arr) && !arr.length) ||
    (typeof arr === "string" && arr.trim().length == 0) ||
    (arr && typeof arr === "object" && !Object.keys(arr).length)
  );
}

/**
 * @description
 * This method superficially copies the properties of an object, this method is recommended only for flat objects;
 * @description
 * Recursive objects or objects that have dependent properties such as Buffer, ArrayBuffer, Blob, File, etc;
 * @description
 * They will be negatively affected.
 * @example
 * const me = { id: 1, profile: { username:"arcaelas" } }
 * const tmp = copy(me)
 * tmp.profile.username = "insiders"
 * console.log( me.profile.username ) // arcaelas
 * console.log( tmp.profile.username ) // insiders
 */
export function copy<T extends any = any>(original: T): T {
  if (Array.isArray(original)) return original.map(copy) as T;
  else if (typeof (original ?? 0) === "object") return merge({}, original);
  return original;
}

/**
 * @description Return true if value is not empty.
 * @example
 * empty(0) // true
 * empty([]) // true
 * empty(null) // true
 * empty(false) // true
 * empty(undefined) // true
 *
 * empty([ null ]) // false
 * empty([ false ]) // false
 * empty([ undefined ]) // false
 */
export function empty<T extends any = any>(value: T): boolean {
  return (
    [undefined, null, false, 0].includes(value as any) ||
    (["object", "string"].includes(typeof value) &&
      !Object.keys(value as any).length) ||
    (Array.isArray(value) && !value.length)
  );
}

/**
 * @description
 * Get any property from an object, using path-key as key.
 * @example
 * const props = { a: 1, b: 2, c: { d: 3 } }
 * get(props, 'a') // 1
 * get(props, 'c.d') // 3
 */
export function get<T = any, D = any>(
  object: object,
  path = "",
  defaultValue?: D
): T | D {
  try {
    return path
      .split(".")
      .reduce((obj: any, key: string) => obj[key], object) as any;
  } catch (err) {
    return defaultValue as D;
  }
}

/**
 * @description
 * Check if a property is in object, using path-key as key.
 * @example
 * const props = { a: 1, b: 2, c: { d: 3 } }
 * has(props, 'a') // true
 * has(props, 'e') // false
 */
export function has(object: JsonObject, path: string): boolean {
  try {
    path.split(".").reduce((o, k) => (k in o ? o[k] : null), object as any);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * @description
 * Get properties of object as path-key format
 * @example
 * keys({ user:"arcaelas", "age": 25, job:{ home:"dream", school:"student", } })
 * // ['user','age','job.home', 'job.school']
 * @param {{}} object
 * @returns {string[]}
 */
export function keys(object: JsonObject): string[] {
  function dd(item: any, arr: string[] = [], ref: string = "") {
    for (const key in item) {
      const value = item[key];
      const _ref = (ref && ref + ".") + key;
      if (typeof (value ?? 0) === "object") dd(value, arr, _ref);
      else arr.push(_ref);
    }
    return arr;
  }
  return dd(object);
}

/**
 * @description
 * Mixes properties to a target object, mutating its initial structure.
 * @description
 * Use only with flat objects.
 */
export function merge(target: any, ...items: any[]): any {
  target = typeof (target ?? 0) === "object" ? target : {};
  for (const item of items) {
    if (typeof (item ?? 0) !== "object") continue;
    for (const key in item) {
      const value = item[key];
      if (
        typeof (target[key] ?? 0) === "object" &&
        typeof (value ?? 0) === "object"
      )
        target[key] = merge(target[key], value);
      else target[key] = value;
    }
  }
  return target;
}

/**
 * @deprecated
 * @description
 * Merges only the properties that are different from the initial object.
 */
export function mergeDiff(base: JsonObject, ...items: JsonObject[]) {
  base = typeof (base ?? 0) === "object" ? base : {};
  while (items.length) {
    const item = items.shift();
    if (typeof (item ?? 0) !== "object") continue;
    for (const key in item) {
      const value = item[key];
      if (
        key in base &&
        typeof (value ?? 0) === "object" &&
        typeof (base[key] ?? 0) === "object"
      ) {
        base[key] = mergeDiff(base[key] as JsonObject, value as JsonObject);
      } else base[key] = value;
    }
  }
  return base;
}

export function promify<S extends any = any, E extends any = any>(): Promify<
  S,
  E
> {
  const status: any = { reject: Date.now, resolve: Date.now };
  const promise: any = new Promise((resolve, reject) =>
    Object.assign(status, { resolve, reject })
  );
  promise.status = "pending";
  promise.reject = (o: any) => {
    status.reject(o as any);
    promise.status = "failed";
    return promise;
  };
  promise.resolve = (o: any) => {
    status.resolve(o as any);
    promise.status = "filled";
    return promise;
  };
  return promise as any;
}

/**
 * @description
 * Get random number.
 */
export function rand(min: number = -Infinity, max: number = Infinity): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @description
 * Use this method to supress process by a few time
 * @example
 * async function submit(form: HTMLFormElement){
 *  await sleep(3000)
 *  return form.submit()
 * }
 */
export async function sleep(timeout = Infinity) {
  await new Promise((r) => setTimeout(r, timeout));
}

/**
 * @description
 * Define any property in object, using path-key as key.
 * @example
 * const props = { a: 1, b: 2, c: { d: 3 } }
 * props.a // 1
 * set(props, 'a', 2)
 * props.a // 2
 *
 * props.c.d // 3
 * set(props, 'c.d', 50)
 * props.c.d // 50
 */
export function set<T extends JsonObject = JsonObject>(
  target: T,
  path: string = "",
  value: any
): T {
  let keys = path.split(".");
  while (keys.length) {
    let key = keys.shift() as string;
    Object.assign(target, {
      [key]: !keys.length
        ? value
        : key in target
        ? target[key] && typeof target[key] === "object"
          ? target[key]
          : keys.length
          ? {}
          : value
        : {},
    });
  }
  return target;
}

/**
 * @description
 * Replaces the string properties of a template from an element.
 * @example
 * const schema = source({ github:"https://github.com/${username}" })
 *
 * console.log( schema({ email:"community@arcaelas.com", username:"arcaelas" }) )
 * // Output: { github:"https://github.com/arcaelas" }
 * @example
 * // Custom pattern
 * const schema = source({
 *  url:"/api/:version/:name"
 * }, {
 *  pattern: /\:(\w+)/
 * })
 * const options = schema({ version:"v1.0", name:"cloud-run" })
 *
 * // Output: { url:"/api/v1.0/cloud-run" }
 */
export function source<T>(
  schema: T,
  options: SourceOptions = {}
): (item: JsonObject) => T {
  options = {
    pattern: /\${([^${}]+)}/g,
    ...options,
  };

  function replace(content: any, resource: any) {
    if (Array.isArray(content)) return content.map((e) => replace(e, resource));
    else if (typeof (content ?? 0) === "object") {
      for (const key in content) content[key] = replace(content[key], resource);
      return content;
    } else if (typeof content === "string") {
      return content.replace(
        options.pattern as RegExp,
        (_a: string, k: string) => get(resource, k, "")
      );
    }
    return content;
  }
  return (item) => replace(schema, item);
}

/**
 * @description
 * Create query handlers that allow you to compare objects
 * @description
 * There are built-in methods that you will find useful,
 * but they can be overridden if you specify them when creating a new handler.
 * @example
 * // Create filter with custom handlers
 * const filter = query({
 *  $isPast(ref: string, value: boolean, item: JsonObject){
 *      let past = new Date(get(item, ref)) < value // Check if field is less than value
 *      return value ? past : !past // If value is "true", return true when date is outdate.
 *  }
 * })
 *
 * // Create a function that allows you to compare the elements, based on the handlers already defined.
 * const match = filter({
 *  expireAt: {
 *      $isPast: true
 *  }
 * })
 *
 * // We filter the elements that have the field "expireAt" in the past.
 * const offline = items.filter(item=> match( item ))
 *
 */
export function query<T>(
  methods?: T
): (query: Query<T>) => <I extends JsonObject>(item: I) => boolean;
export function query(methods: any) {
  const validators = Object.assign(
    {},
    {
      $eq(ref: string, value: any) {
        return (item: any) => get(item, ref) === value;
      },
      $exists(ref: string, value: any) {
        return (item: any) => has(item, ref) === value;
      },
      $exp(ref: string, value: any) {
        if (!value.pattern)
          throw new ReferenceError(`ErrorType: RegExp with syntax ${value}`);
        value = new RegExp(value.pattern, value.flags ?? "");
        return (item: any) => value.test(get(item, ref, null));
      },
      $gt(ref: string, value: any) {
        return (item: any) => get(item, ref, 0) > Number(value);
      },
      $gte(ref: string, value: any) {
        return (item: any) => get(item, ref, 0) >= Number(value);
      },
      $in(ref: string, value: any) {
        return (item: any) => value.includes(get(item, ref));
      },
      $includes(ref: string, value: any) {
        return (item: any) => {
          const arr = get(item, ref, []);
          return Array.isArray(arr) && arr.includes(value);
        };
      },
      $lt(ref: string, value: any) {
        return (item: any) => get(item, ref, 0) < Number(value);
      },
      $lte(ref: string, value: any) {
        return (item: any) => get(item, ref, 0) <= Number(value);
      },
      $not(ref: string, value: any) {
        value =
          typeof (value ?? 0) === "object"
            ? build(value)
            : typeof value === "function"
            ? value
            : (i) => get(i, ref, null) === value;
        return (item: any) => !value(item);
      },
    },
    methods
  );
  function make(query: Query, ref?: string, handlers?: any) {
    let arr: any[] = [];
    for (const key in query) {
      let _ref = (ref && ref + ".") + key,
        value = query[key] as any;
      if (value instanceof RegExp) {
        const [, pattern, flags] =
          String(value).match(/^\/(.*)?\/([a-z]+)?/) ?? [];
        if (!pattern) throw new ReferenceError(`RegExp with syntax: ${value}`);
        value = { $exp: { pattern, flags: flags ?? "" } };
      }
      if (key in handlers) {
        arr.push(handlers[key](ref, value));
        break;
      } else if (typeof (value ?? false) === "object")
        arr = arr.concat(make(value, _ref, handlers)) as any[];
      else arr.push(handlers.$eq(_ref, value));
    }
    return arr;
  }
  function build(query: any) {
    const arr = make(query, "", validators);
    return function match(item: any) {
      return arr.every((fn) => fn(item));
    };
  }
  return build;
}

/**
 * @description
 * Remove any property from an object, using path-key as key.
 * @example
 * const props = { a: 1, b: 2, c: { d: 3 } }
 * props.a // 1
 * unset(props, 'a')
 * props.a // undefined
 *
 * props.c // { d: 3 }
 * unset(props, 'c.d')
 * props.c // undefined
 */
export function unset(target: JsonObject, path: string = ""): JsonObject {
  let object = target,
    keys = path.split(".");
  while (keys.length) {
    const key = keys.shift() as string;
    if (!keys.length) delete object[key];
    else if (typeof (object[key] ?? false) === "object")
      object = object[key] as JsonObject;
    else break;
  }
  return target;
}

export function setcookie(
  name: string,
  ...props: [string, number, ...any]
): string {
  return props.length ? cookie.set(name, ...props) : (cookie.get(name) as any);
}
export function unsetcookie(name: string): boolean {
  return cookie.remove(name);
}

export const cookie = {
  toSeconds: function (time = 3, e = 0) {
    time = empty(time) ? 0 : time;
    let now = new Date().getTime();
    time = !isNaN(Number(time))
      ? new Date().getTime() + time
      : typeof time === "string"
      ? new Date(time).getTime()
      : new Date("2035").getTime();
    return (e = time - now), e > 0 ? e : 0;
  },
  set: function (
    name: string,
    value: string,
    time: number | string = Infinity,
    path?: string,
    domain?: string,
    https: boolean = false
  ): void | string {
    return (
      (document.cookie =
        encodeURIComponent(name) +
        "=" +
        encodeURIComponent(value) +
        ("; max-age=" + this.toSeconds(time as number)) +
        (path ? "; path=" + path : "") +
        (domain ? "; domain=" + domain : "") +
        (https ? "; secure" : "")),
      value
    );
  },
  get: function (name: string): string {
    return this.all[name as any] || undefined;
  },
  remove: function (name: string, ...server: any[]): boolean {
    return (
      this.set(name, undefined as any, undefined, ...server),
      !this.all[name as any]
    );
  },
  has: function (key: string): boolean {
    return Object.keys(this.all).some((e) => e === key);
  },
  get all() {
    var cookies: any[] = [];
    return (
      document.cookie.split(";").forEach((cookie) => {
        cookies[
          decodeURIComponent(
            cookie.substr(0, cookie.indexOf("="))
          ).trim() as any
        ] = decodeURIComponent(cookie.substr(cookie.indexOf("=") + 1));
      }),
      cookies
    );
  },
};
