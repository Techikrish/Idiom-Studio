import { androidRules } from './android.mjs';
import { crossRules } from './cross.mjs';
import { iosRules } from './ios.mjs';
import { projectRules } from './project.mjs';

export const rules = [...projectRules, ...iosRules, ...androidRules, ...crossRules];

export const ruleById = new Map(rules.map((rule) => [rule.id, rule]));
