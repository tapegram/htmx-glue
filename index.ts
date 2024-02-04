console.log("Hello via Bun!");

await Bun.build({
  entrypoints: ['./src/common.ts'],
  outdir: './out',
});
