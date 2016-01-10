/**
 * Created by kamel on 10/01/2016.
 */
angular.module('routerApp.controller')
    .controller('jeviensCtrl',['$scope','$http','$filter',function($scope, $http,$filter){
        // creating a blank object to hold our form information.
        //$scope will allow this to pass between controller and view
        $scope.formData = {};
        $scope.formData.reception=true;
        $scope.formData.receptionStr="true";
        $scope.formData.brunch=true;
        $scope.formData.brunchStr="true";
        // submission message doesn't show when page loads
        $scope.submission = false;
        // Updated code thanks to Yotam
        var param = function(data) {
            var returnString = '';
            for (d in data){
                if (data.hasOwnProperty(d))
                    returnString += d + '=' + data[d] + '&';
            }
            // Remove last ampersand and return
            return returnString.slice( 0, returnString.length - 1 );
        };
        $scope.submitForm = function() {
            $http({
                method : 'POST',
                url : 'php/process.php',
                data : param($scope.formData), // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
            })
                .success(function(data) {
                    if (!data.success) {
                        // if not successful, bind errors to error variables
                        $scope.errorName = data.errors.name;
                        $scope.errorEmail = data.errors.email;
                        $scope.errorTextarea = data.errors.message;
                        $scope.submissionMessage = data.messageError;
                        $scope.submission = true; //shows the error message
                    } else {
                        // if successful, bind success message to message
                        $scope.submissionMessage = data.messageSuccess;
                        $scope.formData = {}; // form fields are emptied with this line
                        $scope.submission = true; //shows the success message
                    }
                });
        };
        $scope.$watch("formData.receptionStr", function (newValue) {
            if(newValue == "true"){
                $scope.formData.reception=true;
            }else{
                $scope.formData.reception=false;
            }
        });
        $scope.$watch("formData.brunchStr", function (newValue) {
            if(newValue == "true"){
                $scope.formData.brunch=true;
            }else{
                $scope.formData.brunch=false;
            }
        });
        $scope.$watch("formData.nom", function (newValue) {
            if(angular.isDefined(newValue)){
                $scope.formData.nom = $filter('uppercase')( $scope.formData.nom);
            }
        });


    }])