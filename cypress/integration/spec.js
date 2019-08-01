describe('AutoDeskTest', () => {
    beforeEach(() => {
        cy.visit('http://storybook.b360-dev.autodesk.com/current/iframe.html?id=dropdowntree--default');
    })

    context('Sanity Tests', () => {

        it(" Choose Root node", () => {
            firstSteps();
            cy.get('.SearchBox__input').should("be.visible");
            cy.get('.SearchBox__input').click();
            cy.get('.TreeNode__name').should("be.visible");
            cy.get('.TreeNode__name').click();
        });

        it("Check Buttons ", () => {
            firstSteps();
            cy.get('.SearchBox__input').click();
            cy.get('.Button--link').should("not.be.enabled");
            cy.get('.Button--link-secondary').click();
            cy.get('.DropdownTree__arrow').click();
            cy.get('.TreeNode__name').click();
            cy.get('.DropdownTree__arrow').click();
            cy.get('.Button--link-secondary').click();
        });

        it("Check the search function ", () => {
            firstSteps();
            searchForNode()
        });

        it("Cancel should close the dropdown and perform no action", () => {
            firstSteps();
            searchForNode()
            cy.get('.SearchBox__input').click();
            cy.get('.Button--link-secondary').click();
            cy.get('.SearchBox__input').should("not.be.empty");
        });

        it("Clear button should clear the selection", () => {
            firstSteps();
            searchForNode()
            cy.get('.SearchBox__input').click();
            cy.get('.Button--link').should("be.enabled");
            cy.get('.Button--link').click();
        });

        it("Click on all Nodes", () => {
            firstSteps();
            cy.get('.SearchBox__input').click();
            cy.get('.TreeNode__name').should("be.visible");
            cy.get('.TreeNode__inner').should("be.visible");

            var treeNodeElemants = getElementsByClassName('TreeNode__inner');
            var nodeExpand = searchTree(treeNodeElemants, 'SvgIcon TreeNodeExpandIcon__icon')
            var NodeAmount = nodeExpand.length;
        });
    })

    context('Execute Basic function against different resolutions', () => {
        // run the same test against different viewport resolution
        const sizes = ['iphone-6', 'ipad-2', [1024, 768]]
        sizes.forEach((size) => {
            it(`Exeute basic function on ${size} screen`, () => {
                if (Cypress._.isArray(size)) {
                    cy.viewport(size[0], size[1])
                } else {
                    cy.viewport(size)
                    firstSteps();
                    cy.get('.SearchBox__input').click();
                    cy.get('.Button--link').should("not.be.enabled");
                    cy.get('.Button--link-secondary').click();
                    cy.get('.DropdownTree__arrow').click();
                    cy.get('.TreeNode__name').click();
                    cy.get('.DropdownTree__arrow').click();
                    cy.get('.Button--link-secondary').click();
                }
            })
        })
    });
});

//External Function should be placed and import from commands.js file

const firstSteps = () => {
    cy.get('.DropdownTree__input-text').should("be.visible");
    cy.get('.DropdownTree__input-text').click();
    cy.get('.SearchBox__input').should("be.visible");
}

function searchForNode() {
    var ranNum = Math.floor((Math.random() * 8) + 1);
    cy.get('.SearchBox__input').type("Node " + ranNum);
    // cy.get('.SearchBox__input').should("not.be.empty");
    if (ranNum = 4) {
        var ranNum = Math.floor((Math.random() * 9) + 1);
    } else {
        cy.get('[data-testid=TreeSelection__node-header-node' + ranNum + ']').click();
    }

}

function searchTree(element, matchingTitle) {
    if (element.title == matchingTitle) {
        return element;
    } else if (element.children != null) {
        var i;
        var result = null;
        for (i = 0; result == null && i < element.children.length; i++) {
            result = searchTree(element.children[i], matchingTitle);
        }
        return result;
    }
    return null;
}


