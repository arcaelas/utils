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
export type Bind<T extends any, H extends Noop> = (this: T, ...args: Parameters<H>) => ReturnType<H>

/**
 * @description
 * Compare if Type is any Function Type
 */
export type Noop<A = any, R = any> = (...args: A extends any[] ? A : A[]) => R | Promise<R>

/**
 * @description
 * Type for Object
 */
export interface IObject<T = undefined> {
    [K: string | number | symbol]: string | number | boolean | T | IObject<T> | IObject<T>[]
}

/**
 * @description
 * Type for inmutables string, number, booleans
*/
export type Inmutables = Exclude<IObject[string], any[] | undefined | IObject>

/**
 * @description
 * Use this method to check if a value is an Plain Object
 * @example
 * isObject({}) // true
 * isObject([]) // false
 * isObject(null) // false
 * isObject(new WebSocket(...)) // false
*/
export function isObject(fn): fn is IObject {
    return typeof (fn ?? false) === 'object'
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
    return [undefined, null, false, 0].some(e => e === value) ||
        (['object', 'string'].some(e => e === typeof value) && !Object.keys(value as any).length) ||
        (Array.isArray(value) && !value.length);
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
export function blank(arr): boolean {
    return (null ||
        arr === null ||
        arr === undefined ||
        (Array.isArray(arr) && !arr.length) ||
        (typeof arr === 'string' && arr.trim().length == 0) ||
        (arr && typeof arr === 'object' && !Object.keys(arr).length)
    );
};

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
    await new Promise(r => setTimeout(r, timeout))
}

/**
 * @description
 * Get random number.
*/
export function rand(min: number = -Infinity, max: number = Infinity): number {
    return Math.floor((Math.random() * (max - min + 1) + min));
};

/**
 * @description
 * Get properties of object as path-key format
 * @example
 * paths({ user:"arcaelas", "age": 25, job:{ home:"dream", school:"student", } })
 * // ['user','age','job.home', 'job.school']
 * @param {{}} object 
 * @returns {string[]}
*/
export function paths<T extends IObject = any>(o: T): string[] {
    const c = (x, p = '', arr: string[] = []) => {
        for (let key in x) {
            let value = x[key];
            key = p ? p + '.' + key : key;
            if (value && typeof value === 'object')
                c(value, key, arr);
            else arr.push(key);
        }
        return arr;
    };
    return c(o);
};

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
export function set<T extends IObject = IObject>(target: T, path: string = '', value: any): T {
    let keys = path.split(".");
    while (keys.length) {
        let key = keys.shift() as string;
        Object.assign(target, {
            [key]: !keys.length ? value : (
                key in target ? (
                    target[key] && typeof target[key] === 'object' ? target[key] : (
                        keys.length ? {} : value
                    )
                ) : {}
            )

        })
    }
    return target;
}

/**
 * @description
 * Check if a property is in object, using path-key as key.
 * @example
 * const props = { a: 1, b: 2, c: { d: 3 } }
 * has(props, 'a') // true
 * has(props, 'e') // false
*/
export function has(object, path): boolean {
    try {
        return path.split('.').reduce((exists, key) => key in exists && exists[key], object)
    }
    catch (err) {
        return false
    }
}

/**
 * @description
 * Get any property from an object, using path-key as key.
 * @example
 * const props = { a: 1, b: 2, c: { d: 3 } }
 * get(props, 'a') // 1
 * get(props, 'c.d') // 3
*/
export function get<T = any, D = any>(object: object, path = '', defaultValue?: D): T | D {
    try {
        return path.split('.').reduce((obj, key) => obj[key], object) as any
    }
    catch (err) {
        return defaultValue as D
    }
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
export function unset(target: IObject, path: string = ''): IObject {
    let object = target, keys = path.split('.')
    while (keys.length) {
        const key = keys.shift() as string
        if (!keys.length) delete object[key]
        else if (typeof (object[key] ?? false) === 'object')
            object = object[key] as IObject
        else break
    }
    return target
};

export interface Promify<S extends any = any, E extends any = any> extends Promise<S> {
    status: 'pending' | 'filled' | 'failed'
    resolve<O = S>(filled?: O): Promise<O>
    reject<O = E>(filled?: O): Promise<O>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
    */
    finally(onfinally?: (() => void) | undefined | null): Promise<S>
}
export function promify<S extends any = any, E extends any = any>(): Promify<S, E> {
    const status: any = { reject: Date.now, resolve: Date.now, }
    const promise: any = new Promise((resolve, reject) => Object.assign(status, { resolve, reject }))
    promise.status = 'pending'
    promise.reject = o => {
        status.reject(o as any)
        promise.status = 'failed'
        return promise
    }
    promise.resolve = o => {
        status.resolve(o as any)
        promise.status = 'filled'
        return promise
    }
    return promise as any
}

export function clone<S extends any = any>(object: S): S {
    if (Array.isArray(object))
        return object.map(clone) as any
    else if (isObject(object))
        return merge({}, object)
    return object
}

export function merge(target: any, ...items: any[]): any {
    target = isObject(target) ? target : {}
    for (const item of items) {
        if (!isObject(item)) continue
        for (const key in item) {
            const value = item[key]
            if (isObject(target[key]) && isObject(value))
                target[key] = merge(target[key], value)
            else target[key] = value
        }
    }
    return target
}

export function mergeDiff(base, ...items) {
    base = isObject(base) ? base : {}
    while (items.length) {
        const item = items.shift()
        if (!isObject(item)) continue
        for (const key in item) {
            const value = item[key]
            if (key in base && isObject(value) && isObject(base[key])) {
                base[key] = mergeDiff(base[key], value)
            }
            else base[key] = value
        }
    }
    return base
}

export function setcookie(name, ...props: [string, number, ...any]): string {
    return props.length ? cookie.set(name, ...props) : cookie.get(name) as any;
};
export function unsetcookie(name): boolean {
    return cookie.remove(name);
};

const cookie = {
    toSeconds: function (time = 3, e = 0) {
        time = empty(time) ? 0 : time;
        let now = new Date().getTime();
        time = !isNaN(Number(time)) ? (new Date().getTime() + time) : (
            typeof time === 'string' ? new Date(time).getTime() : new Date("2035").getTime()
        );
        return e = (time - now), e > 0 ? e : 0;
    },
    set: function (name: string, value: string, time: number | string = Infinity, path?: string, domain?: string, https: boolean = false): void | string {
        return document.cookie =
            encodeURIComponent(name) +
            "=" + encodeURIComponent(value) +
            ("; max-age=" + this.toSeconds(time as number)) +
            (path ? "; path=" + path : "") +
            (domain ? "; domain=" + domain : "") +
            (https ? "; secure" : ""), value;
    },
    get: function (name): string {
        return this.all[name] || undefined;
    },
    remove: function (name, ...server): boolean {
        return this.set(name, undefined as any, undefined, ...server), !this.all[name];
    },
    has: function (key): boolean {
        return Object.keys(this.all).some(e => e === key);
    },
    get all() {
        var cookies = [];
        return document.cookie.split(';').forEach(cookie => {
            cookies[decodeURIComponent(cookie.substr(0, cookie.indexOf('='))).trim()] =
                decodeURIComponent(cookie.substr(cookie.indexOf('=') + 1));
        }), cookies;
    }
};