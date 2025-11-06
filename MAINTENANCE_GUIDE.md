# Website Maintenance Guide

This guide will help you update your art catalog website without needing any coding knowledge. Everything you need to edit is in simple text files that you can modify with any text editor.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Adding New Artworks](#adding-new-artworks)
3. [Editing Existing Artworks](#editing-existing-artworks)
4. [Editing Text Content](#editing-text-content)
5. [Publishing Changes to GitHub](#publishing-changes-to-github)
6. [Important Tips](#important-tips)

---

## Getting Started

All the content for your website is stored in **JSON files** (simple text files). These files are located in:

```
client/public/data/
```

There are 3 files you'll work with:
- **`gallery.json`** - All the artwork pieces in your gallery
- **`carousel.json`** - Featured artworks that appear on the homepage carousel
- **`siteContent.json`** - Text content like your bio and page titles

Images are stored in:
```
client/public/images/testingImages/
```

---

## Adding New Artworks

### Step 1: Add Your Image

1. Take a photo of your artwork
2. Save it with a descriptive name (e.g., `ocean-wave-2024.jpg`)
3. Place it in the folder: `client/public/images/testingImages/`

### Step 2: Add to Gallery

1. Open the file: `client/public/data/gallery.json`
2. You'll see a list of artworks in this format:

```json
[
    {
        "id": 1,
        "src": "images/testingImages/testing1.jpg",
        "title": "Samurai",
        "description": "Wire art sculpture depicting a samurai warrior",
        "dimensions": "24 x 36",
        "year": "2023",
        "medium": "Wire and clay"
    }
]
```

3. Add your new artwork at the end (before the closing `]`):

```json
    ,
    {
        "id": 7,
        "src": "images/testingImages/ocean-wave-2024.jpg",
        "title": "Ocean Wave",
        "description": "A flowing sculpture inspired by the movement of ocean waves",
        "dimensions": "28 x 34",
        "year": "2024",
        "medium": "Wire and clay"
    }
```

**Important notes:**
- Add a comma `,` after the previous artwork's closing `}`
- Use the next number for `id` (if last artwork is 6, use 7)
- Make sure the image filename matches exactly what you saved
- Keep all the quotation marks `"` in place

### Step 3: Add to Homepage Carousel (Optional)

If you want this artwork to appear on the homepage carousel:

1. Open: `client/public/data/carousel.json`
2. Add a new entry in the same format:

```json
    ,
    {
        "id": 4,
        "artName": "Ocean Wave",
        "artImage": "images/testingImages/ocean-wave-2024.jpg",
        "description": "Text",
        "details": [
            {
                "dimensions": "28 x 34",
                "concept": "Fluid Movement",
                "year": " 2024"
            }
        ]
    }
```

---

## Editing Existing Artworks

### To Change Details

1. Open `client/public/data/gallery.json`
2. Find the artwork you want to edit
3. Change the text between the quotation marks:

**Before:**
```json
"title": "Samurai",
"description": "Wire art sculpture depicting a samurai warrior",
```

**After:**
```json
"title": "Warrior",
"description": "A detailed wire sculpture of an ancient warrior",
```

### To Remove an Artwork

1. Open `client/public/data/gallery.json`
2. Find the entire block for that artwork (from `{` to `}`)
3. Delete it completely
4. Remove the comma before or after it (don't leave two commas next to each other)

---

## Editing Text Content

### To Change Your Bio

1. Open: `client/public/data/siteContent.json`
2. Find the `"artistInfo"` section:

```json
{
    "artistInfo": {
        "artistName": "The Golden Sail",
        "title": "My Canvas",
        "specialty": "I specialize in Wire art using Clay and recycled materials and abstract concepts.",
        "description": "I've been sculpting professionally for eight years..."
    }
}
```

3. Update any text between the quotation marks
4. The `"description"` field appears both on the homepage carousel and the "My Canvas" section

### To Change Gallery Page Text

In the same file (`siteContent.json`), find:

```json
"gallery": {
    "title": "Gallery",
    "subtitle": "A collection of wire art sculptures using clay and recycled materials"
}
```

Change the text as needed.

---

## Publishing Changes to GitHub

Once you've made changes, you need to publish them to make them live on your website.

### Using GitHub Desktop (Easiest Method)

1. **Open GitHub Desktop**
2. **See your changes** - You'll see a list of files you modified
3. **Write a description** in the "Summary" box (e.g., "Added new Ocean Wave artwork")
4. **Click "Commit to main"**
5. **Click "Push origin"** to upload your changes

Your website will automatically update in a few minutes!

### Using Command Line (Alternative)

If you prefer using the command line:

```bash
# 1. See what you changed
git status

# 2. Add all your changes
git add .

# 3. Save your changes with a message
git commit -m "Added new artwork"

# 4. Upload to GitHub
git push
```

---

## Important Tips

### JSON File Rules

1. **Commas matter!**
   - Put commas between items in a list
   - Don't put a comma after the last item
   - Example:
   ```json
   [
       {"id": 1, "title": "First"},
       {"id": 2, "title": "Second"},
       {"id": 3, "title": "Third"}
   ]
   ```

2. **Keep quotation marks** - All text must be in quotes: `"like this"`

3. **Check your brackets** - Every `{` needs a closing `}`, every `[` needs a closing `]`

4. **Test your JSON** - If you want to make sure your file is valid, copy the contents and paste it into https://jsonlint.com/ to check for errors

### File Naming Best Practices

- Use lowercase letters
- Replace spaces with dashes: `ocean-wave.jpg` not `Ocean Wave.jpg`
- Avoid special characters except dashes and underscores
- Keep names descriptive but not too long

### Before Publishing

1. Save all your files
2. Double-check image filenames match exactly
3. Make sure all commas and brackets are in place
4. Test locally if possible (ask your developer friend to show you)

### Need Help?

If something isn't working:
1. Check that all quotation marks are in pairs
2. Make sure commas are only between items, not at the end
3. Verify image filenames match exactly (including `.jpg` or `.png`)
4. Use https://jsonlint.com/ to validate your JSON files

### Common Mistakes to Avoid

❌ **Don't do this:**
```json
{
    "title": "Artwork,    ← Extra comma
}
```

✅ **Do this:**
```json
{
    "title": "Artwork"
}
```

---

❌ **Don't do this:**
```json
"src": images/photo.jpg    ← Missing quotes
```

✅ **Do this:**
```json
"src": "images/photo.jpg"
```

---

## Quick Reference

### Adding One Artwork

1. Add image to `client/public/images/testingImages/`
2. Edit `client/public/data/gallery.json` - add new entry
3. (Optional) Edit `client/public/data/carousel.json` - add to carousel
4. Commit and push to GitHub

### Editing Text

1. Edit `client/public/data/siteContent.json`
2. Change text between quotation marks
3. Commit and push to GitHub

### File Locations Quick List

| What to Edit | File Location |
|-------------|---------------|
| Gallery artworks | `client/public/data/gallery.json` |
| Homepage carousel | `client/public/data/carousel.json` |
| Bio and page text | `client/public/data/siteContent.json` |
| Images | `client/public/images/testingImages/` |

---

**Remember:** Always save your files before committing to GitHub, and don't be afraid to ask your developer friend if you get stuck!
