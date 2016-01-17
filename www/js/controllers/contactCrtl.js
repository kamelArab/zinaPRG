/**
 * Created by kamel on 17/01/2016.
 */
angular.module('routerApp.controller').controller('contactCrtl', function ($scope, $http) {
    $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.contactform; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted



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
        $scope.submitButtonDisabled = true;
        $http({
            method : 'POST',
            url : 'php/contact-form.php',
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
                    $scope.submitButtonDisabled = false;
                } else {
                    // if successful, bind success message to message
                    $scope.submissionMessage = data.messageSuccess;
                    $scope.formData = {}; // form fields are emptied with this line
                    $scope.submission = true; //shows the success message
                    $scope.submitButtonDisabled = false;
                }
            });
    };
});