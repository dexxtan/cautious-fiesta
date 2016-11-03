var todoListApp = angular.module('todoListApp', []);

todoListApp.controller('TodoListController', function TodoListController($scope) {
  $scope.newProject = '';

  // prefill arrays with some elements
  $scope.todos = ['Project 1', 'Project 2', 'Project 3', 'Project 4'];
  $scope.inProgresses = ['Project 5', 'Project 6', 'Project 7'];
  $scope.dones = ['Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12'];

  $scope.handleKeyEvents = function(event) {
    // enter key
    if (event.keyCode === 13) {
      $scope.addNewProject();
    }
  };

  $scope.addNewProject = function() {
    $scope.todos.push($scope.newProject);
    $scope.newProject = '';
  };

  $scope.transferToIndex = function(source, dest) {
    source = source.split('-');
    var sourceArrayName = source[0];
    var sourceIndex = source[1];
    dest = dest.split('-');
    var destArrayName = dest[0];
    var destIndex = dest[1];
    if (sourceArrayName === destArrayName && destIndex > 0) {
      destIndex--;
    }

    $scope.$apply(function() {
      var projectToMove = $scope[sourceArrayName].splice(sourceIndex, 1)[0];
      $scope[destArrayName].splice(destIndex, 0, projectToMove);
    });
  };
});

todoListApp.directive('todoDraggable', function draggable() {
  return {
    restrict: 'A',
    scope: {
      transferToIndex: '&'
    },
    link: function(scope, el) {
      angular.element(el).attr('draggable', 'true');
      el.bind('dragstart', function(e) {
        var sourceId = angular.element(el).attr('id');
        e.dataTransfer.setData('sourceId', sourceId);
      });
    }
  };
});

todoListApp.directive('todoDroppable', function droppable() {
  return {
    restrict: 'A',
    link: function(scope, el) {
      el.bind('dragover', function(e) {
        e.preventDefault();
      });
      el.bind('dragenter', function(e) {
        angular.element(e.target).addClass('dragover');
      });
      el.bind('dragleave', function(e) {
        angular.element(e.target).removeClass('dragover');
      });
      el.bind('drop', function(e) {
        var target = angular.element(e.target);
        target.removeClass('dragover');
        var sourceId = e.dataTransfer.getData('sourceId');
        var targetId = target.attr('id');
        scope.transferToIndex(sourceId, targetId);
      });
    }
  };
});