import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

/**
 * Create database instance
 */
const database = new Database()

/**
 * Create routes
 */
export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: createTask
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: getTasks
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: updateTask
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: deleteTask
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: markTaskAsComplete
  }
]

/**
 * Create a task
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns Created task
 */
function createTask(req, res) {
  if (!req.body) {
    return handleError(res, 422, 'Properties name and description are required.')
  }

  if (!req.body.name) {
    return handleError(res, 422, 'Property name is required.')
  }

  if (!req.body.description) {
    return handleError(res, 422, 'Property description is required.')
  }

  const { name, description } = req.body

  const task = {
    id: randomUUID(),
    name,
    description,
    completed_at: null,
    created_at: new Date(),
    updated_at: new Date()
  }

  const data = database.insert('tasks', task)

  return handleSuccess(res, data)
}

/**
 * Get one task or a list of tasks
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns Task(s) found
 */
function getTasks(req, res) {
  const { search } = req.query

  const data = database.select('tasks', search
    ? {
      name: search,
      description: search
    }
    : null)

  return handleSuccess(res, data)
}

/**
 * Update a task
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns Updated task
 */
function updateTask(req, res) {
  if (!req.body) {
    return handleError(res, 422, 'Properties name and description are missing. At least one of these properties is required.')
  }

  const { id } = req.params
  const body = { ...req.body }

  const data = database.update('tasks', id, body)

  return handleSuccess(res, data)
}

/**
 * Delete a task
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns
 */
function deleteTask(req, res) {
  const { id } = req.params

  const data = database.delete('tasks', id)

  return handleSuccess(res, data)
}

/**
 * Set a task as completed
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns Completed task
 */
function markTaskAsComplete(req, res) {
  const { id } = req.params

  const data = database.markTaskAsCompleted('tasks', id)

  return handleSuccess(res, data)
}

/**
 * Handle success
 * @param {Response} res response
 * @param {object} data result
 */
function handleSuccess(res, data) {
  res.writeHeader(data.status).end(JSON.stringify(data))
}

/**
 * Handle error
 * @param {Response} res response
 * @param {number} status status code
 * @param {string} message error message
 */
function handleError(res, status, message) {
  const data = { status, error: message }
  res.writeHeader(data.status).end(JSON.stringify(data))
}
