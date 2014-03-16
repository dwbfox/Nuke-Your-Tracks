angular.module('nuke.settings.settingUIButtons', []).
directive('cleanSetting', function() {
    return {
        restrict: 'A',
        link: function($scope, element, attributes) {
            $scope.$watch('$viewContentLoaded', function() {
                $(element).find('input').button();
            });  
        }
    };
});