angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/typeahead/typeahead.html","<!--<script type=\'text/javascript\'>\n    angular.module(\'typeahead\').controller(\'TypeaheadController\', [\'$scope\', \'$http\', function ($scope, $http) {\n        $scope.getItem = {\n            readOnly: true\n        };\n        $scope.init = function(category, name) {\n          console.log(\'init is called\', category);\n            $scope.getItem.category = category;\n          $scope.getItem.name = name;\n        };\n        $scope.items = [];\n        $scope.fetchResult = function () {\n            $http.post(\'http://www.networknt.com/api/rs\', $scope.getItem)\n                    .success(function (result, status, headers, config) {\n                        $scope.items = result;\n                        console.log(\'items\', $scope.items);\n                    })\n        };\n        $scope.fetchResult();\n    }]);\n</script>-->\n<div class=\"form-group {{form.htmlClass}}\" ng-class=\"{\'has-error\': hasError()}\">\n    <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n    \n    <div ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\">\n        <span ng-if=\"form.fieldAddonLeft\"\n              class=\"input-group-addon\"\n              ng-bind-html=\"form.fieldAddonLeft\"></span>\n        <input ng-show=\"form.key\"\n               type=\"text\"\n               class=\"form-control {{form.fieldHtmlClass}}\"\n               schema-validate=\"form\"\n               ng-model=\"$$value$$\"\n               typeahead-template-url=\"{{form.typeaheadTemplate}}\"\n               typeahead=\"{{form.typeahead}}\"\n               typeahead-on-select=\"{{form.typeaheadOnSelect}}\"\n               name=\"{{form.key.slice(-1)[0]}}\"\n               autocomplete=\"off\" />\n        <span ng-if=\"form.fieldAddonRight\"\n              class=\"input-group-addon\"\n              ng-bind-html=\"form.fieldAddonRight\"></span>\n    </div>\n    <span class=\"help-block\" sf-message=\"form.description\"></span>\n</div>");}]);
angular.module('schemaForm').config(
        ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
            function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

                var typeahead = function (name, schema, options) {
                    if (schema.type === 'string' && schema.format === 'typeahead') {
                        var f = schemaFormProvider.stdFormObj(name, schema, options);
                        f.key = options.path;
                        f.type = 'typeahead';
                        options.lookup[sfPathProvider.stringify(options.path)] = f;
                        return f;
                    }
                };

                schemaFormProvider.defaults.string.unshift(typeahead);

                //Add to the bootstrap directive
                schemaFormDecoratorsProvider.addMapping(
                        'bootstrapDecorator',
                        'typeahead',
                        'directives/decorators/bootstrap/typeahead/typeahead.html'
                        );
                schemaFormDecoratorsProvider.createDirective(
                        'typeahead',
                        'directives/decorators/bootstrap/typeahead/typeahead.html'
                        );
            }
        ]);
        