ng-tree-button is angularJS directive, which creates a drop-down button with
multiple-select options organized in a tree structure

     * The 'ngTreeBtn' directive instantiates a template with the multi-select drop-down.
     * Drop-down is marked up as a Bootstrap button with a caret.
     * Checked state of options is kept in local object checkMarks

parameters:
     * @param ng-tree-btn - data object with dropdown options tree;
     *     each leaf of the tree is selectable and has to have an "id" property.
     * @param label - the text on the button
     * @param btnCls - additional style class(es) for the button
     * @param callback - function which takes selection results as object with
     *     property names as tree leaves' ids and values as boolean "checked" status
     *     example of result argument passed to callback: {"123":true,"763":false,"2":true}
     *     this function is called when user clicks on "Confirm" button within the drop-down.
     * @param enabled - function used to determine enabled/disabled state

TODO:
- move css from demo index.html to ng-tree-btn.css
- add tests!
