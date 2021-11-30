const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');

const program = "const a = 'hello world'";
const ASTree = esprima.parseScript(program);

console.log('ast:', ASTree);

estraverse.traverse(ASTree, {
    enter(node) {
        changeAToB(node);
    }
});

function changeAToB(node) {
    if (node.type === 'Identifier') {
        node.name = 'b';
    }
}
 
const ASTreeAfterChange = escodegen.generate(ASTree);
console.log(ASTreeAfterChange); // const b = 'hello world'