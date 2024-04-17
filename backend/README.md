# API reference

## Users

### Register (POST /api/register)

Params:

| Field | Type | Desc |
|---|---|---|
| email | string | email adress |
| name | string | username, must not be blank and must not exceed 30 characters |
| tag | string | tag, can contain only latin symbols, numbers and underscores. Length varies from 1 to 10 chars |
| avatar | png blob | opt, multipart form data only |
| password | string |  |

Returns user info, such as email, name, tag and etc.

### Login (POST /api/login)

Params:

| Field    | Type   | Desc         |
|----------|--------|--------------|
| email    | string | email adress |
| password | string |              |

Returns access token

## Groups

### Show group (GET /api/groups/:id)

### Create group (POST /api/groups)

Params:

| Field | Type | Desc |
|---|---|---|
| name | string | length in 1..20 chars |
| avatar | png blob | optional |

### Join group (PUT /api/groups/:id/join)

### Show all groups (GET /api/groups)

## Messages

### Create message (POST /api/groups/:group_id/messages)

Params:

| Field | Type | Desc |
|---|---|---|
| content | string | 1..2000 chars, can't be blank |

### Show all messages (GET /api/groups/:group_id/messages?id=:id)

Returns last 100 messages from the group, counting from specified message id

# Activecable

Input: token
Subscribe to GatewayChannel to start receiving events

## OP 0 (Message create)

Data: message modal

## OP 1 (User status change)

Data: { id:, status: }

