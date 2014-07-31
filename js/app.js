

var app = angular.module('app', ['ionic','ngResource','lbServices'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('SmsController', [
  '$scope',
  'Product',
  function($scope, Smses) {

    $scope.newSms = {};
    $scope.smses = Smses.query();

    /*
*
* Add New one
*
* */
    $scope.addNewSms = function(sms) {
      /*
*
* LoopBack Angular SDK goodness
*
* */
      Smses.create(sms,
        // success
        function(response){
          $scope.newSms = {};
          $scope.smses = Smses.query();
          console.log('good add sms: ' + JSON.stringify(response));
        },
        // error
        function(response){
          console.log('bad add sms: ' + JSON.stringify(response));
        }
      );
    };

    /*
*
* Set Todo Completed State
*
* */
    $scope.setCompleted = function(sms){
      /*
*
* LoopBack Angular SDK goodness
*
* */
      Smses.upsert(sms,
        // success
        function(response){
          console.log('good todo update: ' + JSON.stringify(response));
        },
        // error
        function(response){
          console.log('bad todo update: ' + JSON.stringify(response));
        }
      );
    };

    /*
*
* Delete Sms
*
* */
    $scope.deleteSms = function(sms){
      /*
*
* LoopBack Angular SDK goodness
*
* */
      Smses.delete(sms,
        // success
        function(response){
          $scope.smses = Smses.query();
          console.log('good delete todo: ' + JSON.stringify(response));
        },
        // error
        function(response){
          console.log('bad delete todo: ' + JSON.stringify(response));
        }

      );
    };
    $scope.replySms = function(sms){
      $scope.newSms.send_to = sms.from;
      $scope.newSms.send_text = "";
    };
    $scope.sendSms = function(sms){
      console.log(sms.send_to);
      console.log(sms.send_text);
      Smses.send(sms,
        // success
        function(response){
          console.log('success to send SMS: ' + JSON.stringify(response));
          $scope.newSms.send_to = "";
          $scope.newSms.send_text = "";
        },
        // error
        function(response){
          console.log('failed to reply todo: ' + JSON.stringify(response));
        }

      );
    };


  }
]);
