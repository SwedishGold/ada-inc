# Pulse Cron Setup

## För att aktivera automatisk posting:

### 1. Öppna crontab:
```bash
crontab -e
```

### 2. Lägg till dessa rader:

```bash
# Pulse - Kolla mentions var 30:e minut
*/30 * * * * /Users/gggggg/.openclaw/workspace/ada-inc/scripts/pulse-mentions.sh

# Pulse - Posta morgon (08:00)
0 8 * * * /Users/gggggg/.openclaw/workspace/ada-inc/scripts/pulse-post.sh

# Pulse - Posta kväll (18:00)
0 18 * * * /Users/gggggg/.openclaw/workspace/ada-inc/scripts/pulse-post.sh
```

### 3. Spara och avsluta

## Manuell körning:
```bash
# Testa mentions-script
./scripts/pulse-mentions.sh

# Testa post-script  
./scripts/pulse-post.sh
```

## Loggar:
- mentions: output/pulse-mentions-YYYYMMDD.log
- posts: output/pulse-posts-YYYYMMDD.log
