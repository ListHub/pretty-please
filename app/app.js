

angular.module('pretty', ['ui.bootstrap'])
	.controller('Jobs', function ($scope, $http) {

		$scope.update = function(){
			$http.get('http://localhost:8000/api/v1/jobs').
	        success(function(data) {
	            $scope.jobs = data;
	        })
		}
	    
	   	$scope.delete = function(jobName){
	   		$http({
			  method  : 'DELETE',
			  url     : 'http://localhost:8000/api/v1/jobs/'+jobName,
			 })
			  .success(function(data) {
			    console.log(data);
			  });
		}
		
		$scope.submit = function (index){
		$http({
		  method  : 'POST',
		  url     : 'http://localhost:8000/api/v1/jobs',
		  data    : $scope.jobs[index], 
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		 })
		  .success(function(data) {
		    console.log(data);

		    if (!data.success) {
		      // if not successful, bind errors to error variables
		      $scope.errorName = data.errors.name;
		    } else {
		      // if successful, bind success message to message
		      $scope.message = data.message;
		    }
		  });
		}

		$scope.update()
	});
