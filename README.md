# vite-plugin-vue2-svg

Load SVG files as Vue components, for Vue2.x only.

This fork fixs bugs of the unmaintained [original repo](https://github.com/pakholeung37/vite-plugin-vue2-svg).

[![NPM](https://nodei.co/npm/@kingyue/vite-plugin-vue2-svg.png)](https://www.npmjs.com/package/@kingyue/vite-plugin-vue2-svg)

## Install

```bash
pnpm add -D @kingyue/vite-plugin-vue2-svg
# or
yarn add -D @kingyue/vite-plugin-vue2-svg
# or
npm install -D @kingyue/vite-plugin-vue2-svg
```

## Usage

```js
// vite.config.ts
import { defineConfig } from "vite";
import createVuePlugin from "@vitejs/plugin-vue2";
import { createSvgPlugin } from "@kingyue/vite-plugin-vue2-svg";

export default defineConfig({
  plugins: [createVuePlugin(), createSvgPlugin()],
});
```

```vue
<!-- App.vue -->
<template>
  <Icon />
</template>
<script>
import Icon from "./icon.svg";

export default {
  components: {
    Icon,
  },
};
</script>
```

If you want disabled this plugin for specific file, just add `?raw` when you import.

```typescript
import Icon from "./icon.svg?raw"; // svg file import without transform
```

## Options

```ts
createSvgPlugin(option: {
  svgo?: boolean            // whether optimized by svgo
  svgoConfig?: SVGO.Options // check https://github.com/svg/svgo
  defaultImport?: 'url' | 'raw'
} = {});
```

## License

[MIT](LICENSE)
