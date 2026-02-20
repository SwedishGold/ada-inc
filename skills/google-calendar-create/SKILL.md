# Google Calendar Event Creation Skill

## Purpose
Create events in Google Calendar using gog CLI.

## How to Use

### Basic Command
```bash
gog calendar create primary --summary "Event Title" --from "YYYY-MM-DDTHH:MM:SS+01:00" --to "YYYY-MM-DDTHH:MM:SS+01:00" --description "Event description"
```

### Examples

**LinkedIn Post:**
```bash
gog calendar create primary --summary "Ada Inc. LinkedIn - Philosophy" --from "2026-02-23T09:00:00+01:00" --to "2026-02-23T09:15:00+01:00" --description "Post about AI philosophy. Hashtags: #AI #Innovation #Sweden"
```

**X Post:**
```bash
gog calendar create primary --summary "Ada Inc. X Post - Morning" --from "2026-02-23T08:00:00+01:00" --to "2026-02-23T08:10:00+01:00" --description "X post morning. Hashtags: #AI #Innovation"
```

**Standup:**
```bash
gog calendar create primary --summary "Ada Inc. Standup" --from "2026-02-23T09:00:00+01:00" --to "2026-02-23T09:05:00+01:00" --description "Daily standup"
```

## Key Points
- Always use RFC3339 format: `YYYY-MM-DDTHH:MM:SS+01:00`
- Use timezone `+01:00` for Stockholm
- Use `primary` as calendar ID for main calendar
- Description can include hashtags and links

## Posting Schedule Template

### LinkedIn (3-4 posts/week)
| Day | Time | Type |
|-----|------|------|
| Monday | 09:00 | Philosophy |
| Tuesday | 12:00 | Product Demo |
| Wednesday | 18:00 | Personal Story |
| Thursday | 09:00 | Industry News |
| Friday | 15:00 | Community Question |

### X/Twitter (5-10 posts/week)
| Day | Time | Type |
|-----|------|------|
| Morning | 08:00 | Morning post |
| Afternoon | 15:00 | Afternoon post |
| Evening | 20:00 | Evening post |
