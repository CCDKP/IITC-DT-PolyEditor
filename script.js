// script.js

//Globals
    var polyEdit = angular.module('polyEdit', ['ui.router']);
    var input;


//Routing
	polyEdit.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/load');

        $stateProvider
            // Loading page
            .state('load', {
				url: '/load',
                templateUrl : 'pages/load.html',
            })

            // route for the about page
            .state('edit', {
                templateUrl : 'pages/edit.html',
				controller: function ($scope) {
					$scope.displayEdit();
				}
            })

            // route for the contact page
            .state('save', {
                templateUrl : 'pages/save.html',
            });
	});
	
//Controller functions
	polyEdit.controller('ctrl', function ($scope, $state) {
		$scope.loadData = function () {
			try {
				document.getElementById("alertBar").innerHTML = "";
				if (document.getElementById("datain").value == '') throw "No data present";
				input = JSON.parse(document.getElementById("datain").value);
			}
			catch(err) {
				 document.getElementById("alertBar").innerHTML = "<div class='alert alert-danger' role='alert'>" + err + " </div>";
				 return;
			}
			document.getElementById("editBtn").removeAttribute("disabled");
			document.getElementById("saveBtn").removeAttribute("disabled");
			$state.go('edit');
			
		};
		
		$scope.displayEdit = function () {
			var polygons = 0;
			var polylines = 0;
			var circles = 0;
			var markers = 0;
			for(var i=0;i<input.length;i++) {
				switch(input[i].type) {
					case "polyline":
						polylines++;
						continue;
					case "circle":
						circles++;
						continue;
					case "marker":
						markers++;
						continue;
					case "polygon":
						polygons++;
						continue;
					default:
						continue;
				}
			}
			document.getElementById("outPolylines").innerHTML = polylines;
			document.getElementById("outCircles").innerHTML = circles;
			document.getElementById("outMarkers").innerHTML = markers;
			document.getElementById("outPolygons").innerHTML = polygons;
		}
		
		
	});
	
	
	