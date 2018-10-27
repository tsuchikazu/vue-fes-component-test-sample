const { Factory } = require('rosie')

Factory.define('post')
  .sequence('id')
  .attr('title', 'ブログタイトル')
  .attr('body', '本文')
  .attr('createdAt', () => new Date())
  .attr('updatedAt', () => new Date())
