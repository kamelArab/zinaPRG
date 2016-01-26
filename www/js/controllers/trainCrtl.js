/**
 * Created by kamel on 11/01/2016.
 */
/**
 * Created by kamel on 10/01/2016.
 */
angular.module('routerApp.controller')
    .controller('trainCtrl',['$scope','$http','$filter','$timeout',function($scope, $http,$filter,$timeout){
        // creating a blank object to hold our form information.
        //$scope will allow this to pass between controller and view
        $scope.formData = {};
        $scope.formData.depart="Vendredi 3 juin à 12h07";
        $scope.formData.retour="Dimanche 5 juin à 16h23";
        $scope.formData.nbr = 1;

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
        $scope.submitFormTrain = function() {

            $scope.submitButtonDisabled = true;



            $http({
                method : 'POST',
                url : 'php/processTrain.php',
                data : param($scope.formData), // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
            })
                .success(function(data) {
                    if (!data.success) {
                        // if not successful, bind errors to error variables
                        $scope.messageError = "Probleme lors de l'envoie du mail";
                        $scope.showSuccess = false;
                        $scope.showError=true;
                        $scope.$emit("errorMail","TOTO freho ");


                    } else {
                        // if successful, bind success message to message
                        $scope.formData = {}; // form fields are emptied with this line
                        $scope.messageSuccess = "Email envoyé";
                        $scope.showSuccess = true;
                        $scope.showError=false;
                        $scope.$emit("successMail","TOTO");


                    }
                });
        };

        $scope.$watch("formData.nom", function (newValue) {
            if(angular.isDefined(newValue)){
                $scope.formData.nom = $filter('uppercase')( $scope.formData.nom);
            }
        });


    }])
