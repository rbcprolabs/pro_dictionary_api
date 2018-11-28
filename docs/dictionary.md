# Get all

```http
GET /dictionary?limit=5 HTTP/1.1
Content-Type: application/json
```

# Get by id

```http
GET /dictionaryById/{ID} HTTP/1.1
Content-Type: application/json
```

# Get by slug

```http
GET /dictionaryBySlug/{SLUG} HTTP/1.1
Content-Type: application/json
```

# Get by name

```http
GET /dictionaryByName/{NAME} HTTP/1.1
Content-Type: application/json
```

# Put

```http
POST /dictionary HTTP/1.1
Content-Type: application/json

{
  "name": "Овощи",
  "slug": "ovoschi",
  "isFlat": false,
  "isOpen": true
}
```

# Update

```http
POST /dictionary/{ID} HTTP/1.1
Content-Type: application/json

{
  "name": "Овощи",
  "slug": "ovoschi",
  "isFlat": true,
  "isOpen": false
}
```

# Delete by id

```http
DELETE /dictionary/{ID} HTTP/1.1
Content-Type: application/json
```
