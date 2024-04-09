const fs = require("node:fs");
const path = require("node:path");
const fm = require('front-matter')

const webpackAsset = name => {
  const manifestData = fs.readFileSync(
    path.resolve(__dirname, "_site", "manifest.json"), 
    'utf-8'
  )

  return JSON.parse(manifestData)[name].replace('_site/', '')
};

const getTopics = () => {
  const categories = fs.readdirSync('posts').map(file => {
    const  content  = fs.readFileSync(`./posts/${file}`, 'utf-8')

    return fm(content).attributes.categories
  })

  return [...new Set(categories.flat())]
}
  
module.exports = eleventyConfig => {
  eleventyConfig.addLiquidShortcode("static", webpackAsset);
  eleventyConfig.addGlobalData("topics", getTopics);
  eleventyConfig.addLiquidShortcode('log', text => console.log(text));
};