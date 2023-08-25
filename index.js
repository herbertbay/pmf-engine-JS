const apiBase = 'https://us-central1-pmf-engine.cloudfunctions.net'

const api = async (endpoint, data) => {
  return await fetch(`${apiBase}/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify({
      data
    }),
    json: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

class PMF {
  /*
   * @param {string} accountId - The ID of the account (optional but it has to be set before calling event)
   * @param {object} options - User ID (optional but it has to be set before calling event)
   */
  constructor (accountId, options) {
    this.accountId = accountId
    this.options = options

    if(options && options.userId) {
      this.userId = options.userId
    }
  }

  /*
   * Sets the account ID
   * @param {string} userId - The ID of the user (required)
   */
  identify (userId) {
    this.userId = userId
    return this
  }

  /*
   * Records an event
   * @param {string} eventName - The name of the event (required)
   */
  async event (eventName) {
    const data = {
      accountId: this.accountId,
      eventName,
      userId: this.userId
    }

    await api('eventRecord', data)
    return this
  }

  /*
   * Gets the command for the user
   */
  async getCommand () {
    const data = {
      accountId: this.accountId,
      userId: this.userId,
      userAgent: 'pmf-sdk-js'
    }

    const response = await api('userGetCommand', data)

    const { result } = await response.json()

    return result.commands ? result.commands[0] : null
  }
}

module.exports = PMF

