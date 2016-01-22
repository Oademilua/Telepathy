# simplechat
this is a firebase.io based chat

It relies on firebase backend rule:

```
{
    "rules": {
        ".read": false,
        ".write": false,
        "messages":{
          ".read": "auth != null",
          "$message":{
            ".write":"auth != null",
            "uid":{
              ".validate": "newData.val() == auth.uid"
            }
          }
        }
    }
```
