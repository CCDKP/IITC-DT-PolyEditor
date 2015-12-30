// script.js

//Globals
angular.module('polyEdit', ['ui.router'])
    

//Routing
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

	// App function
		.state('pe', {
			url: '/polyedit',
			templateUrl : 'polyedit.html',
			controller: 'peController'
		})

		// JSON loader & validation
		.state('pe.load', {
			url: '/load',
			templateUrl : 'polyedit-load.html',
		})
		
		
		// route for the about page
		.state('pe.edit', {
			url: '/edit',
			templateUrl : 'polyedit-edit.html',
			controller: function ($scope) {
				$scope.isDataLoaded();
				$scope.displayEdit();
			}
		})

		// save out json
		.state('pe.save', {
			url: '/save',
			templateUrl : 'polyedit-save.html',
			controller: function ($scope) {
				$scope.isDataLoaded();
				$scope.displayEdit();
			}
			
		})

	$urlRouterProvider.otherwise('/polyedit/load');

})
	
//Controller functions
.controller('peController', function ($scope, $state) {
	
	$scope.input = "";
	$scope.data = [];
	$scope.polygons = 0;
	$scope.polylines = 0;
	$scope.circles = 0;
	$scope.markers = 0;
	
	$scope.isDataLoaded = function () {
		if ($scope.input.length < 1)
			$state.go('^.load');
	}
		
	$scope.loadData = function () {
		try {
			document.getElementById("alertBar").innerHTML = "";
			if (document.getElementById("datain").value == '') throw "No data present";
			$scope.input = JSON.parse(document.getElementById("datain").value);
			if ($scope.input.length < 1) throw "Empty set detected;"
		}
		catch(err) {
			 document.getElementById("alertBar").innerHTML = "<div class='alert alert-danger' role='alert'>" + err + " </div>";
			 return;
		}
		angular.copy($scope.input,$scope.data);
		document.getElementById("editBtn").removeAttribute("disabled");
		document.getElementById("saveBtn").removeAttribute("disabled");
		$state.go('^.edit');
	};
	
	$scope.displayEdit = function () {
		$scope.polygons = 0;
		$scope.polylines = 0;
		$scope.circles = 0;
		$scope.markers = 0;
		for(var i=0;i<$scope.data.length;i++) {
			switch($scope.data[i].type) {
				case "polyline":
					$scope.polylines++;
					continue;
				case "circle":
					$scope.circles++;
					continue;
				case "marker":
					$scope.markers++;
					continue;
				case "polygon":
					$scope.polygons++;
					continue;
				default:
					continue;
			}
		}

	}
	
	$scope.convertPolygon = function(i) {
		$scope.data[i].type = "polyline";
		$scope.data[i].latLngs.push($scope.data[i].latLngs[0]);
	}
	
	$scope.convertAll = function() {
		for(var i=0;i<$scope.data.length;i++) {
			if ($scope.data[i].type === "polygon")
				$scope.convertPolygon(i);
		}
	}
	
	$scope.debugger = function () {
		$scope.polygons++;
	}
	
});
	
	
	