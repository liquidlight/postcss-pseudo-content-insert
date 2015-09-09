var postcss = require('postcss');

module.exports = postcss.plugin('postcss-pseudo-content-insert',
function (opts) {
    opts = opts || {};

    // Removes an element from an array.
    // String value: the value to search and remove.
    // return: an array with the removed element; false otherwise.
    Array.prototype.remove = function(value) {
        var idx = this.indexOf(value);
        if (idx != -1) {
            return this.splice(idx, 1);
        }
        return false;
    }

    // Checks to see if a value exists in an array
    Array.prototype.hasValue = function(value) {
        var idx = this.indexOf(value);
        if (idx != -1) {
            return true;
        }
        return false;
    }

    // Define array for seelectors with missing content & present
    var contentAwaiting = [];
    var contentPresent = [];


    return function (css, result) {
        var customPseudoExp = /(.*::?)(after|before)$/;

        // Step over each rule
        css.walkRules(function (rule) {
            // If there is more than one selector, loop over each
            // and if there is content missing, add to array
            if(rule.selectors.length > 1) {
                rule.selectors.forEach(function(selector) {
                    var hasContent = false;
                    if(customPseudoExp.test(selector)) {
                        rule.walkDecls(function transformDecl(decl) {
                            // If the property = content, assign flag to true
                            if(decl.prop === 'content')
                                hasContent = true;
                        });
                    }
                    if(!hasContent) {
                        if(!contentPresent.hasValue(selector))
                            contentAwaiting.push(selector);
                    } else {
                        if(!contentPresent.hasValue(selector))
                            contentPresent.push(selector);
                    }
                });
            }
        });

        // Step again
        css.walkRules(function (rule) {
            // Loop again, this time only rules that have 1 selector
            // only. If content is missing, add it.
            // Then remove the selector from the contentAwaiting array
            if(rule.selectors.length == 1) {
                var hasContent = false;
                if(customPseudoExp.test(rule.selector)) {
                    rule.walkDecls(function transformDecl(decl) {
                        // If the property = content, assign flag to true
                        if(decl.prop === 'content')
                            hasContent = true;
                    });
                }
                if(!hasContent)
                    rule.append({ prop: 'content', value: '\'\'' });

                // Remove the selector from contentAwaiting array
                contentAwaiting.remove(rule.selector)

            }
        });

        // If there is stuff left without a content block, let the user know!
        if(contentAwaiting.length) {
            var contentAwaitingSt = contentAwaiting.join(', ');
             result.warn('The following selectors do not have any content associated with them: ' + contentAwaitingSt);
        }


    };
});
