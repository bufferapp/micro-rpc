### Purpose
_High level description of what the new or modified functionality is._

### Impact
_What products/areas are potentially impacted by these changes?_
- [ ] Publish
- [ ] Analyze
- [ ] Reply
- [ ] Mobile
- [ ] Data Tracking
- [ ] Global Admin
- [ ] Buffer Admin
- [ ] Reply HQ
- [ ] Security (anything involving access tokens, exposing APIs, etc.)
- [ ] Other (please explain)

### Related Links 
_JIRA tickets, other PRs, Paper docs, etc._

### Priority
_If you're someone outside of the Core team, please describe the priority of this work for your product team.  For example is it blocking some other high priority work, is it a critical bug fix, is it needed for a scheduled release in a week, etc._

### Notes

### Review

#### Staging Deployment

---

### Instructions for Folks Outside of Core Creating PRs
- Please add at least one Core engineer as a reviewer
- Be sure to fill in the Purpose, Impact, and Priority sections above
- Ping the Core team in Slack (you can use @-core in #collab-analyze-core, #collab-reply-core, or #prod-core depending on what team you're in) to give a heads up that the PR is ready for review.  If the change is urgent/critical, include this context.
- Wait for a Core engineer to get back to you.  If the scope of the changes feels small and the risk feels low, the Core team may give you the green light to go ahead and merge the changes now and we'll circle back with the review afterwards.  If the changes feel more risky or have a broader impact, we may ask that you wait to merge the changes until someone from Core has had a chance to review the changes.
- After your changes have been merged and deployed, please monitor Bugsnag to see if any new errors are reported.

### Instructions for Core Engineers Added As Reviewers For PRs Created by Folks Outside of Core
- When a request for a code review comes in, do a quick assessment of whether this is a PR that Core needs to review before merging, and let the engineer know.
- If the change does require a Core engineer to do a code review before merging, work with the engineer (and the EMs/PMs if necessary) to determine the priority of this code review relative to Core's current priorities.  Clearly set expectations with the requestor about when the review will be completed.
- Review all code changes through the same lens as if the Core team were making these changes.  Remember that not all teams operate with the same processes depending on the lifecycle phase that their product is in, and that Core services shared between products need to be held to a quality bar that serves each of those products. 
