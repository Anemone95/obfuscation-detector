// noinspection JSValidateJSDoc

const obfuscationName = 'eval_with_long_string';

/**
 * Function To Array obfuscation type has the following characteristics:
 * - A variable A assigned to a call expression with a function for a callee.
 * - All references to variable A are objects of member expressions.
 *
 * @param {ASTNode[]} flatTree
 * @return {string} The obfuscation name if detected; empty string otherwise.
 */
function detectFunctionToArrayReplacemets(flatTree) {
	let evalNode = flatTree.filter(n =>
		n.type === 'CallExpression'
		&& n.callee?.name === 'eval'
		&& n.arguments.length == 1
	);
	for (const astNode of evalNode) {
		let arg = astNode.arguments[0];
		if (arg.type === 'Literal' && arg.value.length > 1000) {
			return obfuscationName;
		} else if (arg.end - arg.start > 1000) {
			return obfuscationName;
		}
	}
	return '';
}

try {
	module.exports = detectFunctionToArrayReplacemets;
} catch {
}
