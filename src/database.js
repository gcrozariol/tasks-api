import fs from 'node:fs/promises'

/**
 * Get database path
 */
const databasePath = new URL('./files/db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => this.#database = JSON.parse(data))
      .catch(() => this.#persist())
  }

  /**
   * Persist data into an external file
   */
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  /**
   * Insert a task to the database
   * @param {string} table table name
   * @param {object} data task object
   * @returns created task
   */
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return {
      status: 201,
      data
    }
  }

  /**
   * Get a list of records on the desired table
   * @param {string} table table name
   * @returns 
   */
  select(table, search) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return {
      status: 200,
      data
    }
  }

  /**
   * Update a task
   * @param {string} table table name
   * @param {string} id task id
   * @param {string} data fields to update
   * @returns updated task
   */
  update(table, id, data) {
    let dbTable = this.#database[table] ?? []
    let rowIndex = -1

    if (dbTable.length > 0) {
      rowIndex = dbTable.findIndex(row => row.id === id)
    }

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex],
        ...data,
        updated_at: new Date(),
      }

      this.#persist()

      return {
        status: 200,
        data: this.#database[table][rowIndex]
      }
    } else {
      return {
        status: 404,
        error: 'Record not found.'
      }
    }
  }

  /**
   * Delete a task
   * @param {string} table table name
   * @param {string} id task id
   * @returns 
   */
  delete(table, id) {
    let dbTable = this.#database[table] ?? []
    let rowIndex = -1

    if (dbTable.length > 0) {
      rowIndex = dbTable.findIndex(row => row.id === id)
    }

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()

      return {
        status: 204
      }
    } else {
      return {
        status: 404,
        error: 'Record not found.'
      }
    }
  }

  /**
   * Mark task as completed
   * @param {string} table table name
   * @param {string} id task id
   * @returns completed task
   */
  markTaskAsCompleted(table, id) {
    let dbTable = this.#database[table] ?? []
    let rowIndex = -1

    if (dbTable.length > 0) {
      rowIndex = this.#database[table].findIndex(row => row.id === id)
    }

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex],
        updated_at: new Date(),
        completed_at: new Date()
      }

      this.#persist()

      return {
        status: 204
      }
    } else {
      return {
        status: 404,
        error: 'Record not found.'
      }
    }
  }
}