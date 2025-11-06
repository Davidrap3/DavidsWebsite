# Templates for Adding Content

Use these templates when adding new content to your website. Just copy and paste, then fill in your information.

---

## 📷 Gallery Artwork Template

Copy this and add it to `client/public/data/gallery.json`:

```json
,
{
    "id": 7,
    "src": "images/testingImages/YOUR-IMAGE-NAME.jpg",
    "title": "Artwork Title",
    "description": "Brief description of the artwork",
    "dimensions": "Width x Height (or W x H x D for 3D)",
    "year": "2024",
    "medium": "Materials used (e.g., Wire and clay)"
}
```

**Instructions:**
1. Change `id` to the next available number
2. Replace `YOUR-IMAGE-NAME.jpg` with your actual filename
3. Fill in your artwork details
4. Make sure there's a comma before the `{` (if adding between items)

---

## 🎠 Carousel Artwork Template

Copy this and add it to `client/public/data/carousel.json`:

```json
,
{
    "id": 4,
    "artName": "Artwork Title",
    "artImage": "images/testingImages/YOUR-IMAGE-NAME.jpg",
    "description": "Text",
    "details": [
        {
            "dimensions": "Width x Height",
            "concept": "Main artistic concept",
            "year": " 2024"
        }
    ]
}
```

**Instructions:**
1. Change `id` to the next available number
2. Replace `YOUR-IMAGE-NAME.jpg` with your actual filename
3. Keep the space before the year (` 2024` not `2024`)
4. Update all the text fields

---

## 📝 Full Example: Adding "Sunset Dreams"

Let's say you're adding a new sculpture called "Sunset Dreams". Here's the complete process:

### 1. Image File
Save your photo as: `sunset-dreams-2024.jpg`
Place it in: `client/public/images/testingImages/`

### 2. Add to Gallery
In `gallery.json`, add:

```json
,
{
    "id": 7,
    "src": "images/testingImages/sunset-dreams-2024.jpg",
    "title": "Sunset Dreams",
    "description": "A vibrant sculpture capturing the warm colors and peaceful feeling of sunset",
    "dimensions": "26 x 32",
    "year": "2024",
    "medium": "Wire, clay, and recycled materials"
}
```

### 3. Add to Carousel (Optional)
In `carousel.json`, add:

```json
,
{
    "id": 4,
    "artName": "Sunset Dreams",
    "artImage": "images/testingImages/sunset-dreams-2024.jpg",
    "description": "Text",
    "details": [
        {
            "dimensions": "26 x 32",
            "concept": "Warmth and Tranquility",
            "year": " 2024"
        }
    ]
}
```

### 4. Publish
```bash
git add .
git commit -m "Added Sunset Dreams artwork"
git push
cd client
npm run deploy
```

---

## 🎨 Complete Gallery File Example

Here's what a complete `gallery.json` file looks like with 3 artworks:

```json
[
    {
        "id": 1,
        "src": "images/testingImages/samurai.jpg",
        "title": "Samurai",
        "description": "Wire art sculpture depicting a samurai warrior",
        "dimensions": "24 x 36",
        "year": "2023",
        "medium": "Wire and clay"
    },
    {
        "id": 2,
        "src": "images/testingImages/abstract-form.jpg",
        "title": "Abstract Form",
        "description": "Abstract sculpture exploring form and negative space",
        "dimensions": "30 x 40",
        "year": "2023",
        "medium": "Recycled materials"
    },
    {
        "id": 3,
        "src": "images/testingImages/ocean-waves.jpg",
        "title": "Ocean Waves",
        "description": "Flowing sculpture inspired by ocean movement",
        "dimensions": "35 x 28",
        "year": "2024",
        "medium": "Wire and clay"
    }
]
```

**Key things to notice:**
- Starts with `[` and ends with `]`
- Each artwork is wrapped in `{ }`
- Commas between artworks, but NOT after the last one
- All text is in quotes `"like this"`

---

## 📋 Site Content Template

If you want to update your bio in `siteContent.json`:

```json
{
    "artistInfo": {
        "artistName": "The Golden Sail",
        "title": "My Canvas",
        "specialty": "Short description of what you specialize in",
        "description": "Your full bio text here. This appears on the homepage carousel and in the about section."
    },
    "gallery": {
        "title": "Gallery",
        "subtitle": "Tagline or description for your gallery page"
    }
}
```

---

## 🔍 Checking Your Work

Before publishing, check these things:

### ✅ Checklist
- [ ] Image file is in the correct folder
- [ ] Image filename in JSON matches exactly (including `.jpg` or `.png`)
- [ ] All text is in quotes `"like this"`
- [ ] Commas are between items, not at the end
- [ ] Every `{` has a matching `}`
- [ ] Every `[` has a matching `]`
- [ ] IDs are unique (no two artworks have the same ID)

### 🧪 Test Your JSON
Copy your entire JSON file and paste it here to check for errors:
https://jsonlint.com/

If it says "Valid JSON", you're good to go!

---

## 💡 Pro Tips

### Image Naming
Good: `sunset-dreams-2024.jpg`
Bad: `Photo May 15, 2024.JPG`

### Dimensions Format
- For 2D: `"24 x 36"` or `"24 x 36 inches"`
- For 3D: `"24 x 36 x 12 cm"`
- Be consistent with units

### Descriptions
Keep descriptions between 10-30 words. Too short seems empty, too long is hard to read.

### Years
Always use 4 digits: `"2024"` not `"24"`

---

## 🚨 Common Errors and Fixes

### Error: "Unexpected token"
**Problem:** Missing comma or quote
**Fix:** Check that every item has a comma after it (except the last)

### Error: "Images not showing"
**Problem:** Filename doesn't match
**Fix:** Make sure the filename in your JSON exactly matches the file in the folder

### Error: "Nothing showing up"
**Problem:** Missing brackets or wrong structure
**Fix:** Compare your file to the templates above

---

## 📞 When to Ask for Help

You should ask your developer friend if:
- The website won't load at all
- You get error messages when deploying
- Images aren't showing up even though filenames match
- You need to change the layout or styling
- You want to add new sections to the site

For simple content updates (text, images, artwork details), you can do it yourself using these templates!
