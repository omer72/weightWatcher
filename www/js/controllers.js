angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Points, $ionicLoading) {
	$ionicLoading.show({
                template: '<i class="icon ion-loading-c"></i><br/>Loading...'
  });
  Points.add().then(function success(response){
  	$scope.items = response.data;
  	$ionicLoading.hide();
  }
)
})
.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('CalcCtrl', function($scope) {
    $scope.calcValues =  {};
  $scope.calculatePP = function() {
    var protein = $scope.calcValues.protein;
    var carbs = $scope.calcValues.carbs;
    var fat = $scope.calcValues.fat;
    var fiber = $scope.calcValues.fiber;
    var pts = (protein / 10.94) + (carbs / 9.17) + (fat/3.89)- (fiber / 12.49);
    $scope.calcValues.result = Math.round(pts);
  }


})

.controller('PointsCtrl', function($scope, Points, $ionicLoading,$ionicScrollDelegate) {
	var items = $scope.items = [];
  
	$ionicLoading.show({
                template: '<i class="icon ion-loading-c"></i><br/>Loading...'
  	});
	  Points.add().then(function success(response){
	  	items = response.data;
	  	$ionicLoading.hide();
	  }
	)

	var letterHasMatch = {};
	$scope.getProducts = function() {
    letterHasMatch = {};
    //Filter contacts by $scope.search.
    //Additionally, filter letters so that they only show if there
    //is one or more matching contact
    return items.filter(function(item) {
      var itemDoesMatch = !$scope.search || 
        item.name.trim().toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ;

      //Mark this person's last name letter as 'has a match'
      if (itemDoesMatch) {
        var letter = item.name.trim().charAt(0).toUpperCase();
        letterHasMatch[letter] = true;
      }

      return itemDoesMatch;
    }).filter(function(item) {
      //Finally, re-filter all of the letters and take out ones that don't
      //have a match
      if (item.isLetter && !letterHasMatch[item.letter]) {
        return false;
      }
      return true;
    });
  };
	$scope.getItemWidth = function(item) {
    	return '100%';
  	};
  	$scope.scrollBottom = function() {
    	$ionicScrollDelegate.scrollBottom(true);
  	};
  	$scope.clearSearch = function() {
    	$scope.search = '';
  	};
})
;
