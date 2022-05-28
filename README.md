# Kamala

A simple API for FI's Kamala ChatBot made with Express

## Usage

### Install

```bash
$ npm i
```

### Start

```bash
$ npm start
```

# API

## Paths

```js
GET / answers;
```

Returns an answer to a user's question or request

### Query Parameters

**userId**

- type: string

- description: User's ID

- required

**userInput**

- type: string

- description: User's question/request to the chat bot

- required

### Response

- type: string
- description: Kamala's response to the user
