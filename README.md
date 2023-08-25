# PMF-engine JavaScript SDK

This library allows to integrate web app with PMF-engine. You can record events and get commands such if feedback form needs to be shown when time comes :)

# Installation

```
npm install pmf-engine-sdk
```

# Usage

## Initiate
```
const Pmf = require('pmf-engine-sdk')

// Initiate the library
const pmf = new Pmf('account id')
pmf.identify('user id')
```

## Record an event

Recorgind event has no response but returns a promise that resolves at the end of api call

```
await pmf.event('core event name')
```

## Get command

```
const command = await pmf.getCommand()

```

Command can be null or 
```
{
  type: 'form', 
  url: 'https://pmf-engine.web.app/form/test/demo/xyz/pmf-sdk-js'
}
```

At the time of writing this document, there is only one command `type="form"`

## 'Functional' use

Pmf object does not hold any particular informations and does not need to be stored
through entire life of the application. It can be destroyed after use and initiated 
before use without time consuming calls. 

Alternatively we can:

### record event
```
await new PMF(accountId, { userId }).event('very important event')
```


### get command:
```
const command = await new PMF(accountId, { userId }).getCommand()
```
