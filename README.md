# [Angular Firebase Chat](https://github.com/rhildred/angularfirebasechat)

Last year when I did mobile development with phonegap, I spent some time on node.js with socket.io. [Firebase](https://www.firebase.com/docs/web/quickstart.html) is a ready-made back end that uses similar push technology to keep multiple clients up to date.

The dependencies for firebase are:

```

<script src="cordova.js"></script>
<!-- AngularJS -->
<script src="js/angular.min.js"></script>

<!-- Firebase -->
<script src="js/firebase.js"></script>

<!-- AngularFire -->
<script src="js/angularfire.min.js"></script>

```

A really neat thing about firebase is that it allows for 3 way data binding. In this case we will bind the `messages` array to an object stored in firebase:

```
<form ng-hide="auth == null">
    <div ng-repeat="(n, message) in messages track by n">{{message.sender}}:{{message.text}}</div>
    <p >Message : <input type="text" ng-model="newMessageText"></p>
    <button type = "submit" ng-click="addMessage()">Send</button>
    <button ng-click="logout()">Logout</button>
</form>

```

We create an app on firebase, to which we get a url, in my case `https://dazzling-heat-1553.firebaseio.com` We can 3 way bind a data structure to this url like this:

```
$scope.ref = new Firebase("https://dazzling-heat-$firebaseArray($scope.ref);
```

Once bound, we can add a new message onto all of the clients:

```
$scope.addMessage = function() {
    $scope.messages.$add({
        text: $scope.newMessageText,
        sender: $scope.auth.google.displayName,
        uid:$scope.auth.uid
    });
    $scope.newMessageText = "";
};

```

We don't want people to add messages anonymously. We use google oauth2 to authenticate:

```

$scope.login =function() {
    var provider = 'google';
    var scope = {scope:'email'};
    var auth = $firebaseAuth(getRef());
    auth.$authWithOAuthPopup(provider, scope, function(error, authData){
        if (error) {
            // an error occurred while attempting login
            alert("error: " + error);
        }
    });
};
$scope.logout = function(){
    $scope.auth = null;
    getRef().unauth();
}

```

We create a rule on firebase to protect our data:

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

Firebase is an amazing tool to share state among multiple clients. Check the running ap out [here](https://rhildred.github.io/angularfirebasechat/www)!
