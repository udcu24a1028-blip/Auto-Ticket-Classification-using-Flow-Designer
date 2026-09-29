/**
 * Ticket classifier. Written in ES5 so the exact same logic runs in
 * Node (tests) and inside a ServiceNow Flow Designer script step.
 *
 * classifyIncident(shortDescription, description, config) -> result object
 */
function classifyIncident(shortDescription, description, config) {
  var text = ((shortDescription || '') + ' ' + (description || '')).toLowerCase();
  var best = null;
  var bestScore = 0;

  for (var i = 0; i < config.rules.length; i++) {
    var rule = config.rules[i];
    var score = 0;
    for (var k = 0; k < rule.keywords.length; k++) {
      if (text.indexOf(rule.keywords[k].toLowerCase()) !== -1) {
        // Longer (more specific) keywords weigh more than short generic ones.
        score += rule.keywords[k].length > 6 ? 2 : 1;
      }
    }
    // Strictly greater: on a tie the rule listed first in the config wins.
    if (score > bestScore) {
      bestScore = score;
      best = rule;
    }
  }

  var chosen = best || config.fallback;
  return {
    matched: !!best,
    rule: chosen.name,
    score: bestScore,
    category: chosen.category,
    subcategory: chosen.subcategory || '',
    assignment_group: chosen.assignment_group,
    urgency: chosen.urgency,
    impact: chosen.impact,
    needs_review: !best
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { classifyIncident: classifyIncident };
}
