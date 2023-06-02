// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss';

export default defineConfig({
  rules: [
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })],
    ['my-flex', { display: 'flex' }],
    ['my-pink', { color: 'pink' }],
    ['border-important', { 'border-color': '#1890ff !important' }],
    [
      'base-component-wrapper',
      {
        margin: '12px',
        border: '1px solid #fff',
        padding: '12px',
        'border-radius': '3px',
      },
    ],
  ],
  shortcuts: {
    btn: 'my-pink my-flex',
    'component-wrapper': 'base-component-wrapper hover:border-[#d9d9d9]',
  },
  presets: [
    presetAttributify({
      /* preset options */
    }),
    presetUno(),
    // ...custom presets
  ],
});
