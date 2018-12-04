# Get all by parent

If the term has no parent: name of the dictionary is used as `parent` option.
```http
GET /getAllByParent/Овощи?limit=5 HTTP/1.1
Content-Type: application/json
```

# Put one item

To dictionary (First items in dictionary):
```http
POST /term HTTP/1.1
Content-Type: application/json

{
  "dictionaryId": "3e3e9614-7032-4f04-bd9f-523c3b74f3d4",
  "term": "Огурец",
}
```

To parent term (Nested terms): 
```http
POST /term HTTP/1.1
Content-Type: application/json

{
  "dictionaryId": "3e3e9614-7032-4f04-bd9f-523c3b74f3d4",
  "parentId": "023370f2-1ef3-4968-ae6a-315242b6c757",
  "term": "Корнишон",
}
```

# Put multiple items

To dictionary (First items in dictionary):
```http
POST /termAll HTTP/1.1
Content-Type: application/json

{
  "dictionaryId": "3e3e9614-7032-4f04-bd9f-523c3b74f3d4",
  "terms": [
    {"term": "Огурец"}
    {"term": "Помидор"}
    {"term": "Картофель"}
  ]
}
```

To parent term (Nested terms): 
```http
POST /termAll HTTP/1.1
Content-Type: application/json

{
  "dictionaryId": "3e3e9614-7032-4f04-bd9f-523c3b74f3d4",
  "parentId": "023370f2-1ef3-4968-ae6a-315242b6c757",
  "terms": [
    {"term": "Корнишон"}
    {"term": "Пикули"}
    {"term": "Салатный"}
  ]
}
```
