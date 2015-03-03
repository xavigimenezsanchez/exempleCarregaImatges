angular.module('appImatges').controller("carregarImatgeCtrl", function($scope,FileUploader) {
    var uploader = $scope.uploader = new FileUploader({url:"/api/imatges",alias:"image",removeAfterUpload: true});
    //$scope.uploader = $fileUploader.create({url:"/api/imatges",alias:"image",removeAfterUpload: true});
   /* uploader.bind('beforeupload', function (event, item) {
            item.formData.push({some: 'data'});
        });*/
    uploader.onBeforeUploadItem = function (item) {
        item.formData.push({titol: $scope.titol});
        item.formData.push({descripcio: $scope.descripcio});
        }   ;
});