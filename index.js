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
  constructor (accountId, options) {
    this.accountId = accountId
    this.options = options
  }

  identify (userId) {
    this.userId = userId
  }

  async event (eventName) {
    const data = {
      accountId: this.accountId,
      eventName,
      userId: this.userId
    }

    return await api('eventRecord', data)
  }

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

