import path from 'node:path'
import fs from 'node:fs'
import * as esbuild from 'esbuild'
import { lessLoader } from 'esbuild-plugin-less';
import manifestPlugin from 'esbuild-plugin-manifest'
import { compressor } from 'esbuild-plugin-compressor';
import mozjpeg from 'imagemin-mozjpeg';
import imagemin from 'imagemin';

const optimizeJpeg = (dir) => ({
  name: 'optimizeJpeg',
  setup: (build) => {
    const { outdir } = build.initialOptions
   
    build.onStart(async () => {
      fs.mkdirSync(path.join(outdir, dir), { recursive: true })
          
      const input = fs.readdirSync(dir).map(file => path.join(dir, file))
      const output = await imagemin(input, { 
        plugins: [mozjpeg({quality: 75, progressive: true})], 
        destination: path.join(outdir, dir) 
      });
      
      for (const {sourcePath, destinationPath, data} of output) {
        fs.writeFileSync(destinationPath, data)
        console.info(`Successfully optimized ${sourcePath} to ${destinationPath}`)
      }
    })
  },
})

await esbuild.build({
  entryPoints: ['./styles/style.less', './styles/vendor.css', './js/app.js'],
  loader: { '.woff2': 'copy', '.woff': 'copy' },
  external: ['*.ttf'],
  bundle: true,
  minify: true,
  outdir: '_site',
  plugins: [
    manifestPlugin({shortNames: 'input'}),
    lessLoader(),
    optimizeJpeg('assets'),
    compressor({
      fileTypes: ['js', 'css'],
      compressType: 'brotli',

    }),
  ],
})