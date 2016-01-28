/**
 * Created by kamel on 11/01/2016.
 */
/**
 * Created by kamel on 10/01/2016.
 */
angular.module('routerApp.controller')
    .controller('trainCtrl',['$scope','$http','$filter',function($scope, $http,$filter){
        // creating a blank object to hold our form information.
        //$scope will allow this to pass between controller and view
        $scope.formData = {};
        $scope.formData.depart="Vendredi 3 juin à 12h07";
        $scope.formData.retour="Dimanche 5 juin à 16h23";
        $scope.formData.nbr = 1;
        $scope.errors = [];
        $scope.testSubmit = false;
        var initFormData = function(){
            $scope.formData = {};
            $scope.formData.depart="Vendredi 3 juin à 12h07";
            $scope.formData.retour="Dimanche 5 juin à 16h23";
            $scope.formData.nbr = 1;
            $scope.errors = [];
            $scope.testSubmit = false;
        }


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
                    $scope.errors.splice(i,1);
                }
            }
            $scope.submitButtonDisabled = false;
        }
        var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        $scope.submitFormTrain = function() {

            $scope.submitButtonDisabled = true;
            $scope.testSubmit = true;

            if(angular.isUndefined($scope.formData.nom) || $scope.formData.nom.$invalid){
                $scope.errors.push("nom")
            }
            if(angular.isUndefined($scope.formData.prenom) || $scope.formData.prenom.$invalid){
                $scope.errors.push("prenom");
            }
            if(angular.isUndefined($scope.formData.email) || $scope.formData.email.$invalid || !EMAIL_REGEXP.test($scope.formData.email)){
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

                if($scope.errors.length == 1){
                    messageError += " est invalide"
                }else{
                    messageError += " sont invalides";
                }

                $scope.$emit("errorMail",messageError);

                return;
            }



            $http({
                method : 'POST',
                url : 'php/processTrain.php',
                data : param($scope.formData), // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
            }).then(function success(data) {
                    if (!data.data.success) {
                        // if not successful, bind errors to error variables
                        $scope.$emit("errorMail","Probleme lors de l'envoie du mail");
                        $scope.submitButtonDisabled = false;


                    } else {
                        // if successful, bind success message to message
                         // form fields are emptied with this line
                        initFormData();
                        $scope.$emit("successMail","Email envoyé");
                        $scope.submitButtonDisabled = false;

                    }
                },
                function onError(data){
                    $scope.$emit("errorMail","Probleme lors de l'envoie du mail");
                    $scope.submitButtonDisabled = false;
                }
            );
        };

        $scope.$watch("formData.nom", function (newValue) {
            if(angular.isDefined(newValue)){
                $scope.formData.nom = $filter('uppercase')( $scope.formData.nom);
            }
        });


    }])
