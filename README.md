# PMF-engine JavaScript SDK

This library allows to integrate web app with PMF-engine. You can record events and get commands such if feedback form needs to be shown when time comes :)

# Installation

```
npm install pmf-engine-sdk
```

# Usage

## Initiate
```
const Pmf = require('pmf')

// Initiate the library
const pmf = new Pmf('account id')
pmf.identify('user id')
```

## Record an event
```
// There is no response but returns a promise that resolves at the end of api call
pmf.event('core event name')
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