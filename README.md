# [Angular Firebase Chat](https://github.com/rhildred/angularfirebasechat)

Last year when I did mobile development with phonegap, I spent some time on node.js with socket.io. Firebase is a ready-made back end that uses similar push technology to keep multiple clients up to date.

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

Check it out [here](https://rhildred.github.io/angularfirebasechat/www)!
