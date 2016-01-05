/**
 * Created by karab on 18/02/15.
 */
angular.module('routerApp')
    .controller('homeCtrl',['$scope',function($scope){
        $scope.title = "Title";
        $scope.content = "The Body Content";
    }]);