/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')

const pkgName = 'patch-vue-directive-ssr'
let path = ''
try {
  path = require.resolve('@vue/compiler-ssr')
}
catch (e) {}

if (!path) {
  console.error(`[${pkgName}] can't find package @vue/compiler-ssr, have you installed it?`)
  process.exit(1)
}

const reg = /^(\s*const directiveTransform = context\.directiveTransforms\[prop\.name\])(.*)$/m
const content = fs.readFileSync(path, 'utf-8')

let found = false
let replaced = false

const patched = content.replace(reg, (_, start, tail) => {
  found = true

  if (tail.includes(pkgName))
    return

  replaced = true
  return `${start} || compilerDom.noopDirectiveTransform /* ${pkgName} */${tail}`
})

if (replaced) {
  fs.writeFileSync(path, patched, 'utf-8')
  console.log(`[${pkgName}] patched successful`)
}
else if (!found) {
  console.error(`[${pkgName}] can't find entry to patch, lastest version tested is @vue/compiler-ssr@3.0.7. If you on longer face any build issues with directive SSR/SSG, you can remove this patch safely.`)
  process.exit(1)
}
