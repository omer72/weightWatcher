angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Points', function($http,$q) {
  var points = {};
  points.list = [];
  
  var add = function(){
    var url = "../data/dabaDB.json";
    if(ionic.Platform.isAndroid()){
      url = "/android_asset/www/data/dabaDB.json";
    }
    return($http.get(url).success(function(response) {
        points.list = response ;
      }).error (function(err){
        alert (err);
      })
    )
  }
  
  return {
    add: add
  };
});
