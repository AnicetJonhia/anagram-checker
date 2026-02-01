# AI_USAGE.md - How I built this

**Project:** Anagram Checker  
**Tools:** v0.dev (for UI), Claude/Copilot (for logic)
**Date:** Feb 2026

I used AI to speed up the dev process, mostly for the UI and the boring parts of the anagram algo. Here is the honnest process:

---

## 1. UI First with v0.dev
**What I did:**
I literaly took the PDF requierments and some screenshots of the task and pasted them into **v0.dev**. 
**The Prompt was somthing like:** 
> "Build a Next.js app for an Anagram Checker based on these rules: Real-time search, responsive design, shadcn components. Need a main page and a history page. Use tailwind."

**Result:** v0 gave me a great visual base, but the code was all in one big file. I had to manually split everything to respect the "Core Logic separated" rule from the PDF.

---

## 2. Logic & Algos (Claude/Copilot)
I used Claude to discuss the best way to handle the 100k words list.

**Prompts (with typos included lol):**
- *"How to load 100k words wordlist.txt in Nextjs without killing the browser performence? Shoud I use a Set or a Map?"*
- *"write a function to find anagrams but it needs to be fast. i want to sort the letters of each word to compare them. is that the best way?"*
- *"help me with the history state, i want to save it to localstorage but only if the word is valid and not a duplicate."*

---

## 3. What I actually did vs what AI did

| Task | AI (v0/Claude) | Me (Manual Work) |
| :--- | :---: | :---: |
| UI Prototype | 80% | 20% (fixing layout, colors) |
| Core Anagram Algo | 50% | 50% (optimizing & testing) |
| Project Structure | 10% | 90% (moving logic to `/lib`, components to `/components`) |
| State Management | 30% | 70% (fixing bugs in history & reset button) |
| Responsivness | 90% | 10% (final tweaks) |

---

