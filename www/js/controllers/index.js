/**
 * Created by kamel on 23/01/2016.
 */

angular.module('routerApp.controller')
    .controller('indexCtrl',['$scope','$timeout',function($scope,$timeout){
        $scope.showSuccess=false;
        $scope.showError=false;
        $scope.messageSuccess = "";
        $scope.messageError="";
        $scope.$on('successMail', function(event, mass) {
            $scope.showSuccess =true;
            $scope.messageSuccess = mass;
            $timeout(function() {
                $scope.messageSuccess = "";
                $scope.showError=false;
                $scope.showSuccess = false;
            }, 10000);
            console.log(mass); });
        $scope.$on('errorMail', function(event, mass) {
            $scope.showError =true;
            $scope.messageError = mass;
            $timeout(function() {
                $scope.messageError = "";
                $scope.showError=false;
                $scope.showError = false;
            }, 10000);
            console.log(mass); });
    }]);