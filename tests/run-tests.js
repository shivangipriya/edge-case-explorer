'use strict';
// Tests case matching against the README's Testing section: generic
// descriptions stay universal-only, each feature type matches, multi-type
// descriptions match several, duplicates are removed, negatives stay generic.
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const prefix = script.slice(0, script.indexOf('// ===PARSE-END==='));
const { exploreCases, UNIVERSAL } = new Function(prefix + '; return { exploreCases, UNIVERSAL };')();

let pass = 0, fail = 0;
function check(name, cond) {
  if (cond) { pass++; console.log('ok   ' + name); }
  else { fail++; console.log('FAIL ' + name); }
}

const generic = exploreCases('A settings screen with a save button');
check('generic description matches no feature type', generic.matched.length === 0);
check('generic description returns universal cases only', generic.cases.length === UNIVERSAL.length && generic.cases.every((c) => c.cat === 'Universal'));

const singles = [
  ['A login page with password and OTP', 'login'],
  ['Checkout with card payment and UPI refunds', 'payment'],
  ['Upload photos and attachments', 'upload'],
  ['Search, filter and sort the catalogue', 'search'],
  ['An onboarding form with survey questions', 'form'],
  ['Notifications over WhatsApp and SMS', 'messaging'],
  ['An activity feed with order history', 'list'],
  ['Calendar booking with appointment slots', 'scheduling'],
  ['An AI chatbot that summarizes articles', 'ai'],
];
for (const [desc, tag] of singles) {
  const r = exploreCases(desc);
  check('single type "' + tag + '" is matched', r.matched.length === 1 && r.matched[0] === tag);
  check('single type "' + tag + '" adds its own cases', r.cases.some((c) => c.cat === tag));
}

const multi = exploreCases('Chat with friends and pay them in the app');
check('multi-type description matches both types', multi.matched.includes('payment') && multi.matched.includes('messaging'));

const dupes = exploreCases('Payment checkout with refund and invoice, payment again, more payment');
const texts = dupes.cases.map((c) => c.text.toLowerCase());
check('duplicate cases are removed', new Set(texts).size === texts.length);

check('every case carries a category tag', exploreCases('A login form with payments and reminders').cases.every((c) => typeof c.cat === 'string' && c.cat.length > 0));

console.log('\n' + (pass + fail) + ' cases, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
