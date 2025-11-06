# Welcome to Your Art Catalog Website! 🎨

This website showcases your wire art sculptures. You can easily update it yourself without any coding knowledge!

---

## 🚀 Quick Start

**New to this?** Start here:
1. Read: [QUICK_START.md](QUICK_START.md) - Fast 3-step guide to add artwork
2. Read: [MAINTENANCE_GUIDE.md](MAINTENANCE_GUIDE.md) - Complete guide with all details

**Need templates?**
- [TEMPLATES.md](TEMPLATES.md) - Copy-paste templates for adding content

**Setting up hosting?**
- [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md) - How to publish your site for free

---

## 📁 What You Need to Know

### Where Your Content Lives

All your artwork information is in simple text files (JSON format):

| File | What It Does |
|------|-------------|
| `client/public/data/gallery.json` | All your gallery artworks |
| `client/public/data/carousel.json` | Featured pieces on homepage |
| `client/public/data/siteContent.json` | Your bio and page text |
| `client/public/images/testingImages/` | Your artwork photos |

### What You Can Update

✅ Add new artworks
✅ Edit artwork titles, descriptions, dimensions
✅ Change your bio
✅ Update page text
✅ Add/remove images
✅ Feature different pieces on the homepage

### What You Can't Update (Need Developer)

❌ Change website colors or fonts
❌ Modify page layouts
❌ Add new pages
❌ Change navigation menu
❌ Modify contact form

---

## 🎯 Common Tasks

### Adding a New Artwork

1. **Add photo** to `client/public/images/testingImages/`
2. **Edit** `client/public/data/gallery.json`
3. **Copy template** from [TEMPLATES.md](TEMPLATES.md)
4. **Fill in** your artwork details
5. **Publish** using GitHub (see Quick Start)

**Time needed:** 5-10 minutes

### Updating Your Bio

1. **Edit** `client/public/data/siteContent.json`
2. **Change** the text in the `"description"` field
3. **Publish** to GitHub

**Time needed:** 2 minutes

### Featuring an Artwork on Homepage

1. **Edit** `client/public/data/carousel.json`
2. **Add** your artwork using the template
3. **Publish** to GitHub

**Time needed:** 5 minutes

---

## 📚 Documentation Guide

Choose the right guide for your needs:

### 🟢 Beginner Level
- **QUICK_START.md** - Super fast reference, assumes you've done it before
- **TEMPLATES.md** - Copy-paste templates with examples

### 🟡 Intermediate Level
- **MAINTENANCE_GUIDE.md** - Complete detailed guide with explanations
- **GITHUB_PAGES_SETUP.md** - How to host your website

### 🔴 Advanced (For Developer Friend)
- Technical documentation is in the original README.md
- Backend code in `server/api/`
- Frontend code in `client/src/`

---

## 🛠️ Tools You'll Need

### Essential
- **Text Editor** - Notepad (Windows), TextEdit (Mac), or [VS Code](https://code.visualstudio.com/)
- **GitHub Account** - Already set up
- **GitHub Desktop** OR Command Line - To publish changes

### Optional but Helpful
- **JSON Validator** - https://jsonlint.com/ (check for errors)
- **Photo Editor** - To resize/crop images before uploading

---

## ✅ Publishing Checklist

Before you publish changes, always check:

- [ ] Saved all edited files
- [ ] Image filenames match exactly in JSON
- [ ] All quotes `"` and commas `,` are in place
- [ ] Tested JSON files at jsonlint.com
- [ ] Images are in the correct folder

Then publish:
```bash
git add .
git commit -m "Describe what you changed"
git push
```

---

## 🆘 Troubleshooting

### Images Not Showing
- Check filename matches exactly (case-sensitive!)
- Make sure image is in `client/public/images/testingImages/`
- Verify path starts with `images/` not `/images/`

### Text Not Updating
- Make sure you saved the file
- Check you edited the right file (gallery.json, not carousel.json)
- Verify you pushed changes to GitHub
- Wait 2-3 minutes after deploying

### Website Won't Load
- Check GitHub Pages is enabled in repository settings
- Wait 5-10 minutes after first deploy
- Clear your browser cache and refresh

### "Invalid JSON" Error
- Copy your JSON file content to https://jsonlint.com/
- It will show you exactly where the error is
- Common issues: missing comma, extra comma, missing quote

---

## 💡 Best Practices

### File Organization
- Name images descriptively: `sunset-dreams-2024.jpg`
- Use consistent naming: all lowercase with dashes
- Keep dimensions format consistent: `"24 x 36"` throughout

### Content Updates
- Make small changes and test often
- Write clear commit messages: "Added Ocean Wave sculpture"
- Keep backups of your JSON files

### Image Guidelines
- **Format:** JPG or PNG
- **Size:** Under 1MB per image (compress if needed)
- **Dimensions:** 1200-2000px wide is good for web
- **Quality:** Balance between size and quality

---

## 🎓 Learning Resources

### Understanding JSON
- JSON is just a way to structure data
- Everything is in quotes: `"like this"`
- Items in a list are separated by commas
- Tutorial: https://www.w3schools.com/js/js_json_intro.asp

### Using Git/GitHub
- Git is version control (saves history)
- GitHub is where your code lives online
- GitHub Desktop makes it easy: https://desktop.github.com/

### When Things Go Wrong
- Don't panic! Git saves all previous versions
- You can always undo changes
- Ask your developer friend for help

---

## 🎉 You've Got This!

Remember:
- Start with small changes
- Test one thing at a time
- Use the templates provided
- Check your work before publishing
- Don't be afraid to experiment (Git saves everything!)

**Most importantly:** You don't need to be a developer to maintain your own website!

---

## 📞 Getting Help

1. **Check the guides** - Most answers are in MAINTENANCE_GUIDE.md
2. **Validate your JSON** - Use jsonlint.com to find errors
3. **Review templates** - Make sure you're following the format
4. **Ask your developer friend** - For anything beyond content updates

---

## 📂 Project Structure at a Glance

```
DavidsWebsite/
│
├── 📘 README_FOR_OWNER.md ← You are here!
├── 📗 QUICK_START.md ← Start here for quick updates
├── 📙 MAINTENANCE_GUIDE.md ← Full guide
├── 📕 TEMPLATES.md ← Copy-paste templates
├── 📔 GITHUB_PAGES_SETUP.md ← Hosting guide
│
├── client/
│   ├── public/
│   │   ├── data/
│   │   │   ├── 📄 gallery.json ← Edit your artworks
│   │   │   ├── 📄 carousel.json ← Edit homepage carousel
│   │   │   └── 📄 siteContent.json ← Edit bio and text
│   │   └── images/
│   │       └── testingImages/ ← Add your photos here
│   └── src/ ← Don't edit (code files)
│
└── server/ ← Not needed for static site
```

---

**Last Updated:** When site was converted to static JSON files
**Maintained By:** You! (With help from your developer friend when needed)

Happy updating! 🎨✨
