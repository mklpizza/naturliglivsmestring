# Vejledning til Naturliglivsmestring — Sådan vedligeholder du din hjemmeside

Denne vejledning forklarer trin for trin, hvordan du selv kan redigere din hjemmeside uden teknisk viden.

---

## Indholdsfortegnelse

1. [Rediger tekst på en eksisterende side](#1-rediger-tekst-på-en-eksisterende-side)
2. [Tilføj en ny side](#2-tilføj-en-ny-side)
3. [Opdater menuen](#3-opdater-menuen)
4. [Skift et billede](#4-skift-et-billede)
5. [Kontaktformular — opsætning og modtagelse af beskeder](#5-kontaktformular)
6. [Publicer ændringer online (Vercel)](#6-publicer-ændringer-online)

---

## 1. Rediger tekst på en eksisterende side

Alle tekstsider ligger som `.md`-filer i mappen:

```
naturliglivsmestring/
  content/
    pages/
      angst.md
      stress.md
      mistrivsel.md
      manipulation.md
      om-mig.md
```

**Sådan redigerer du en side:**

1. Åbn mappen `content/pages/` i din filhåndterer
2. Dobbeltklik på den `.md`-fil du vil redigere (fx `angst.md`)
3. Åbn filen med **Notepad** (Windows) eller **TextEdit** (Mac)
4. Rediger teksten nedenfor de tre streger (`---`) — det er her selve indholdet er
5. Gem filen med **Ctrl+S** (Windows) eller **Cmd+S** (Mac)

**Hvad de øverste linjer betyder (rør dem ikke):**

```
---
title: "Angst"             ← Overskrift på siden og i browserfanen
description: "..."         ← Kort beskrivelse (bruges af Google)
image: "https://..."       ← URL til billedet øverst på siden
imageAlt: "..."            ← Billedtekst til blinde brugere (behold den)
excerpt: "..."             ← Den korte sætning under overskriften
---
```

**Sådan formaterer du tekst i markdown:**

| Du skriver | Det vises som |
|-----------|--------------|
| `## Overskrift` | Stor overskrift |
| `### Underoverskrift` | Mindre overskrift |
| Normal tekst | Normal tekst |
| `**fed tekst**` | **fed tekst** |
| `*kursiv tekst*` | *kursiv tekst* |
| `- Punkt` | • Punkt (liste) |

---

## 2. Tilføj en ny side

1. Gå til mappen `content/pages/`
2. Kopiér en eksisterende fil, fx `stress.md`
3. Giv den et nyt navn med **kun små bogstaver og ingen mellemrum** — fx `sorg.md`
4. Åbn filen og rediger indholdet (titel, beskrivelse, tekst)
5. Tilføj siden til menuen (se afsnit 3)

Din nye side vil automatisk være tilgængelig på adressen:
`https://dit-domæne.dk/sorg`

---

## 3. Opdater menuen

Menuen styres af filen:

```
naturliglivsmestring/
  content/
    navigation.json
```

Åbn filen i Notepad. Den ser sådan ud:

```json
{
  "items": [
    { "label": "Forside", "href": "/" },
    { "label": "Om mig", "href": "/om-mig" },
    {
      "label": "Emner",
      "children": [
        { "label": "Angst", "href": "/angst" },
        { "label": "Stress", "href": "/stress" }
      ]
    },
    { "label": "Kontakt", "href": "/kontakt" }
  ]
}
```

**Tilføj en ny side til "Emner"-menuen:**

Kopiér én af linjerne inden i `"children"` og tilpas den:

```json
{ "label": "Sorg", "href": "/sorg" }
```

Husk at sætte et komma efter den foregående linje. Det færdige resultat ser sådan ud:

```json
"children": [
  { "label": "Angst", "href": "/angst" },
  { "label": "Stress", "href": "/stress" },
  { "label": "Sorg", "href": "/sorg" }
]
```

**Tilføj en helt ny menuknap (uden dropdown):**

```json
{ "label": "Mit nye punkt", "href": "/min-nye-side" }
```

Gem filen, og menuen opdateres automatisk.

---

## 4. Skift et billede

### Mulighed A: Brug et billede fra din computer

1. Kopiér dit billede til mappen `public/images/` i projektet
2. Brug kun tal, bogstaver og bindestreger i filnavnet, fx `skov-billede.jpg`
3. Åbn den tilhørende `.md`-fil
4. Ændr `image`-linjen til:

```
image: "/images/skov-billede.jpg"
```

### Mulighed B: Brug en URL fra nettet (fx Unsplash)

1. Find et gratis billede på [unsplash.com](https://unsplash.com)
2. Højreklik på billedet → "Kopiér billedadresse"
3. Indsæt URL'en i `image:`-feltet i `.md`-filen:

```
image: "https://images.unsplash.com/photo-XXXXX?w=1200&auto=format"
```

---

## 5. Kontaktformular

### Opsætning (gøres én gang)

Din kontaktformular bruger en gratis tjeneste kaldet **Formspree**, der sender dig en e-mail, hver gang nogen udfylder formularen.

1. Gå til [formspree.io](https://formspree.io) og opret en gratis konto
2. Klik på **"New Form"** og navngiv den (fx "Naturliglivsmestring")
3. Du får et **Form ID** — det ligner: `xpwzabcd`
4. Åbn filen `.env.local` i roden af projektet (opret den hvis den ikke findes)
5. Skriv:

```
NEXT_PUBLIC_FORMSPREE_ID=xpwzabcd
```

(Erstat `xpwzabcd` med dit eget ID)

6. Gem filen og publicer igen (se afsnit 6)

### Modtag beskeder

Formspree sender dig en e-mail til den adresse, du oprettede kontoen med, hver gang nogen sender en besked via hjemmesiden. Du kan også se alle beskeder ved at logge ind på formspree.io.

---

## 6. Publicer ændringer online

Hjemmesiden hostes gratis på **Vercel** og forbundet til GitHub. Når du gemmer en fil og skubber den til GitHub, publiceres ændringerne automatisk inden for 1–2 minutter.

### Første gang: Opsætning

1. Opret en konto på [github.com](https://github.com) (gratis)
2. Opret et nyt tomt repository (fx `naturliglivsmestring`)
3. Upload projektmappen til GitHub
4. Gå til [vercel.com](https://vercel.com) og opret en konto
5. Klik **"Add New Project"** → vælg dit GitHub-repository
6. Klik **"Deploy"** — Vercel bygger og publicerer siden automatisk

### Hver gang du ændrer noget

Hvis du bruger **GitHub Desktop** (anbefalet):

1. Åbn GitHub Desktop
2. Du kan se dine ændringer til venstre
3. Skriv en kort beskrivelse i feltet **"Summary"**, fx `Opdateret angst-siden`
4. Klik **"Commit to main"**
5. Klik **"Push origin"**
6. Vercel publicerer ændringerne automatisk inden for 1–2 minutter

---

## Hurtig oversigt: Hvilken fil redigerer jeg?

| Jeg vil... | Fil/mappe |
|-----------|-----------|
| Redigere en sides tekst | `content/pages/[sidenavn].md` |
| Tilføje en ny side | Kopiér en `.md`-fil i `content/pages/` |
| Ændre menuen | `content/navigation.json` |
| Skifte et billede (lokalt) | `public/images/` + opdater `.md`-filen |
| Opsætte kontaktformular | `.env.local` (Formspree ID) |

---

## Brug for hjælp?

Kontakt den person, der byggede hjemmesiden, hvis du støder på problemer, der ikke er dækket af denne vejledning.
