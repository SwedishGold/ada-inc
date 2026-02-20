# Google Workspace Skills (Gmail, Calendar, Drive)

## Gmail

### Search emails
```bash
gog gmail search "from:github.com"
gog gmail search "subject:IVO"
```

### Read email
```bash
gog gmail get <messageId>
```

### Send email
```bash
gog gmail send --to "email@example.com" --subject "Subject" --body "Body text"
```

---

## Google Calendar

### Create event
```bash
gog calendar create primary --summary "Title" --from "2026-02-23T09:00:00+01:00" --to "2026-02-23T09:15:00+01:00" --description "Description"
```

### List events
```bash
gog calendar events --from 2026-02-23 --to 2026-02-24
```

---

## Google Drive

### List files
```bash
gog drive ls
gog drive ls <folderId>
```

### Upload file
```bash
gog drive upload /path/to/file.txt
gog drive upload /path/to/file.txt --parent <folderId>
```

### Download file
```bash
gog drive download <fileId>
```

### Create folder
```bash
gog drive mkdir "Folder Name"
```

### Search
```bash
gog drive search "filename"
```


---

## Posting Schedule

### LinkedIn (3-4 posts/week)
| Day | Time | Content |
|-----|------|---------|
| Monday | 09:00 | Philosophy |
| Tuesday | 12:00 | Product |
| Wednesday | 18:00 | Personal |
| Thursday | 09:00 | Industry |
| Friday | 15:00 | Community |

### X/Twitter (5-10 posts/week)
| Day | Time | Content |
|-----|------|---------|
| Morning | 08:00 | Morning post |
| Afternoon | 15:00 | Afternoon post |
| Evening | 20:00 | Evening post |

