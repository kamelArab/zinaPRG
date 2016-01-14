angular.module('routerApp.controller',[])
var routerApp = angular.module('routerApp', ['ngMaterial','routerApp.controller','ui.router','uiGmapgoogle-maps']);

routerApp.config(function($stateProvider, $urlRouterProvider,$locationProvider,$uiViewScrollProvider,$injector) {
    $uiViewScrollProvider.useAnchorScroll();
    $urlRouterProvider.otherwise( function($injector) {
        var $state = $injector.get("$state");
        $state.go("home");
    });
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: './templates/home.html',
            controller : 'homeCtrl'
        })

        .state('jeviens', {
            url: '/jeviens',
            templateUrl: './templates/jeviens.html',
            controller : 'jeviensCtrl'
        })
        .state('trains', {
            url: '/trains',
            templateUrl: './templates/train.html',
            controller : 'trainCtrl',
            params :{
                scrollTo: undefined
            }
        })

        .state('mairie', {
            url: '/mairie',
            templateUrl: '/templates/mairie.html',
            controller: "mairieCtrl"
        })
        .state('reception', {
            url: '/reception',
            templateUrl: '/templates/reception.html',
            controller: "receptionCtrl"
        })
        .state('cadeau', {
            url: '/cadeau',
            templateUrl: '/templates/cadeau.html'
        })
        .state('brunch', {
            url: '/brunch',
            templateUrl: '/templates/brunch.html'
        })
        .state('programme', {
            url: '/programme',
            templateUrl: '/templates/programme.html'
        })


        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': { 
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }
            }
            
        });
        
})
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
}).run(function($rootScope,$location,$stateParams, $anchorScroll){
    $rootScope.$on('$stateChangeSuccess', function(event, toState){
        if($stateParams.scrollTo){
            $location.hash($stateParams.scrollTo);
            $anchorScroll();
        }
    });
});

routerApp.controller('scotchController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});