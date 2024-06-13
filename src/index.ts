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
    [K in keyof T]-?: Partial<Record<Exclude<keyof T, K>, never>> & Record<K, T[K]>;
}[keyof T];
/**
 * @deprecated
 * Utilizar {@link OnlyOne} en lugar de {@link OneOf}
 * @description
 * Create a type where only one prop is available
 */
export type OneOf<T> = {
    [K in keyof T]-?: Partial<Record<Exclude<keyof T, K>, never>> & Record<K, T[K]>;
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
export type Bind<T extends any, H extends Noop> = (this: T, ...args: Parameters<H>) => ReturnType<H>;
/**
 * @description
 * Allow only values at number, string, bigint and booleans.
 */
export type Inmutables = boolean | string | number | bigint;
/**
 * @description
 * Create a static Object with dynamic properties.
 */
export type JsonObject = {
    [K: string | number | symbol]: string | number | boolean | null | undefined | JsonObject | JsonObject[string] | JsonObject[string][]
} | JsonObject[];


/**
 * @deprecated
 * Use {@link JsonObject} instead.
 * @description
 * An object with static props and values.
 */
export interface IObject<T = unknown> {
    [K: string | number | symbol]: string | number | boolean | bigint | IObject<T> | Array<string | number | boolean | bigint | T | IObject<T>>;
}
/**
 * @description
 * Create Sync and Async Function as FunctionType
 */
export type Noop<A = any, R = any> = (...args: A extends any[] ? A : A[]) => R | Promise<R>;
/**
 * @description
 * Create Sync Function as FunctionType
 */
export type NoopSync<A = any, R = any> = (...args: A extends any[] ? A : A[]) => R;
export interface Promify<S extends any = any, E extends any = any> extends Promise<S> {
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
    $exp: RegExp | {
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
export declare function blank(arr: any): boolean;
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
export declare function copy<T extends any = any>(original: T): T;
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
export declare function empty<T extends any = any>(value: T): boolean;
/**
 * @description
 * Get any property from an object, using path-key as key.
 * @example
 * const props = { a: 1, b: 2, c: { d: 3 } }
 * get(props, 'a') // 1
 * get(props, 'c.d') // 3
 */
export declare function get<T = any, D = any>(object: object, path?: string, defaultValue?: D): T | D;
/**
 * @description
 * Check if a property is in object, using path-key as key.
 * @example
 * const props = { a: 1, b: 2, c: { d: 3 } }
 * has(props, 'a') // true
 * has(props, 'e') // false
 */
export declare function has(object: JsonObject, path: string): boolean;
/**
 * @description
 * Get properties of object as path-key format
 * @example
 * keys({ user:"arcaelas", "age": 25, job:{ home:"dream", school:"student", } })
 * // ['user','age','job.home', 'job.school']
 * @param {{}} object
 * @returns {string[]}
 */
export declare function keys(object: JsonObject): string[];
/**
 * @description
 * Mixes properties to a target object, mutating its initial structure.
 * @description
 * Use only with flat objects.
 */
export declare function merge(target: any, ...items: any[]): any;
/**
 * @deprecated
 * @description
 * Merges only the properties that are different from the initial object.
 */
export declare function mergeDiff(base: JsonObject, ...items: JsonObject[]): JsonObject;
export declare function promify<S extends any = any, E extends any = any>(): Promify<S, E>;
/**
 * @description
 * Get random number.
 */
export declare function rand(min?: number, max?: number): number;
/**
 * @description
 * Use this method to supress process by a few time
 * @example
 * async function submit(form: HTMLFormElement){
 *  await sleep(3000)
 *  return form.submit()
 * }
 */
export declare function sleep(timeout?: number): Promise<void>;
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
export declare function set<T extends JsonObject = JsonObject>(target: T, path: string | undefined, value: any): T;
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
export declare function source<T>(schema: T, options?: SourceOptions): (item: JsonObject) => T;
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
export declare function query<T>(methods?: T): (query: Query<T>) => <I extends JsonObject>(item: I) => boolean;
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
export declare function unset(target: JsonObject, path?: string): JsonObject;
export declare function setcookie(name: string, ...props: [string, number, ...any]): string;
export declare function unsetcookie(name: string): boolean;
export declare const cookie: {
    toSeconds: (time?: number, e?: number) => number;
    set: (name: string, value: string, time?: number | string, path?: string, domain?: string, https?: boolean) => void | string;
    get: (name: string) => string;
    remove: (name: string, ...server: any[]) => boolean;
    has: (key: string) => boolean;
    readonly all: any[];
};
//# sourceMappingURL=index.d.ts.map
