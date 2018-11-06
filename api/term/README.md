# create

Add one item:
```http
POST /create HTTP/1.1
Content-Type: application/json

{
  "dictionary": "ovoschi",
  "term": "Огурец",
}
```

Add multiple items:
```http
POST /create HTTP/1.1
Content-Type: application/json

{
  "dictionary": "ovoschi",
  "items": [
    "Огурец",
    "Помидор",
    "Картофель"
  ]
}
```

# list

```http
GET /list?limit=5&parent=Овощи HTTP/1.1
Content-Type: application/json
```
