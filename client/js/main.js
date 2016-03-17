var app = angular.module('myApp', ['ngRoute', 'ngResource'])
	app.controller('welcomeController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope){
        $scope.welcomeMessage = 'Enter User Name';
        $rootScope.welcome = {
            userName: ''
        }
        $scope.go = function() {
            $location.path('tweets/')
        }
	}]);
    app.controller('tweetsController', ['$scope', '$rootScope', '$http', '$resource', function($scope, $rootScope, $http, $resource){
        $scope.tweetsMessage = 'much tweets';
        // var tweets = $resource('http://localhost:3000/server/data.json');
        // $scope.loadTweets = function(){
        //     tweets.get();
        // }
        $http({
            url: '/messages',
            method: 'GET'
        }).then(function(success){
            $scope.array = success.data;
            $scope.content = $scope.array.reverse();
        }, function(error){
            console.log(error);
        });
        
        $scope.welcome = $rootScope.welcome;
        
        $scope.tweet = {
            user: $scope.welcome.userName,
            text: ''
        }
        
        $scope.postTweet = function() {
            $http({
                url: '/messages',
                method: 'POST',
                data: $scope.tweet
            }).then(function(success){
                $scope.createdAt = new Date();
                $scope.newContent = success.data;
                
            }, function(error){
                console.log(error);
            })
            $http({
                url: '/messages',
                method: 'GET'
            }).then(function(success){
                $scope.array = success.data;
                $scope.content = $scope.array.reverse();
                
            }, function(error){
                console.log(error);
            });
        }
        
        $('button').click(function(){
            $('input').val('');
        })
            
        
        
    }]);
	app.config(['$routeProvider', function($routeProvider){
        $routeProvider
        .when('/', {
            templateUrl: 'views/welcome.html',
            controller:  'welcomeController'
        })
        .when('/tweets', {
            templateUrl: 'views/tweets.html',
            controller: 'tweetsController'
        })
        .otherwise({
            redirectTo: '/'
        });

}]);