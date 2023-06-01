// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss';

export default defineConfig({
  rules: [
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })],
    ['my-flex', { display: 'flex' }],
    ['my-pink', { color: 'pink' }],
  ],
  shortcuts: {
    btn: 'my-pink my-flex',
  },
  presets: [
    presetAttributify({
      /* preset options */
    }),
    presetUno(),
    // ...custom presets
  ],
});
