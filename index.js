var postcss = require('postcss');

module.exports = postcss.plugin('postcss-pseudo-content-insert', function (opts) {
    opts = opts || {};

    // Define the pseudo elements to look for
    var customPseudoExp = /(.*::?)(after|before)$/;

    return function (css, result) {

        // Step over each rule
        css.walkRules(function(rule) {

            // Set flag to false
            var hasContent = false;

            // Check if the rule selector matches customPseudoExp
            if(customPseudoExp.test(rule.selector)) {
                // Loop over declarations of the rule
                rule.walkDecls(function transformDecl(decl) {
                    // If the property = content, assign flag to true
                    if(decl.prop == 'content')
                        hasContent = true;
                });

                // If flag is still false, append an empty content
                if(!hasContent)
                    rule.append({
                        prop:'content',
                        value: "''"
                    });
            }
        });

    };
});
