![Arcaelas Insiders Banner](https://raw.githubusercontent.com/arcaelas/dist/main/banner/svg/dark.svg#gh-dark-mode-only)
![Arcaelas Insiders Banner](https://raw.githubusercontent.com/arcaelas/dist/main/banner/svg/light.svg#gh-light-mode-only)

# Welcome to Arcaelas Insiders!

Hello, if this is your first time reading the **Arcaelas Insiders** documentation, let me tell you that you have found a good place to learn.

**Our team** and *community* are happy to write and make methods simple to implement and understand, but I think you already know that.

Let's start with the basic implementation steps.
`npm i --save @arcaelas/utils`
`yarn add --save @arcaelas/utils`

## Implementatión
```javascript
// Import Statement
import utils from '@arcaelas/utils'
// or
import * as utils from '@arcaelas/utils'
// or
import { someMethodName } from '@arcaelas/utils'

// EsModule
const utils = require('@arcaelas/utils')
```

### IsObject( value?: *any* ): *boolean*
Use this method to check if a value is an Plain Object
```javascript
import { isObject } from '@arcaelas/utils'

isObject({}) // => true
isObject([]) // => false
isObject(null) // => false
isObject(new WebSocket(...)) // => false
```

### empty( value?: *any* ): *boolean*
Return **true** if value is **not empty**.
```javascript
import { empty } from '@arcaelas/utils'

empty(0)  // true
empty([])  // true
empty(null)  // true
empty(false)  // true
empty(undefined)  // true
empty([ null ])  // false
empty([ false ])  // false
empty([ undefined ])  // false
```

### blank( value?: *any* ): *boolean*
"**Blank**" is a method to check if a value **is never** or **is empty** value.
```javascript
import { blank } from '@arcaelas/utils'

blank('') // true
blank([]) // true
blank({}) // true
blank(null) // true
blank(undefined) // true
blank('   ') // true, because have only spaces.
```

### sleep( ms: *number* ): *never*
Use this method to **supress** process by a few time
```javascript
import { sleep } from '@arcaelas/utils'

async function submit(form: HTMLFormElement){
 await sleep(3000)
 return form.submit()
}
```

### rand( min: *number*, max?: *number* ): *number*
Fast random number between range.

```javascript
import { rand } from '@arcaelas/utils'

const fruits = ['apple', 'mango', 'banana']
const randFruit = fruits[ rand(0, fruits.length - 1) ]
// apple or mango or banana
```

### promify(): Promify
With **promify** you can make a promise with custom handler easy, if you want create a promise and resolve outer promise you need **promify.**

```typescript
import { readFile } from "fs"
import { promify } from '@arcaelas/utils'

// We create a promise instance
const promise = promify()

// Define the process steps to manage the data
promise.then(data=>{
 // if request is trusted
 console.log("File content:", data)
}).catch(err=>{
 // If process is failed
 console.error("Error:", err)
})

// Initiate the read file process
readFile(__dirname + "/myfile.md", "utf-8", (err, data)=>{
	if(err) promise.reject(err) // reject instance
	else promise.resolve(data) // resolve instance to "then"
})
```

### setcookie( name: *string*, value?: *any*, exp?: *number*, path?: *string*, domain?: string, https?: *boolean* ): *any*
In front-end, you need store cookies some times.
**setcookie** help you to make this possible.

Let's imagine you have a login function and you want to save the result in a cookie.
```javascript
import { setcookie } from '@arcaelas/utils'


function SignIn(email, password){
	fetch(...)
		.then(res=> res.json())
		.then(data=>{
			// This handler save "accessToken" cookie without expire time.
			setcookie("accessToken", data.accessToken)
			// If you need save token with expiration time, so need set expiration time in ms.
			// 3600 seconds * 1000 ms = 1 Hour
			setcookie("accessToken", data.accessToken, 3600 * 1000)
		})
}
```
We can also specify from which route our cookie is available within our domain.
```javascript
// Cookie with name "key" is only available when our site is in "/shop" page.
setcookie("key", "value", "expireTime in ms", "/shop")
```
We keep in mind that all the **cookies** that are defined in our application are **available only in our domain name** where they are defined, but sometimes we want to define them for **another domain name**.
```javascript
// For domain http://example.com
setcookie("key", "value", 3600 * 1000)
// Only available in example.com, if you navigate to app.example.com, cookie does not available there.

// On the contrary,
// if you want the cookie to be available in the subdomains
// of your application and/or in another domain.
setcookie("key", "value", 3600 * 1000, ".example.com")

// Or available only in your shop section app.
setcookie("key", "value", 3600 * 1000, "shop.example.com")
```
#### Reading Cookie
To read cookie value, you need call **setcookie** method with just cookie **name**.
```javascript
const fetch(..., {
	headers: {
		authentication: "Bearer " + setcookie("accessToken")
	}
})
```

### unsetcookie( name: *string* ): *boolean*
Above we have learned how to **define a cookie** in our **application**, but there is another activity to do and that is: *How do we delete a cookie **without waiting for the expiration time**?*

```javascript
import { unsetcookie } from '@arcaelas/utils'

function SignOut(){
	unsetcookie("accessToken") // Removing cookie in this app domain.
	// To remove cookie in other scope, need more steps:
	setcookie("accessToken", "", -1, "Your path if defined", "The domain name if defined")
}
```

## Working with Objects
**Object-oriented Programming** (*[OOP](https://en.wikipedia.org/wiki/Object-oriented_programming)*) is very common nowadays, but although **EcmaScript** allows us many functionalities regarding this development model, we are still limited in many fields, here we will show you how to use some of our tools to make your life easier.

The **"dot-key"** notation will be common in ***our learning process*** since it is one of the most used models in development today and one of the ***easiest to learn*** to use.

### paths(o: *object*): *string*[]
With this method you can **extract** an **array** with **all properties name** as **dot-key** notation in **object**.
```javascript
import { paths } from "@arcaelas/utils"
const profile = {
	name: "Arcaelas Insiders",
	email: "example@arcaelas.com",
	skills:{
		frontEnd: "23 years",
		backEnd: "19 years"
	}
}
paths(profile) // ["name", "email", "skills.frontEnd", "skills.backEnd"]
```

### set(o: *object*, path: *string*, value: *any* ): *any*
With the **"set"** method it will be **easy to define a value** to a property in our **object recursively**, *without having to manually* access its properties from our development logic.
```javascript
import { set } from "@arcaelas/utils"
const profile = {
	name: "Arcaelas Insiders",
	email: "example@arcaelas.com",
	skills:{
		frontEnd: "23 years",
		backEnd: "19 years"
	}
}
console.log(profile.skills)
// Expected: { frontEnd: ... , backEnd: ... }
set(profile, "skills.server", "8 years")
console.log(profile.skills.server) // Expected: 8 years
```

### has( o: *object*, path: *string* ): boolean
Once we have defined *our object*, we may need to know if a property exists on it, regardless of **whether it is empty or null**.
```javascript
import { has } from "@arcaelas/utils"
const profile = {
	name: "Arcaelas Insiders",
	email: "example@arcaelas.com",
	skills:{
		frontEnd: "23 years",
		backEnd: "19 years"
	}
}
has(profile, "name") // true
has(profile, "skills.server") // false
```

### get(o: *object*, path: *string*, default: *any*): *any*
Above we have explained how to *define* and *verify* a property inside our object, but it is useless if we cannot obtain its value.
```javascript
import { get } from '@arcaelas/utils'

const profile = {
	name: "Arcaelas Insiders",
	email: "example@arcaelas.com",
	skills:{
		frontEnd: "23 years",
		backEnd: "19 years"
	}
}
get(profile, "name") // Arcaelas Insiders
get(profile, "skills.frontEnd") // 23 years
get(profile, "skills.server", "defaultValue") // defaultValue
```

### unset( o: *object*, path: *string* ): *boolean*
Of course, the method responsible for **removing some property** in our object could not be missing.
```javascript
import { unset } from '@arcaelas/utils'

const profile = {
	name: "Arcaelas Insiders",
	email: "example@arcaelas.com",
	skills:{
		frontEnd: "23 years",
		backEnd: "19 years"
	}
}
get(profile, "skills.frontEnd") // 23 years
unset(profile, "skills.frontEnd")
get(profile, "skills.frontEnd") // undefined
```

<hr/>
<div style="text-align:center;margin-top:50px;">
	<p align="center">
		<img src="https://raw.githubusercontent.com/arcaelas/dist/main/logo/svg/64.svg" height="32px">
	<p>
	¿Want to discuss any of my open source projects, or something else?Send me a direct message on [Twitter](https://twitter.com/arcaelas).</br> If you already use these libraries and want to support us to continue development, you can sponsor us at [Github Sponsors](https://github.com/sponsors/arcaelas).
</div>