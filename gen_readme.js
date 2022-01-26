import fs from 'fs'
const data = JSON.parse(fs.readFileSync('LINKS.json', 'utf8'))
console.log('# awesome-jbrowse2')
data.links.forEach(link => {
  console.log('-', link.pub?.title || '', link.pub?.url || '', link.url || '')
})
