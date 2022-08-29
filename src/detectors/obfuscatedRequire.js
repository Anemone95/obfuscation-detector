// noinspection JSValidateJSDoc

const obfuscationName = 'obfuscatedRequire';

/**
 * Function To Array obfuscation type has the following characteristics:
 * - A variable A assigned to a call expression with a function for a callee.
 * - All references to variable A are objects of member expressions.
 *
 * @param {ASTNode[]} flatTree
 * @return {string} The obfuscation name if detected; empty string otherwise.
 */
function detectFunctionToArrayReplacemets(flatTree) {
    let evalNode=flatTree.filter(n =>
        n.type === 'CallExpression'
        && n.callee?.name==="require"
        && n.arguments.length==1
    )
    for (const astNode of evalNode) {
        let arg=astNode.arguments[0];
        if (arg.type==="CallExpression" && arg.arguments.length>0 && Number.isInteger(arg.arguments[0].value)){
            return obfuscationName
        } else if (arg.end-arg.start>1000) {
            return obfuscationName
        }
    }
    return '';
}

try {
    module.exports = detectFunctionToArrayReplacemets;
} catch {}
