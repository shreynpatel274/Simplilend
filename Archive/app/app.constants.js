(function () {
  'use strict';
  angular.module('portal.constants',[])
        .constant("CONSTANTS", {
      
      "API_CONFIG": {
        "BASE_URL": "http://localhost:8080",
        "ENVIRONMENT": "Dev",
        "CREATE_USER":"createuser",
        "AUTH":"auth",
        "LOAN":"loan"
      }

    })
})();
