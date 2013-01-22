'use strict';

angular.module('pbComponents', [])
    /**
     * @ngdoc directive
     * @name ngTreeBtn
     *
     * @description
     * The 'ngTreeBtn' directive instantiates a template with the multi-select drop-down.
     * Drop-down is marked up as a Bootstrap button with a caret.
     * Checked state of options is kept in local object checkMarks
     *
     * @element - any
     * @param ng-tree-btn - data object with dropdown options tree;
     *     each leaf of the tree is selectable and has to have an "id" property.
     * @param label - the text on the button
     * @param btnCls - additional style class(es) for the button
     * @param callback - function which takes selection results as object with
     *     property names as tree leaves' ids and values as boolean "checked" status
     *     example of result argument passed to callback: {"123":true,"763":false,"2":true}
     * @param enabled - function used to determine enabled/disabled state
     *
     * @author pbosin
     */
    .directive('ngTreeBtn', function () {
        return {
            scope: {
                options: '=ngTreeBtn',
                handleRes: '&callback',
                label: '@',
                isEnabled: '&'
            },
            controller: function($scope, $attrs) {

                $scope.btnCls = $attrs.btncls;

                $scope.hasChildren = function (item) {
                    return (typeof(item.items) !== "undefined" && item.items.length > 0);
                };

                $scope.toggleDrop = function () {
                    if ($scope.isEnabled()) {
                        $scope.opened = !$scope.opened;
                    }
                };

                function isChecked (obj) {
                    var i;
                    if (!obj || typeof(obj) === "undefined") {
                        return false;
                    }
                    if (typeof(obj.items) === "undefined" || obj.items.length == 0) {
                        //tree leaf
                        return typeof(obj.id) !== "undefined" && checkMarks[obj.id];
                    } else {
                        //traverse children
                        for (i in obj.items) {
                            if (! isChecked(obj.items[i])) {
                                return false;
                            }
                        }
                        return true;
                    }
                }
                $scope.checked = function (item) {
                    return isChecked(item);
                };

                function setItemCheck (obj, newState) {
                    var i;
                    if ($scope.hasChildren(obj)) {
                        for (i in obj.items) {
                            setItemCheck(obj.items[i], newState);
                        }
                    } else {
                        checkMarks[obj.id] = newState;
                    }
                }
                $scope.selectItem = function (obj) {
                    var newState = !isChecked(obj);
                    setItemCheck(obj, newState);
                    return false;
                };

                function saveResult(obj, result) {
                    var i;
                    if ($scope.hasChildren(obj)) {
                        for (i in obj.items) {
                            saveResult(obj.items[i], result);
                        }
                    } else {
                        result["" + obj.id] = checkMarks[obj.id];
                    }
                }
                $scope.confirmMulti = function () {
                    var result = {};
                    saveResult($scope.options,result);
                    $scope.toggleDrop();
                    $scope.handleRes({res:result});
                };

                function addChk(chks, item) {
                    var i;
                    if (typeof(item) !== "undefined" && $scope.hasChildren(item)) {
                        for (i in item.items) {
                            addChk(chks,item.items[i]);
                        }
                    } else {
                        chks[item.id] = (typeof(item.checked) !== "undefined" && item.checked);
                    }
                }
                function initChks(items) {
                    var chks = {}, i;
                    if (typeof(items) !== "undefined") {
                        for (i in items) {
                            addChk(chks,items[i]);
                        }
                    }
                    return chks;
                }
                var checkMarks = initChks($scope.options.items);
            },
            templateUrl: 'ng-tree-btn.html'
        }
    })

