# patch-vue-directive-ssr

This package patchs `@vue/compiler-ssr` for build custom directives with SSR/SSG.

```diff
- Custom directive is missing corresponding SSR transform and will be ignored.
```

The patch will make all the custom directive as-is for to be solved at runtime (no transformations unless you configure explicitly).

Related Issues:
- https://github.com/vuejs/vitepress/issues/92#issuecomment-739115781

## Usage

```bash
npm i -D patch-vue-directive-ssr
```

Done.

## Compatibility

Tested with `@vue/compiler-ssr@3.0.7`.

