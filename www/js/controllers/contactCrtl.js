/**
 * Created by kamel on 17/01/2016.
 */
angular.module('routerApp.controller').controller('contactCtrl', function ($scope, $http, $filter) {

    $scope.contactform;
    $scope.submitButtonDisabled = false;
    $scope.testSubmit = false;
    $scope.formData = {};



    var param = function(data) {
        var returnString = '';
        for (d in data){
            if (data.hasOwnProperty(d))
                returnString += d + '=' + data[d] + '&';
        }
        // Remove last ampersand and return
        return returnString.slice( 0, returnString.length - 1 );
    };

    $scope.errors=[];
    var validForm = function(){

    }
    var initFormData= function(){
        $scope.formData = {};
    }

    $scope.showError = function(text){
        for(var i in $scope.errors){
            if($scope.errors[i] == text){
                return true;
            }
        }
        return false;
    }
    $scope.$watch("formData.nom", function (newValue) {
        if(angular.isDefined(newValue)){
            $scope.formData.nom = $filter('uppercase')( $scope.formData.nom);
        }
    });

    $scope.initError= function(text){
        for(var i in $scope.errors){
            if($scope.errors[i] == text){
                $scope.errors.splice(i,1);
            }
        }
        $scope.submitButtonDisabled = false;
    }


    $scope.submitForm = function() {
        $scope.submitButtonDisabled = true;
        $scope.testSubmit = true;

            var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

            if(angular.isUndefined($scope.formData.nom) || $scope.formData.nom.$invalid){
                $scope.errors.push("nom")
            }
            if(angular.isUndefined($scope.formData.prenom) || $scope.formData.prenom.$invalid){
                $scope.errors.push("prenom");
            }
            if(angular.isUndefined($scope.formData.inputEmail) || $scope.formData.inputEmail.$invalid || !EMAIL_REGEXP.test($scope.formData.inputEmail)){
                $scope.errors.push("email");
            }
            if(angular.isUndefined($scope.formData.inputObjet) || $scope.formData.inputObjet.$invalid){
                $scope.errors.push("objet");
            }
            if(angular.isUndefined($scope.formData.inputMessage) || $scope.formData.inputMessage.$invalid){
                $scope.errors.push("message");
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
            url : 'php/contact-form.php',
            data : param($scope.formData), // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
        }).then(function success(data){
                if (!data.data.success) {
                    // if not successful, bind errors to error variables
                    $scope.showSuccess = false;
                    $scope.showError=true;
                    $scope.$emit("errorMail","Probleme lors de l'envoie du mail");
                    $scope.submitButtonDisabled = false;
                } else {
                    // if successful, bind success message to message
                    initFormData();
                    $scope.showSuccess = true;
                    $scope.formData = {};
                    $scope.$emit("successMail","Email envoyé");
                    $scope.submitButtonDisabled = false;


                }
            },function faillure(){
            $scope.$emit("errorMail","Probleme lors de l'envoie du mail");
            $scope.submitButtonDisabled = false;
        });
    };
});