angular.module('appImatges').controller("mostrarImatgesCtrl",function($scope,imatgesService) {
    imatgesService.fetch()
        .success(function(imatges){
            $scope.imatges = imatges;
        });
});