### Förändra typsnitt på H1-rubriken

**Sammanfattning:** Byt typsnitt på huvudrubriken "Hitta din nästa Stockholmsutflykt" från Instrument Sans till ett elegant serif-typsnitt (DM Serif Display) för att ge appen mer karaktär och visuell känsla.

**Ändringar:**
1. **src/routes/__root.tsx** — Uppdatera Google Fonts-länken för att ladda DM Serif Display tillsammans med befintliga Instrument Sans.
2. **src/styles.css** — Lägg till ny CSS-variabel `--font-serif` som pekar på DM Serif Display.
3. **src/components/stockholm/Hero.tsx** — Ändra rubriken att använda serif-typsnittet, öka storleken något (4.5rem på desktop), och markera ordet "Stockholms" med mossgrön färg i kursiv stil för visuell accent.

**Resultat:** Rubriken får en mer editorial/elegant känsla med fin kontrast mot brödtexten, samtidigt som den behåller den skandinaviska tonen.