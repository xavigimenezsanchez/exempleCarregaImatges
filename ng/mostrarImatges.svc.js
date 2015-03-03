angular.module('appImatges')
    .service("imatgesService", function($http) {
        this.fetch = function() {
            return $http.get("/api/imatges");
        };
    });
