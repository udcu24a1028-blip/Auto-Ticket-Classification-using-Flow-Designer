# Auto Ticket Classification using Flow Designer

A school IT helpdesk receives many incident requests daily from students and teachers
(Wi-Fi issues, projector failures, password problems, slow computers). Staff currently
review each request manually. This project automatically classifies new incidents and
routes them to the right team using a ServiceNow **Flow Designer** flow.

> **Note:** This project was generated from the document title and the opening of the
> problem statement only. Categories, groups and priorities are reasonable assumptions;
> adjust `config/categories.json` to match your full requirements.

## How it works
1. A new Incident is created.
2. The flow runs a script step that scans the short description and description for keywords.
3. The best-matching rule sets **category, subcategory, urgency, impact and assignment group**
   and adds a work note.
4. Tickets with no match go to the Service Desk flagged for manual review.

| Rule | Category | Assignment group |
|------|----------|------------------|
| wifi | network | Network Support |
| projector | hardware | AV Support |
| password | inquiry | Service Desk |
| slow_computer | hardware | Desktop Support |
| (no match) | inquiry | Service Desk (manual review) |

## Project structure
```
Complete-Project/
├── README.md
├── .gitignore
├── package.json
├── config/categories.json        # rules: keywords, categories, groups, priorities
├── src/classifier.js             # ES5 classification logic (Node + ServiceNow)
├── scripts/build.js              # inlines config + logic into one paste-ready script
├── dist/flow_action_script.js    # generated script for the Flow Designer step
├── data/sample_incidents.json    # sample tickets used by the tests
├── test/classifier.test.js       # unit tests (node:test)
├── docs/flow-design.md           # step-by-step Flow Designer setup
└── update-set/                   # place your exported update set XML here
```

## Getting started
```bash
npm test          # run the unit tests (Node 18+, no dependencies)
npm run build     # regenerate dist/flow_action_script.js after editing the config
```
Then follow `docs/flow-design.md` to create the flow in your instance.

## Extending
Add a rule to `config/categories.json` (name, category, keywords, group, urgency, impact),
add a sample to `data/sample_incidents.json`, run `npm test` and `npm run build`.
