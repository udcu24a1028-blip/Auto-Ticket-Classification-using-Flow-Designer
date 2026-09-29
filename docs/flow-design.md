# Building the flow in Flow Designer

**Flow name:** Auto Ticket Classification
**Application:** Global (or your scoped app)

## Trigger
- Type: **Created** on table **Incident**
- Condition: `Category` is empty (optional; avoids overriding manual choices)

## Actions
1. **Script step** (custom Action "Classify Incident")
   - Input: `incident_sys_id` (String) = Trigger > Incident Record > Sys ID
   - Script: paste the contents of `dist/flow_action_script.js`
   - Outputs: `rule`, `assignment_group`, `needs_review`
2. **If** `needs_review` is true
   - **Create Task / Send Notification** to Service Desk: "Ticket needs manual triage"
3. **Else** end the flow (the script already set category, urgency, impact, group and a work note)

## Prerequisites
Create these assignment groups (User Administration > Groups), names must match
`config/categories.json`: Network Support, AV Support, Service Desk, Desktop Support.

## Testing in the instance
1. Flow Designer > **Test**, choose an existing incident, run.
2. Or create incidents from `data/sample_incidents.json` and check category/group/work notes.
3. Review results in **Flow Designer > Executions**.

## Changing the rules
Edit `config/categories.json`, run `npm run build`, and paste the new
`dist/flow_action_script.js` into the Script step.
