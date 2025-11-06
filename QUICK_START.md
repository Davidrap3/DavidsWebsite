# Quick Start - Website Updates

## 📁 Files You'll Edit

- `client/public/data/gallery.json` - Your artwork catalog
- `client/public/data/carousel.json` - Homepage featured pieces
- `client/public/data/siteContent.json` - Bio and text
- `client/public/images/testingImages/` - Your artwork photos

---

## ➕ Adding New Artwork (3 Steps)

### 1. Add Photo
Put your image in: `client/public/images/testingImages/`

### 2. Edit gallery.json
Add at the end (before the final `]`):

```json
,
{
    "id": 7,
    "src": "images/testingImages/YOUR-IMAGE.jpg",
    "title": "Title Here",
    "description": "Description here",
    "dimensions": "Width x Height",
    "year": "2024",
    "medium": "Wire and clay"
}
```

### 3. Publish
```bash
git add .
git commit -m "Added new artwork"
git push
```

---

## ✏️ Editing Your Bio

Edit: `client/public/data/siteContent.json`

Change the text in quotes:
```json
"description": "YOUR BIO TEXT HERE"
```

---

## 🚀 Publishing to GitHub

**Option 1: GitHub Desktop**
1. Open GitHub Desktop
2. Add description in "Summary"
3. Click "Commit to main"
4. Click "Push origin"

**Option 2: Command Line**
```bash
git add .
git commit -m "Describe your changes"
git push
```

---

## ⚠️ Common Mistakes

❌ `"title": "Artwork,` ← Extra comma
✅ `"title": "Artwork"`

❌ Missing comma between items
✅ Always put `,` between items

❌ `src: images/photo.jpg` ← Missing quotes
✅ `"src": "images/photo.jpg"`

---

## 🆘 Need Help?

- Check your JSON: https://jsonlint.com/
- Make sure image filenames match exactly
- Check all quotes and commas
- Ask your developer friend!
