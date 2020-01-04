// public/core.js
var todornot = angular.module('todoornot', []);
function chunk(arr, size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr;
}

function mainController($scope, $http) {
    $scope.todoData = {};
    $scope.categoryData = {};


    // page init functions; get all TODOs and Categories
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
      // when landing on the page, get all categories and show them
      $http.get('/api/categories')
          .success(function(data) {
              $scope.categoriesChunked = chunk(data,4);
              $scope.categories = data;
              console.log(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });


    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.todoData)
            .success(function(data) {
                $scope.todoData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // when submitting the add form, send the text to the node API
    $scope.createCategory = function() {
        $http.post('/api/category', $scope.categoryData)
            .success(function(data) {
                $scope.categoryData = {}; // clear the form so our user is ready to enter another
                $scope.categories = chunk(data,4);
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // when submitting the add form, send the text to the node API
    $scope.filterByCategory = function(categoryId) {
      // page init functions; get all TODOs and Categories
      let url = '/api/todos';

      //TODO: clean this up
      if(categoryId != null && categoryId.length > 0) {
        url='/api/todos/?category=' + categoryId;
      }
      $http.get(url)
          .success(function(data) {
            console.log("This is some data");
            console.log(data);
              $scope.todos = data;
              console.log(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
    };
}
