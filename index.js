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

    // Function to check if
    Array.prototype.contentPresent = function(selector) {
        var hasContent = false;
        if(customPseudoExp.test(selector)) {
            rule.walkDecls(function transformDecl(decl) {
                // If the property = content, assign flag to true
                if(decl.prop === 'content')
                    hasContent = true;
            });
        }
        return hasContent;
    }

    // Define the pseudo elements to look for
    var customPseudoExp = /(.*::?)(after|before)$/;
    // Define array for seelectors with missing content
    var contentAwaiting = [];


    return function (css, result) {

        // Step over each rule
        css.walkRules(function (rule) {
            // If there is more than one selector, loop over each
            // and if there is content missing, add to array
            if(rule.selectors.length > 1) {
                rule.selectors.forEach(function(selector) {
                    if(!selector.contentPresent)
                        contentAwaiting.push(selector)
                });
            }
        });

        // Step again
        css.walkRules(function (rule) {
            // Loop again, this time only rules that have 1 selector
            // only. If content is missing, add it.
            // Then remove the selector from the contentAwaiting array
            if(rule.selectors.length == 1) {
                if(!rule.selector.contentPresent)
                    rule.append({ prop: 'content', value: '\'\'' });

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
