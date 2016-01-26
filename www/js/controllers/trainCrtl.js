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
        $scope.errors = [];
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

        $scope.showError = function(text){
            for(var i in $scope.errors){
                if($scope.errors[i] == text){
                    return true;
                }
            }
            return false;
        }

        $scope.initError= function(text){
            for(var i in $scope.errors){
                if($scope.errors[i] == text){
                    $scope.errors.splice(i);
                }
            }
        }
        $scope.submitFormTrain = function() {

            $scope.submitButtonDisabled = true;

            if(angular.isUndefined($scope.formData.nom) || $scope.formData.nom.$invalid){
                $scope.errors.push("nom")
            }
            if(angular.isUndefined($scope.formData.prenom) || $scope.formData.prenom.$invalid){
                $scope.errors.push("prenom");
            }
            if(angular.isUndefined($scope.formData.inputEmail) || $scope.formData.inputEmail.$invalid){
                $scope.errors.push("email");
            }
            if($scope.formData.nbr <=0){
                $scope.errors.push("nbr");
            }

            if($scope.errors.length >0){

                var messageError = "Les champs ";
                if($scope.errors.length == 1){
                    messageError = "Le champ ";
                }
                for(var i in $scope.errors){
                    messageError += $scope.errors[i]+", "
                }

                messageError = messageError.substring(0,messageError.length - 2);

                $scope.$emit("errorMail",messageError);

                return;

            }



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
