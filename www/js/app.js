/**
 * Created by karab on 18/02/15.
 */

    angular.module('empty.app.controller',[]);
    angular.module('empty.app',['ui.router','ngMaterial','empty.app.controller'])


    .config(['$routeProvider', '$locationProvider',function($routeProvider, v) {
            $stateProvider.state('home', {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            });


        // configure html5 to get links working on jsfiddle
        //$locationProvider.html5Mode(true);
    }]);
angular.bootstrap(document.body);
