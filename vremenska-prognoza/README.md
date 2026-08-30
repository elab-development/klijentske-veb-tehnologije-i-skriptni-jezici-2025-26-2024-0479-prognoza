# klijentske-veb-tehnologije-2025-26-2024-0479-vremenska-prognoza
# Weather App

Veb aplikacija za praćenje vremenskih uslova i prognoze u realnom vremenu. Projekat je razvijen korišćenjem React biblioteke sa TypeScript tipizacijom i Vite alatom, dok je za moderan dizajn i stilizaciju upotrebljen Tailwind CSS.

## Funkcionalnosti

- **Izbor lokacije**

Omogućava korisniku odabir željene lokacije na tri načina: direktnim klikom na Google mapu, unosom u polje za pretragu ili automatskim detektovanjem trenutne pozicije (geolokacija). Izabrana lokacija se čuva u globalnom stanju (Zustand) i sinhronizuje sa localStorage-om.

- **Trenutna prognoza (Current)**  

Prikaz aktuelnih meteoroloških podataka (temperatura, subjektivni osećaj, vlažnost vazduha i opis vremenskog stanja) koji se preuzimaju putem OpenWeather API-ja.

- **Nedeljna prognoza (Weekly)**  

Kartični prikaz vremenskih uslova za narednih 7 dana uz detalje o minimalnim i maksimalnim temperaturama, padavinama, brzini vetra i vlažnosti (korišćenjem OpenWeather One Call API-ja).

- **Prognoza po satima (Hourly)**  

Horizontalni vremenski prikaz (timeline) sa prognozom za naredna 24 sata koji uključuje temperaturu, padavine i odgovarajuće ikone meteoroloških uslova

- **Detalji (Details)**  

Poseban pregled dodatnih parametara kao što su atmosferski pritisak, UV indeks, vidljivost, tačka rose, oblačnost, smer i brzina vetra, kao i vreme izlaska i zalaska sunca.

- **Komponente**  

Aplikacija je građena modularno uz odvojene komponente za kartice (WeatherDayCard, HourCard), statistiku (StatItem) i sistemska obaveštenja (AlertCard, InfoNote).

## Korišćene tehnologije i biblioteke

- **React + TypeScript** za interfejs i tipizaciju
- **Vite** za brzi build i development server
- **TailwindCSS** za stilizaciju i responzivni dizajn
- **React Router** za višestruke stranice (Home, Current, Weekly, Hourly, Details)
- **Zustand** za upravljanje globalnim stanjem (izabrana lokacija)
- **@react-google-maps/api** za prikaz mape i pretragu lokacije
- **lucide-react** za moderne ikone
- **OpenWeather API** za vremenske podatke (Current + One Call)

## Stranice

- / – Home (izbor lokacije)
- /current – Trenutna prognoza
- /weekly – Nedeljna prognoza
- /hourly – Prognoza po satima
- /details – Detaljni parametri vremenskih uslova

## Pokretanje aplikacije lokalno

1. Kloniraj repozitorijum:
   ```bash
   git clone https://github.com/elab-development/klijentske-veb-tehnologije-i-skriptni-jezici-2025-26-2024-0479-prognoza.git
   
   cd vremenska-prognoza
   ```
2. Instaliraj dependencies:

   ```bash
   npm install
   ```

3. Kreiraj .env fajl u root direktorijumu i dodaj svoje API ključeve:
   VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_KEY
   VITE_OWM_API_KEY=YOUR_OPENWEATHER_KEY

4. Pokreni aplikaciju:

   ```bash
   npm run dev
   ```

5. Otvori u pretraživaču:
   http://localhost:5173