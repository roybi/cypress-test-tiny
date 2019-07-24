[Cypress documentation is available here](https://docs.cypress.io/guides/overview/why-cypress.html).

# Installation

```javascript
npm install
```

# Run

```javascript
npm run cypress:open
``` 

# The Exercise

Your assignment is to write a Test Plan & implement those tests using Cypress. 
You should be testing DropdownTree component (will be visible when you run the Cypress command listed above) according to the following requirements:

1. The component shows a tree that contains nodes. Some of them have children.
2. You can only select one node.
3. You can select all nodes in the tree, even ones with children.
4. Expand/Collapse functionality is available when clicking on the arrow of the node which has children.
5. When clicking on the label of a node with children, it will select it and not expand/collapse.
6. Cancel should close the dropdown and perform no action.
7. Clear button should clear the selection.
