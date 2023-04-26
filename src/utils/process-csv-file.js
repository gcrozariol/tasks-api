import { createReadStream } from 'fs'
import { parse } from 'csv-parse'

/**
 * Get CSV file
 */
const csvFile = new URL('../files/tasks.csv', import.meta.url)

/**
 * Upload records while reading the CSV file
 */
function processCSVFile() {
  createReadStream(csvFile)
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', ([name, description]) => {
      uploadRowsToDatabase({ name, description })
    })
    .on('end', () => {
      console.log('finished')
    })
    .on('error', (error) => {
      console.log(error.message)
    })
}

/**
 * Create tasks on the "database"
 * @param {object} data name and description
 */
function uploadRowsToDatabase(data) {
  const url = 'http://localhost:3333/tasks'
  const method = 'POST'
  const body = JSON.stringify(data)

  fetch(url, { method, body })
    .then(async response => {
      return await response.json()
    })
    .then(data => {
      console.log('data', data)
    })
    .catch(e => {
      console.log('error: ', e)
    })
}

processCSVFile()