# Edge Case Explorer

Describe a feature you are building or testing. Get a structured checklist of edge cases worth thinking about: universal ones, plus cases matched to the kind of feature it is. Mark what you have considered and copy the record.

## Why this exists

Testing the happy path is the easy part to remember; the edges are what a checklist is for. Testers carry these lists in their heads; this tool writes the list down so the thinking can start earlier and be shared.

## What it does

- **Universal cases.** Empty states, maximum limits, unusual text, error handling, flaky networks, double actions, interruptions, small screens and keyboard-only use: the cases almost every feature has.
- **Feature-matched cases.** Keyword matching against nine feature types (login, payment, upload, search, forms, messaging, lists, scheduling, AI features) adds the cases that type tends to have: lockouts on login, no-duplicate-charge on payment retry, timezone traps on scheduling, malformed model output on AI features, and so on. Matches are shown and tagged so wrong matches are easy to remove.
- **Your record.** Each case can be marked Considered / Not applicable / Still to test, with notes on the ones left open, copied out as a clean record. Cases the list missed can be added by hand. The record never totals and never scores coverage.

## Privacy

Everything runs in the page on your device. Nothing you type is sent anywhere, saved, or kept after you leave.

## What this tool does not do

- It is a thinking aid, not coverage. A fully marked list does not mean the feature is well tested.
- Keyword matching misses feature types it does not know, and can match the wrong one. Remove what does not fit.
- It does not run anything against your product and cannot see your actual screens or flows.
- It never scores your testing and never says whether the feature is ready.

## Testing

The matching and checklist logic is tested against generic descriptions (universal cases only, no false feature matches), single-type descriptions (payment, login, upload, search, forms, messaging, scheduling, AI), multi-type descriptions, and duplicate-case dedupe, including the negative cases that must stay generic.

## Status and roadmap

v1. Ideas under consideration: saving checklists per feature, team-sharing a record, more feature types from real testing notes.

## Credits

Maintained by Shivangi Priya.
