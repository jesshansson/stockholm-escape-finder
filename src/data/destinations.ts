// Local curated dataset. Imported only by the local repository — UI never
// imports this file directly. Swap the repository to switch data source.

import vaxholmImg from "@/assets/destinations/vaxholm.jpg";
import fjaderholmarnaImg from "@/assets/destinations/fjaderholmarna.jpg";
import artipelagImg from "@/assets/destinations/artipelag.jpg";
import tyrestaImg from "@/assets/destinations/tyresta.jpg";
import drottningholmImg from "@/assets/destinations/drottningholm.jpg";
import hellasgardenImg from "@/assets/destinations/hellasgarden.jpg";
import millesgardenImg from "@/assets/destinations/millesgarden.jpg";
import sigtunaImg from "@/assets/destinations/sigtuna.jpg";
import grindaImg from "@/assets/destinations/grinda.jpg";
import sandhamnImg from "@/assets/destinations/sandhamn.jpg";
import nackareservatetImg from "@/assets/destinations/nackareservatet.jpg";
import rosendalsImg from "@/assets/destinations/rosendals.jpg";
import mariefredImg from "@/assets/destinations/mariefred.jpg";
import utoImg from "@/assets/destinations/uto.jpg";
import birkaImg from "@/assets/destinations/birka.jpg";
import tyresoImg from "@/assets/destinations/tyreso.jpg";
import bjornoImg from "@/assets/destinations/bjorno.jpg";
import saltsjobadenImg from "@/assets/destinations/saltsjobaden.jpg";

import type { Destination } from "./types";

export const localDestinations: Destination[] = [
  {
    id: "vaxholm",
    name: "Vaxholm",
    category: "Småstad / by",
    description:
      "Skärgårdens huvudstad med pastellfärgade trähus, klassisk fästning och välkända hamnkaféer.",
    travelTime: "ca 1 h med båt från Strömkajen",
    travelMinutes: 60,
    distanceRange: "30-60",
    indoorOutdoor: "Både och",
    moodTags: ["Mysig", "Romantisk", "Barnvänlig", "Solig dag", "Fotovänlig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Barnvänligt",
      "Bra på sommaren",
    ],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: true,
    costLevel: 2,
    duration: "Halvdag",
    bestFor: ["Promenad längs hamnen", "Fika med havsutsikt", "Fästningsbesök"],
    howToGetThere:
      "Båt från Strömkajen med Waxholmsbolaget (ca 1 h) eller buss 670 från Tekniska högskolan (ca 45 min).",
    goodToKnow:
      "Sommartid går båtarna ofta — på vintern är turerna glesare och kaféerna har kortare öppettider.",
    whyGo:
      "Vaxholm ger dig hela skärgårdskänslan utan att behöva åka långt. Perfekt för en spontan halvdag.",
    whatToDo:
      "Strosa längs Hamngatan, besök Vaxholms fästning, ta en glass på bryggan och provsmaka räkmackor.",
    eatAndCoffee:
      "Hembygdsgårds Café för legendarisk hembakt och Magasinet för räkmackor med utsikt över hamnen.",
    bestSeason: "Maj–september när alla kaféer och butiker är öppna.",
    image: vaxholmImg,
  },
  {
    id: "fjaderholmarna",
    name: "Fjäderholmarna",
    category: "Skärgårdsö",
    description:
      "Skärgårdens närmaste ö — bara 25 minuter med båt från city, med hantverkare, krogar och klippbad.",
    travelTime: "ca 25 min med båt från Slussen/Nybroplan",
    travelMinutes: 25,
    distanceRange: "0-30",
    indoorOutdoor: "Utomhus",
    moodTags: ["Lugn & vacker", "Romantisk", "Solig dag", "Fotovänlig", "Mysig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Bra på sommaren",
    ],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: true,
    costLevel: 2,
    duration: "Halvdag",
    bestFor: ["Snabb skärgårdsfika", "After work-utflykt", "Klippbad"],
    howToGetThere:
      "Båt från Slussen eller Nybroplan, ca 25 min. Trafikeras tätt under sommarmånaderna.",
    goodToKnow:
      "Öarna är öppna ungefär maj–september. Resten av året är det stängt.",
    whyGo:
      "Den enklaste vägen ut i skärgården. Hinner du jobba till 16 hinner du dit, fika och hem.",
    whatToDo:
      "Vandra rundturen, kika in i hantverksbodarna, ta ett dopp från klipporna och ät räkor i solen.",
    eatAndCoffee:
      "Fjäderholmarnas Krog, Rökeriet eller ett enklare fika på Café Brygghuset.",
    bestSeason: "Sen vår till tidig höst.",
    image: fjaderholmarnaImg,
  },
  {
    id: "artipelag",
    name: "Artipelag",
    category: "Museum",
    description:
      "Konsthall i Värmdö där modern arkitektur möter klipphällar, tallar och öppet hav.",
    travelTime: "ca 30 min med bil, 50 min med buss",
    travelMinutes: 30,
    distanceRange: "0-30",
    indoorOutdoor: "Både och",
    moodTags: ["Lugn & vacker", "Lite lyxigt", "Romantisk", "Regnig dag"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Bra på vintern",
      "Bra på sommaren",
    ],
    seasonTags: ["Året runt"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 3,
    duration: "Halvdag",
    bestFor: ["Konst", "Arkitektur", "Skogspromenad vid havet"],
    howToGetThere:
      "Buss 474 från Slussen till Hålludden eller bil ca 30 min via Värmdöleden.",
    goodToKnow:
      "Kombinera utställning med Artbox-lunchen — populärt på helger, boka gärna.",
    whyGo:
      "Få platser blandar konst, mat och natur så enkelt — bra både i regn och sol.",
    whatToDo:
      "Se utställningarna, gå Artipelagstigen längs vattnet och avsluta med kaffe i stora foajén.",
    eatAndCoffee:
      "Artipelag Bar & Restaurang för fullständig lunch, Artbox för enklare mat och bra fika.",
    bestSeason: "Året runt — fantastisk även på vintern när snön ligger.",
    image: artipelagImg,
  },
  {
    id: "tyresta",
    name: "Tyresta nationalpark",
    category: "Natur",
    description:
      "Urskog med 400-åriga tallar, glittrande sjöar och milsvida vandringsleder söder om stan.",
    travelTime: "ca 40 min med bil, 1 h med kollektivt",
    travelMinutes: 40,
    distanceRange: "30-60",
    indoorOutdoor: "Utomhus",
    moodTags: ["Lugn & vacker", "Aktiv", "Solig dag", "Fotovänlig", "Budgetvänlig"],
    practicalTags: [
      "Utomhus",
      "Lätt med kollektivtrafik",
      "Café i närheten",
      "Hundvänligt",
      "Barnvänligt",
      "Bra på sommaren",
    ],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: false,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 1,
    duration: "Heldag",
    bestFor: ["Vandring", "Skogsbad", "Grilla vid sjö"],
    howToGetThere:
      "Pendel + buss 873 till Tyresta by, eller bil till Tyresta by-parkeringen (ca 40 min).",
    goodToKnow:
      "Inga matställen inne i parken — packa matsäck. Eldstäder finns vid flera sjöar.",
    whyGo:
      "En riktig urskog så nära Stockholm — tystnad, mossa och lukten av tall.",
    whatToDo:
      "Vandra Sevärdhetsslingan, ta ett dopp i Stensjön, fika vid eldstad och utforska Tyresta by.",
    eatAndCoffee:
      "Tyresta by har ett trivsamt kafé och en liten restaurang vid entrén.",
    bestSeason: "Maj–oktober, men vacker även på vintern med skidor.",
    image: tyrestaImg,
  },
  {
    id: "drottningholm",
    name: "Drottningholms slott",
    category: "Slott / historisk plats",
    description:
      "Världsarvslistat barockslott vid Mälaren — kungafamiljens hem och praktfull slottspark.",
    travelTime: "ca 30 min med båt eller tunnelbana + buss",
    travelMinutes: 30,
    distanceRange: "0-30",
    indoorOutdoor: "Både och",
    moodTags: ["Romantisk", "Lite lyxigt", "Fotovänlig", "Regnig dag"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Bra på sommaren",
    ],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 2,
    duration: "Halvdag",
    bestFor: ["Slottspark", "Kinesiska slottet", "Båttur Mälaren"],
    howToGetThere:
      "Båt från Stadshuskajen (ca 1 h, vacker tur) eller t-bana Brommaplan + buss 176/177 (30 min).",
    goodToKnow:
      "Parken är gratis och öppen året runt — slottet kräver biljett.",
    whyGo:
      "Stockholms enklaste sätt att kombinera vatten, historia och prunkande trädgårdar.",
    whatToDo:
      "Vandra i barockträdgården, besök slottet och Kinesiska slottet, fika i orangeriet.",
    eatAndCoffee:
      "Karamellan Café & Krog i parken — fika eller långlunch.",
    bestSeason: "Maj–september för fullt blommande trädgård.",
    image: drottningholmImg,
  },
  {
    id: "hellasgarden",
    name: "Hellasgården",
    category: "Natur",
    description:
      "Friluftsoas vid Källtorpssjön i Nacka — bastu, bad och pulkabacke året runt.",
    travelTime: "ca 20 min med bil eller buss",
    travelMinutes: 20,
    distanceRange: "0-30",
    indoorOutdoor: "Både och",
    moodTags: ["Aktiv", "Mysig", "Barnvänlig", "Budgetvänlig"],
    practicalTags: [
      "Utomhus",
      "Lätt med kollektivtrafik",
      "Café i närheten",
      "Hundvänligt",
      "Barnvänligt",
      "Bra på vintern",
      "Bra på sommaren",
    ],
    seasonTags: ["Året runt"],
    foodAvailable: false,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 1,
    duration: "1-2 timmar",
    bestFor: ["Bastu och vinterbad", "Joggingrunda", "Familjeutflykt"],
    howToGetThere:
      "Buss 401 från Slussen, ca 20 min. Eller bil — parkering på plats.",
    goodToKnow:
      "Bastun har separata tider — kolla schemat på Hellasgården.se. Vintertid är vakar upphuggna för isbad.",
    whyGo:
      "Stockholm i miniatyr: skog, sjö, bastu och kaffe — på 20 minuter.",
    whatToDo:
      "Bada bastu och dyka i sjön, gå en sjörunda, åka pulka eller längdskidor på vintern.",
    eatAndCoffee:
      "Hellas Café & Restaurang serverar enklare lunch, kaffe och kanelbullar.",
    bestSeason: "Året runt — vinterbad är extra magiskt.",
    image: hellasgardenImg,
  },
  {
    id: "millesgarden",
    name: "Millesgården",
    category: "Museum",
    description:
      "Carl Milles skulpturhem och terrassträdgård högt över Lilla Värtan på Lidingö.",
    travelTime: "ca 25 min med kollektivt",
    travelMinutes: 25,
    distanceRange: "0-30",
    indoorOutdoor: "Både och",
    moodTags: ["Lugn & vacker", "Romantisk", "Lite lyxigt", "Fotovänlig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Bra på vintern",
      "Bra på sommaren",
    ],
    seasonTags: ["Året runt"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 2,
    duration: "Halvdag",
    bestFor: ["Skulpturpromenad", "Konstutställningar", "Lunch med utsikt"],
    howToGetThere:
      "Röda tunnelbanan till Ropsten + Lidingöbanan till Torsvik, ca 25 min totalt.",
    goodToKnow:
      "Trädgården är vacker även när museet är stängt — biljett krävs för terrassen.",
    whyGo:
      "Få platser har så hög konst-per-promenadminut. Utsikten är värd resan i sig.",
    whatToDo:
      "Vandra terrasserna bland Milles-skulpturer, se temautställningen, lunch på Millesgårdens Lanthandel.",
    eatAndCoffee:
      "Millesgårdens Lanthandel — lugn lunch och säsongens fika.",
    bestSeason: "April–oktober för fullt blommande trädgård.",
    image: millesgardenImg,
  },
  {
    id: "sigtuna",
    name: "Sigtuna",
    category: "Småstad / by",
    description:
      "Sveriges äldsta stad — kullerstensgator, runstenar och mysiga kaféer vid Mälaren.",
    travelTime: "ca 50 min med bil, 1 h med kollektivt",
    travelMinutes: 50,
    distanceRange: "30-60",
    indoorOutdoor: "Både och",
    moodTags: ["Mysig", "Romantisk", "Barnvänlig", "Fotovänlig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Barnvänligt",
      "Bra på vintern",
      "Bra på sommaren",
    ],
    seasonTags: ["Året runt"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 2,
    duration: "Halvdag",
    bestFor: ["Fika", "Historiska gatupromenader", "Småbutiker"],
    howToGetThere:
      "Pendel till Märsta + buss 570/575, ca 1 h. Bil ca 50 min via E4.",
    goodToKnow:
      "Tula Sigtuna och Tant Bruns Kaffestuga går varma på helger — kom tidigt.",
    whyGo:
      "Stockholm-näraste tidsresan: stenkyrkor, runstenar och bästa fikat i Mälardalen.",
    whatToDo:
      "Promenera Stora gatan, besök ruinerna, ta en glass vid hamnen och fika hos Tant Brun.",
    eatAndCoffee:
      "Tant Bruns Kaffestuga (klassiker), Tula Sigtuna för lunch och Sigtuna Stads Hotell för lite lyx.",
    bestSeason: "Vår och höst för stämningen, december för julmarknad.",
    image: sigtunaImg,
  },
  {
    id: "grinda",
    name: "Grinda",
    category: "Skärgårdsö",
    description:
      "Klassisk skärgårdsö med ängar, bryggor och ett charmigt värdshus mitt i mellersta skärgården.",
    travelTime: "ca 1 h 45 min med båt",
    travelMinutes: 105,
    distanceRange: "60-120",
    indoorOutdoor: "Utomhus",
    moodTags: ["Lugn & vacker", "Romantisk", "Lite lyxigt", "Fotovänlig", "Solig dag"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Bra på sommaren",
    ],
    seasonTags: ["Sommar", "Höst"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: true,
    costLevel: 3,
    duration: "Heldag",
    bestFor: ["Lång lunch på värdshuset", "Strandhugg", "Vandring runt ön"],
    howToGetThere:
      "Cinderella eller Waxholmsbåt från Strandvägen, ca 1 h 45 min.",
    goodToKnow:
      "Bilfri ö — packa lätt. Värdshuset bokar fullt på helger, ring i förväg.",
    whyGo:
      "Den perfekta heldagen i skärgården utan att åka för långt eller för dyrt.",
    whatToDo:
      "Vandra ön på en eftermiddag, bada från klipporna, äta långlunch på Grinda Wärdshus.",
    eatAndCoffee:
      "Grinda Wärdshus för lyxig lunch, Grindastugan för enklare mat och fika.",
    bestSeason: "Juni–augusti.",
    image: grindaImg,
  },
  {
    id: "sandhamn",
    name: "Sandhamn",
    category: "Skärgårdsö",
    description:
      "Skärgårdens seglarmecka med vita stränder, gula trähus och sommarvimmel i hamnen.",
    travelTime: "ca 2 h 30 min med båt",
    travelMinutes: 150,
    distanceRange: "120+",
    indoorOutdoor: "Utomhus",
    moodTags: ["Lite lyxigt", "Romantisk", "Solig dag", "Fotovänlig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Bra på sommaren",
    ],
    seasonTags: ["Sommar"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: true,
    costLevel: 3,
    duration: "Heldag",
    bestFor: ["Stranden Trouville", "Glassrunda", "Båtspaning"],
    howToGetThere:
      "Cinderella från Strandvägen ca 2,5 h, eller buss + Stavsnäs-båt ca 2 h.",
    goodToKnow:
      "Det är en heldag — checka båttider noga, sista båten tillbaka går tidigt på lågsäsong.",
    whyGo:
      "Längst ut i skärgården utan att behöva egen båt — vit sand, blått hav och pastellfasader.",
    whatToDo:
      "Promenera till Trouville-stranden, bada, ät glass, äta middag i hamnen.",
    eatAndCoffee:
      "Sandhamns Värdshus, Seglarhotellet och Sands Hotell — alla med havsutsikt.",
    bestSeason: "Juni–augusti.",
    image: sandhamnImg,
  },
  {
    id: "nackareservatet",
    name: "Nackareservatet",
    category: "Vandringsled",
    description:
      "Tätortsnära naturreservat med sjöar, leder och eldstäder — Stockholms bakgård för friluftsliv.",
    travelTime: "ca 15 min med kollektivt",
    travelMinutes: 15,
    distanceRange: "0-30",
    indoorOutdoor: "Utomhus",
    moodTags: ["Lugn & vacker", "Aktiv", "Budgetvänlig", "Fotovänlig"],
    practicalTags: [
      "Utomhus",
      "Lätt med kollektivtrafik",
      "Hundvänligt",
      "Barnvänligt",
      "Bra på vintern",
      "Bra på sommaren",
    ],
    seasonTags: ["Året runt"],
    foodAvailable: false,
    cafeAvailable: false,
    publicTransport: true,
    island: false,
    costLevel: 1,
    duration: "1-2 timmar",
    bestFor: ["Joggingrunda", "Bad i Källtorpssjön", "Grilla med vänner"],
    howToGetThere:
      "Buss från Slussen mot Björkhagen/Hellasgården, ca 15 min.",
    goodToKnow:
      "Inga kaféer i reservatet — packa eget. Hellasgården ligger precis intill.",
    whyGo:
      "Du kan vara i stan på morgonen och i skogen på lunchen utan att märka övergången.",
    whatToDo:
      "Vandra runt Källtorpssjön, fika vid eldstad, bada eller åka skidor på vintern.",
    eatAndCoffee:
      "Närmaste fika är på Hellasgården, fem minuters promenad bort.",
    bestSeason: "Året runt — extra fint i höstfärgerna.",
    image: nackareservatetImg,
  },
  {
    id: "rosendals-tradgard",
    name: "Rosendals Trädgård",
    category: "Café",
    description:
      "Biodynamisk trädgård på Djurgården med växthus, äppellund och ett älskat sommarcafé.",
    travelTime: "ca 20 min från city",
    travelMinutes: 20,
    distanceRange: "0-30",
    indoorOutdoor: "Både och",
    moodTags: ["Lugn & vacker", "Romantisk", "Mysig", "Solig dag", "Fotovänlig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Hundvänligt",
      "Barnvänligt",
      "Bra på sommaren",
    ],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 2,
    duration: "1-2 timmar",
    bestFor: ["Ekologisk lunch", "Fika under äppelträden", "Plocka egna blommor"],
    howToGetThere:
      "Spårvagn 7 till Bellmansro, sedan kort promenad. Cykel från city ca 15 min.",
    goodToKnow:
      "Helger är extremt populära — gå tidigt eller en vardag för lugnet.",
    whyGo:
      "Stockholms mysigaste lunchplats om vädret är på din sida.",
    whatToDo:
      "Lunch i växthuset, fika under äppelträden, vandra i trädgården och köp med en bukett hem.",
    eatAndCoffee:
      "Hela platsen är ett café — sallader, soppor och världens bästa kanelbulle.",
    bestSeason: "Maj–september.",
    image: rosendalsImg,
  },
  {
    id: "mariefred",
    name: "Mariefred",
    category: "Småstad / by",
    description:
      "Mysig småstad vid Mälaren med Gripsholms slott, ångbåt från Stockholm och kullerstensgator.",
    travelTime: "ca 1 h med bil, 3,5 h med ångbåt",
    travelMinutes: 60,
    distanceRange: "60-120",
    indoorOutdoor: "Både och",
    moodTags: ["Mysig", "Romantisk", "Fotovänlig", "Barnvänlig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Barnvänligt",
      "Bra på sommaren",
    ],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 2,
    duration: "Heldag",
    bestFor: ["Gripsholms slott", "Ångbåtstur", "Antikvariat och fika"],
    howToGetThere:
      "Bil ca 1 h via E20. Eller ta ångbåten S/S Mariefred från Klara Mälarstrand — ca 3,5 h enkel väg, en upplevelse i sig.",
    goodToKnow:
      "Ångbåten går endast sommartid, oftast helger. Slottet stängt vissa vinterdagar — kolla öppettider.",
    whyGo:
      "Perfekt blandning av småstadsidyll, kungligt slott och Mälarens lugn.",
    whatToDo:
      "Besök Gripsholms slott och porträttsamlingen, strosa i Gripsholms Värdshus trädgård, åk ångloket Östra Södermanlands Järnväg.",
    eatAndCoffee:
      "Gripsholms Värdshus (Sveriges äldsta värdshus) eller Mariefreds Bageri för fika.",
    bestSeason: "Maj–september när ångbåten går.",
    image: mariefredImg,
  },
  {
    id: "uto",
    name: "Utö",
    category: "Skärgårdsö",
    description:
      "Stor ö i södra skärgården med långa cykelvägar, gruvhistoria, sandstränder och värdshus.",
    travelTime: "ca 2 h med buss + båt",
    travelMinutes: 120,
    distanceRange: "60-120",
    indoorOutdoor: "Utomhus",
    moodTags: ["Aktiv", "Lugn & vacker", "Solig dag", "Fotovänlig", "Barnvänlig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Barnvänligt",
      "Bra på sommaren",
    ],
    seasonTags: ["Sommar", "Höst"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: true,
    costLevel: 2,
    duration: "Heldag",
    bestFor: ["Cykla runt ön", "Bad på Stora Sand", "Gruvmuseet"],
    howToGetThere:
      "Pendel till Västerhaninge + buss 846 till Årsta brygga, sedan Waxholmsbåt till Utö (totalt ca 2 h).",
    goodToKnow:
      "Hyr cykel direkt i hamnen — ön är stor och plattare än de flesta. Bra för barnfamiljer.",
    whyGo:
      "En av få öar där du kan cykla i timmar mellan stränder, skog och historiska gruvor.",
    whatToDo:
      "Cykla till Stora Sand och bada, besök gruvmuseet, fika på Bageriet och drick öl på Utö Värdshus.",
    eatAndCoffee:
      "Utö Bageri (legendariskt limpa-bröd), Utö Värdshus och Båtshaket vid hamnen.",
    bestSeason: "Juni–augusti.",
    image: utoImg,
  },
  {
    id: "birka",
    name: "Birka",
    category: "Slott / historisk plats",
    description:
      "Sveriges första stad och världsarv på Björkö — vikingaby, gravhögar och museum mitt i Mälaren.",
    travelTime: "ca 2 h med båt från Stadshuskajen",
    travelMinutes: 120,
    distanceRange: "60-120",
    indoorOutdoor: "Både och",
    moodTags: ["Lugn & vacker", "Fotovänlig", "Barnvänlig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Barnvänligt",
      "Bra på sommaren",
    ],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: true,
    costLevel: 3,
    duration: "Heldag",
    bestFor: ["Vikingahistoria", "Båttur på Mälaren", "Guidad visning"],
    howToGetThere:
      "Båt från Stadshuskajen, ca 2 h enkel väg. Båtbiljett inkluderar entré till museet.",
    goodToKnow:
      "Endast öppet maj–september. En båt om dagen — missar du den blir det övernattning.",
    whyGo:
      "Stå mitt i en riktig vikingaby med utsikt över samma vatten som handelsmännen för 1200 år sedan.",
    whatToDo:
      "Guidad tur bland gravhögarna, besök museet och rekonstruerade vikingabyn, fika på Särimner.",
    eatAndCoffee:
      "Värdshuset Särimner serverar lunch och fika med Mälarutsikt.",
    bestSeason: "Maj–september.",
    image: birkaImg,
  },
  {
    id: "tyreso-slott",
    name: "Tyresö slott",
    category: "Slott / historisk plats",
    description:
      "Vackert 1600-talsslott vid Kalvfjärden med engelsk park, kapell och Nordiska museets café.",
    travelTime: "ca 30 min med bil, 45 min med buss",
    travelMinutes: 30,
    distanceRange: "0-30",
    indoorOutdoor: "Både och",
    moodTags: ["Romantisk", "Lugn & vacker", "Fotovänlig", "Regnig dag"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Bra på sommaren",
    ],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 2,
    duration: "Halvdag",
    bestFor: ["Slottspark", "Café Slottsboden", "Stranden Notholmen"],
    howToGetThere:
      "Buss 875 från Gullmarsplan till Tyresö slott, ca 45 min. Bil ca 30 min via Tyresövägen.",
    goodToKnow:
      "Parken är gratis och öppen året runt. Slottsvisning bara sommartid.",
    whyGo:
      "Få känner till det här slottet — ger samma vibb som Drottningholm men utan turistbussarna.",
    whatToDo:
      "Vandra i engelska parken, besök slottet, bad vid Notholmen och fika i Slottsboden.",
    eatAndCoffee:
      "Café Slottsboden — klassiskt herrgårdsfika i orangerimiljö.",
    bestSeason: "Maj–september.",
    image: tyresoImg,
  },
  {
    id: "bjorno",
    name: "Björnö naturreservat",
    category: "Natur",
    description:
      "Klippkust, badvikar och tallskog på Ingarö — en av Stockholms vackraste naturupplevelser.",
    travelTime: "ca 45 min med bil",
    travelMinutes: 45,
    distanceRange: "30-60",
    indoorOutdoor: "Utomhus",
    moodTags: ["Lugn & vacker", "Aktiv", "Solig dag", "Fotovänlig", "Budgetvänlig"],
    practicalTags: [
      "Utomhus",
      "Hundvänligt",
      "Barnvänligt",
      "Bra på sommaren",
    ],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: false,
    cafeAvailable: false,
    publicTransport: false,
    island: false,
    costLevel: 1,
    duration: "Halvdag",
    bestFor: ["Klippbad", "Vandring längs kusten", "Tältnätter"],
    howToGetThere:
      "Bil ca 45 min via Värmdöleden mot Ingarö, sedan skyltat till Björnö. Parkering finns.",
    goodToKnow:
      "Inga kaféer i reservatet — packa matsäck. Eldstäder finns vid vissa vikar.",
    whyGo:
      "Skärgårdskänslan utan båt: släta klippor, kristallklart vatten och tallskog hela vägen ner till havet.",
    whatToDo:
      "Vandra Björnöleden runt halvön, bada från klipporna, paddla kajak eller övernatta i tält.",
    eatAndCoffee:
      "Inget på plats — närmaste kafé ligger i Ingarö centrum.",
    bestSeason: "Maj–september.",
    image: bjornoImg,
  },
  {
    id: "saltsjobaden",
    name: "Saltsjöbaden",
    category: "Småstad / by",
    description:
      "Sekelskiftesidyll med Grand Hotel, segelbåtar och promenader längs Baggensfjärden.",
    travelTime: "ca 25 min med Saltsjöbanan",
    travelMinutes: 25,
    distanceRange: "0-30",
    indoorOutdoor: "Både och",
    moodTags: ["Romantisk", "Lite lyxigt", "Lugn & vacker", "Fotovänlig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Bra på vintern",
      "Bra på sommaren",
    ],
    seasonTags: ["Året runt"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 3,
    duration: "Halvdag",
    bestFor: ["Brunch på Grand", "Strandpromenad", "Bastubad vid havet"],
    howToGetThere:
      "Saltsjöbanan från Slussen direkt till Saltsjöbaden, ca 25 min.",
    goodToKnow:
      "Grand Hotels brunch är populär på helger — boka i förväg.",
    whyGo:
      "Som att kliva in i ett gammalt vykort — sekelskifte, havsutsikt och lugn.",
    whatToDo:
      "Brunch eller fika på Grand Hotel Saltsjöbaden, promenera Tattby-leden, bada från Restaurangholmen.",
    eatAndCoffee:
      "Grand Hotel Saltsjöbaden för klassisk lyx, Saltis Café för enklare fika.",
    bestSeason: "Året runt — magiskt även vintertid.",
    image: saltsjobadenImg,
  },
  {
    id: "skansen",
    name: "Skansen",
    category: "Museum",
    description:
      "Världens äldsta friluftsmuseum med historiska gårdar, nordiska djur och hisnande utsikt över Saltsjön.",
    travelTime: "ca 15 min med buss/spårvagn från city",
    travelMinutes: 15,
    distanceRange: "0-30",
    indoorOutdoor: "Både och",
    moodTags: ["Barnvänlig", "Fotovänlig", "Solig dag", "Aktiv"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Barnvänligt",
      "Bra på sommaren",
    ],
    seasonTags: ["Året runt"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 2,
    duration: "Halvdag",
    bestFor: ["Djurpark", "Historiska gårdar", "Utsikt över Saltsjön"],
    howToGetThere:
      "Buss 44 eller spårvagn 7 till Skansen, ca 15 min från city.",
    goodToKnow:
      "Stort område — räkna med flera timmar om ni vill se det mesta. Glashyttan och bagarstugan är barnfavoriter.",
    whyGo:
      "En tidsresa genom svensk historia med björnar, lodjur och 1800-talsgårdar på samma kulle.",
    whatToDo:
      "Besök djurparken, kika in i de historiska husen, ta linbanan för utsikt och avsluta med våfflor.",
    eatAndCoffee:
      "Skansens många kaféer, bland annat Bredablick för utsikt med fikat.",
    bestSeason: "Året runt, men sommarens hantverksdagar och julmarknaden i december är extra populära.",
    image: "https://picsum.photos/seed/skansen/800/600",
  },
  {
    id: "vasamuseet",
    name: "Vasamuseet",
    category: "Museum",
    description:
      "Ett helt bevarat 1600-talsskepp i originalskick — ett av Sveriges mest besökta museer.",
    travelTime: "ca 15 min med buss från city",
    travelMinutes: 15,
    distanceRange: "0-30",
    indoorOutdoor: "Inomhus",
    moodTags: ["Fotovänlig", "Regnig dag", "Barnvänlig"],
    practicalTags: [
      "Inomhus",
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Barnvänligt",
      "Bra på vintern",
    ],
    seasonTags: ["Året runt"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 2,
    duration: "1-2 timmar",
    bestFor: ["Skeppshistoria", "Perfekt regndag", "Guidad visning"],
    howToGetThere:
      "Buss 67 eller spårvagn 7 till Vasamuseet, ca 15 min från Sergels torg.",
    goodToKnow:
      "Boka biljett i förväg på sommaren — köerna kan bli långa.",
    whyGo:
      "Det enda nästan helt intakta skeppet från 1600-talet i världen, bärgat efter 333 år på havets botten.",
    whatToDo:
      "Vandra runt skeppet på flera våningsplan, se filmen om bärgningen och utforska modellverkstaden.",
    eatAndCoffee:
      "Museets eget café, eller gå vidare till Wärdshuset på Djurgården.",
    bestSeason: "Året runt — perfekt för regniga dagar.",
    image: "https://picsum.photos/seed/vasamuseet/800/600",
  },
  {
    id: "skogskyrkogarden",
    name: "Skogskyrkogården",
    category: "Kultur",
    description:
      "Världsarvslistad begravningsplats av Asplund och Lewerentz — minimalistisk arkitektur i tallskog.",
    travelTime: "ca 20 min med tunnelbana",
    travelMinutes: 20,
    distanceRange: "0-30",
    indoorOutdoor: "Utomhus",
    moodTags: ["Lugn & vacker", "Fotovänlig"],
    practicalTags: ["Utomhus", "Lätt med kollektivtrafik"],
    seasonTags: ["Året runt"],
    foodAvailable: false,
    cafeAvailable: false,
    publicTransport: true,
    island: false,
    costLevel: 1,
    duration: "1-2 timmar",
    bestFor: ["Arkitektur", "Stillsam promenad", "Fotografering"],
    howToGetThere:
      "Tunnelbana grön linje till Skogskyrkogården, ca 20 min från city.",
    goodToKnow:
      "Ett UNESCO-världsarv — visa respekt, det är en aktiv begravningsplats.",
    whyGo:
      "Ett av 1900-talets mest inflytelserika arkitekturverk, där landskap och byggnad smälter samman.",
    whatToDo:
      "Gå längs Sju brunnars väg, besök Skogskapellet och Uppståndelsekapellet, sitt vid Meditationslunden.",
    eatAndCoffee:
      "Inget på plats — närmaste fik finns vid Enskede gård.",
    bestSeason: "Vår och höst när ljuset faller lågt genom tallarna.",
    image: "https://picsum.photos/seed/skogskyrkogarden/800/600",
  },
  {
    id: "waldemarsudde",
    name: "Waldemarsudde",
    category: "Museum",
    description:
      "Prins Eugens forna hem på Djurgården — sekelskiftesvilla, konstsamling och skulpturpark vid vattnet.",
    travelTime: "ca 20 min med buss",
    travelMinutes: 20,
    distanceRange: "0-30",
    indoorOutdoor: "Både och",
    moodTags: ["Lugn & vacker", "Romantisk", "Lite lyxigt", "Fotovänlig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Café i närheten",
      "Bra på sommaren",
    ],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: false,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 2,
    duration: "1-2 timmar",
    bestFor: ["Konstsamling", "Skulpturpark", "Picknick vid vattnet"],
    howToGetThere:
      "Buss 67 till Waldemarsudde, ca 20 min från city.",
    goodToKnow:
      "Trädgården är gratis att besöka även utan museibiljett.",
    whyGo:
      "Konst, arkitektur och en av Djurgårdens vackraste vyer över inloppet — sällan trångt.",
    whatToDo:
      "Se konstsamlingen i villan, vandra bland skulpturerna i parken och fika i orangeriet.",
    eatAndCoffee:
      "Waldemarsuddes café i det gamla växthuset.",
    bestSeason: "Maj–september när trädgården blommar som mest.",
    image: "https://picsum.photos/seed/waldemarsudde/800/600",
  },
  {
    id: "thielska-galleriet",
    name: "Thielska Galleriet",
    category: "Museum",
    description:
      "Jugendvilla med Nordens mest betydande privata konstsamling, vackert belägen på Djurgårdens spets.",
    travelTime: "ca 25 min med buss",
    travelMinutes: 25,
    distanceRange: "0-30",
    indoorOutdoor: "Både och",
    moodTags: ["Lugn & vacker", "Lite lyxigt", "Fotovänlig", "Romantisk"],
    practicalTags: ["Lätt med kollektivtrafik", "Café i närheten"],
    seasonTags: ["Året runt"],
    foodAvailable: false,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 2,
    duration: "1-2 timmar",
    bestFor: ["Konst", "Arkitektur", "Havsutsikt"],
    howToGetThere:
      "Buss 69 till ändhållplatsen, sedan kort promenad, totalt ca 25 min.",
    goodToKnow:
      "Liten och personlig — räkna med en dryg timme. Trädgårdscaféet har begränsade öppettider.",
    whyGo:
      "En av Stockholms mest underskattade konstupplevelser, med verk av Munch, Gauguin och Larsson i en hemtrevlig villa.",
    whatToDo:
      "Se konstsamlingen, vandra i skulpturparken ner mot vattnet och avsluta med fika i trädgården.",
    eatAndCoffee:
      "Trädgårdscaféet, öppet under högsäsong.",
    bestSeason: "Vår till höst, för trädgården och utsikten.",
    image: "https://picsum.photos/seed/thielska-galleriet/800/600",
  },
  {
    id: "hagaparken",
    name: "Hagaparken",
    category: "Natur",
    description:
      "Kunglig engelsk park med Fjärilshuset, Koppartälten och pampiga ekar mitt i stan.",
    travelTime: "ca 20 min med buss",
    travelMinutes: 20,
    distanceRange: "0-30",
    indoorOutdoor: "Utomhus",
    moodTags: ["Lugn & vacker", "Barnvänlig", "Fotovänlig", "Solig dag"],
    practicalTags: [
      "Utomhus",
      "Lätt med kollektivtrafik",
      "Café i närheten",
      "Hundvänligt",
      "Barnvänligt",
      "Bra på sommaren",
    ],
    seasonTags: ["Året runt"],
    foodAvailable: false,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 1,
    duration: "1-2 timmar",
    bestFor: ["Picknick", "Fjärilshuset", "Löprunda"],
    howToGetThere:
      "Buss 515 eller 50 till Haga, ca 20 min från city.",
    goodToKnow:
      "Parken är gratis. Fjärilshuset och Koppartälten kostar entré.",
    whyGo:
      "Kunglig park med 1700-talshistoria och plats för allt från picknick till löprundor.",
    whatToDo:
      "Gå runt Brunnsviken, besök Fjärilshuset, kika in i Koppartälten och fika vid Haga Forum.",
    eatAndCoffee:
      "Haga Forum och flera kaféer längs strandpromenaden.",
    bestSeason: "Året runt — extra fint på våren när körsbärsträden blommar.",
    image: "https://picsum.photos/seed/hagaparken/800/600",
  },
  {
    id: "skokloster-slott",
    name: "Skokloster slott",
    category: "Slott / historisk plats",
    description:
      "Sveriges största privatslott från 1600-talet — orört interiör med vapen, möbler och konst i tidskapsel.",
    travelTime: "ca 50 min med bil",
    travelMinutes: 50,
    distanceRange: "30-60",
    indoorOutdoor: "Både och",
    moodTags: ["Lugn & vacker", "Fotovänlig", "Regnig dag"],
    practicalTags: ["Café i närheten", "Bra på sommaren"],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: false,
    cafeAvailable: true,
    publicTransport: false,
    island: false,
    costLevel: 2,
    duration: "Halvdag",
    bestFor: ["Slottsvisning", "Motormuseum", "Mälarutsikt"],
    howToGetThere:
      "Bil ca 50 min via E18 mot Uppsala/Bålsta. Ingen direkt kollektivtrafik.",
    goodToKnow:
      "Slottet stod aldrig helt färdigbyggt — många rum är fortfarande i originalskick från 1670-talet.",
    whyGo:
      "Som att kliva rakt in i 1600-talet — möbler, vapen och konst som aldrig flyttats.",
    whatToDo:
      "Guidad slottsvisning, besök motormuseet i ladugården och promenera ner till Mälarstranden.",
    eatAndCoffee:
      "Slottscaféet i den gamla ladugården.",
    bestSeason: "Maj–september.",
    image: "https://picsum.photos/seed/skokloster-slott/800/600",
  },
  {
    id: "steninge-slott",
    name: "Steninge slott",
    category: "Slott / historisk plats",
    description:
      "Barockslott vid Mälaren med konsthantverk, kafé i orangeriet och promenadstigar i slottsparken.",
    travelTime: "ca 40 min med bil",
    travelMinutes: 40,
    distanceRange: "30-60",
    indoorOutdoor: "Både och",
    moodTags: ["Lugn & vacker", "Mysig", "Lite lyxigt", "Fotovänlig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Bra på sommaren",
    ],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 2,
    duration: "Halvdag",
    bestFor: ["Slottspark", "Konsthantverk", "Fika vid vattnet"],
    howToGetThere:
      "Bil ca 40 min mot Märsta, eller pendeltåg till Märsta + buss, totalt ca 1 h.",
    goodToKnow:
      "Slottsparken och keramikverkstäderna är gratis att besöka.",
    whyGo:
      "Ett av Mälardalens vackraste barockslott, med levande konsthantverk istället för ett dammigt museum.",
    whatToDo:
      "Vandra i slottsparken, besök konsthantverkarna i ladugården och ät lunch med sjöutsikt.",
    eatAndCoffee:
      "Steninge Slottscafé och restaurang i orangeriet.",
    bestSeason: "Maj–september.",
    image: "https://picsum.photos/seed/steninge-slott/800/600",
  },
  {
    id: "rosersberg-slott",
    name: "Rosersberg slott",
    category: "Slott / historisk plats",
    description:
      "Kungligt 1600-talsslott vid Mälaren, mindre känt och betydligt lugnare än Drottningholm.",
    travelTime: "ca 35 min med bil eller pendeltåg",
    travelMinutes: 35,
    distanceRange: "30-60",
    indoorOutdoor: "Både och",
    moodTags: ["Lugn & vacker", "Romantisk", "Fotovänlig"],
    practicalTags: ["Lätt med kollektivtrafik", "Bra på sommaren"],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: false,
    cafeAvailable: false,
    publicTransport: true,
    island: false,
    costLevel: 2,
    duration: "1-2 timmar",
    bestFor: ["Slottspark", "Stillsam promenad", "Mälarutsikt"],
    howToGetThere:
      "Pendeltåg till Rosersberg, sedan ca 15 min promenad. Bil ca 35 min.",
    goodToKnow:
      "Slottet har begränsade öppettider — kolla i förväg om ni vill se interiören.",
    whyGo:
      "Samma kungliga charm som de stora slotten, men nästan helt utan turister.",
    whatToDo:
      "Promenera i den engelska parken, ta en guidad slottsvisning och avsluta vid sjön.",
    eatAndCoffee:
      "Inget café på plats — ta med matsäck eller stanna till i Märsta på vägen.",
    bestSeason: "Maj–september.",
    image: "https://picsum.photos/seed/rosersberg-slott/800/600",
  },
  {
    id: "moja",
    name: "Möja",
    category: "Skärgårdsö",
    description:
      "Klassisk skärgårdsö med smala vikar, äppelträd och ett av arkipelagens mest genuina fiskelägen.",
    travelTime: "ca 2,5–3 h med båt",
    travelMinutes: 165,
    distanceRange: "120+",
    indoorOutdoor: "Utomhus",
    moodTags: ["Lugn & vacker", "Solig dag", "Fotovänlig", "Mysig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Bra på sommaren",
    ],
    seasonTags: ["Sommar"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: true,
    costLevel: 2,
    duration: "Heldag",
    bestFor: ["Cykla mellan vikarna", "Äppelmustning", "Fiskeläge"],
    howToGetThere:
      "Waxholmsbåt från Strömkajen, ca 2,5–3 h beroende på linje.",
    goodToKnow:
      "Ön är avlång — hyr cykel vid bryggan för att hinna utforska flera byar.",
    whyGo:
      "En av ytterskärgårdens mest oförstörda öar, känd för äppelodlingar och tysta vikar.",
    whatToDo:
      "Cykla mellan Berg och Långvik, bada vid Bredvik, besök bryggeriet och fika i hamnen.",
    eatAndCoffee:
      "Möja Krog & Bageri och Möja Bryggeri.",
    bestSeason: "Juni–augusti.",
    image: "https://picsum.photos/seed/moja/800/600",
  },
  {
    id: "orno",
    name: "Ornö",
    category: "Skärgårdsö",
    description:
      "Söderskärgårdens största ö med ekoturism, gårdsbutiker och milslånga cykel- och vandringsleder.",
    travelTime: "ca 1,5 h med buss och båt",
    travelMinutes: 90,
    distanceRange: "60-120",
    indoorOutdoor: "Utomhus",
    moodTags: ["Lugn & vacker", "Aktiv", "Budgetvänlig", "Fotovänlig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Hundvänligt",
      "Bra på sommaren",
    ],
    seasonTags: ["Sommar", "Höst"],
    foodAvailable: true,
    cafeAvailable: false,
    publicTransport: true,
    island: true,
    costLevel: 1,
    duration: "Heldag",
    bestFor: ["Cykling", "Gårdsbutiker", "Vandring i naturreservat"],
    howToGetThere:
      "Pendel till Västerhaninge + buss 846 till Sandviken, sedan båt till Ornö, totalt ca 1,5 h.",
    goodToKnow:
      "Stora delar av ön är naturreservat — bra skyltade leder för både vandring och cykel.",
    whyGo:
      "Ekologisk skärgårdskänsla med gårdsbutiker, lammbete och milsvida leder utan trängsel.",
    whatToDo:
      "Cykla eller vandra Ornöleden, besök gårdsbutikerna och bada vid någon av de många vikarna.",
    eatAndCoffee:
      "Ornö Skärgårdskrog och flera gårdsbutiker med eget bröd och ost.",
    bestSeason: "Juni–september.",
    image: "https://picsum.photos/seed/orno/800/600",
  },
  {
    id: "dalaro",
    name: "Dalarö",
    category: "Småstad / by",
    description:
      "Pittoresk skärgårdsidyll med fästningsruin, segelbåtshamn och böljande klippor mot öppet hav.",
    travelTime: "ca 50 min med bil",
    travelMinutes: 50,
    distanceRange: "30-60",
    indoorOutdoor: "Både och",
    moodTags: ["Mysig", "Romantisk", "Solig dag", "Fotovänlig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Bra på sommaren",
    ],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 2,
    duration: "Halvdag",
    bestFor: ["Fästningsruin", "Hamnpromenad", "Klippbad"],
    howToGetThere:
      "Bil ca 50 min via Nynäsvägen, eller buss 848/849 från Västerhaninge.",
    goodToKnow:
      "Dalarö skans nås med liten roddfärja från hamnen — kolla turerna.",
    whyGo:
      "Skärgårdsstämning på fastlandet, med en av Stockholms vackraste små hamnar.",
    whatToDo:
      "Besök Dalarö skans, strosa bland sjöbodarna, bada vid Pålbobadet och fika i hamnen.",
    eatAndCoffee:
      "Dalarö Skeppshandel och Hamnkrogen för fika och fisk.",
    bestSeason: "Maj–september.",
    image: "https://picsum.photos/seed/dalaro/800/600",
  },
  {
    id: "trosa",
    name: "Trosa",
    category: "Småstad / by",
    description:
      "Sörmlands minsta stad — färgglada trähus, å-promenad och en av länets mysigaste hamnar.",
    travelTime: "ca 1 h 10 min med bil",
    travelMinutes: 70,
    distanceRange: "60-120",
    indoorOutdoor: "Både och",
    moodTags: ["Mysig", "Romantisk", "Fotovänlig", "Solig dag"],
    practicalTags: ["Mat finns", "Café i närheten", "Bra på sommaren"],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: false,
    island: false,
    costLevel: 2,
    duration: "Halvdag",
    bestFor: ["Promenad längs ån", "Hamnliv", "Bad vid Tureholm"],
    howToGetThere:
      "Bil ca 1 h 10 min via E4. Ingen direkt tågförbindelse — buss går via Vagnhärad.",
    goodToKnow:
      "Sommartid är hamnen full av segelbåtar och uteserveringar — boka bord i förväg på helger.",
    whyGo:
      "Sveriges minsta stad med största charmen, perfekt för en lugn dag med fika och promenader.",
    whatToDo:
      "Strosa längs Trosaån, handla i de gamla trähusen, bada vid Tureholms slott och avsluta med fiskmiddag i hamnen.",
    eatAndCoffee:
      "Trosa Stadshotell och flera kaféer i de gamla magasinen.",
    bestSeason: "Maj–september.",
    image: "https://picsum.photos/seed/trosa/800/600",
  },
  {
    id: "norrtalje",
    name: "Norrtälje",
    category: "Småstad / by",
    description:
      "Roslagens huvudstad med charmig stadskärna, hamnpromenad och porten till norra skärgården.",
    travelTime: "ca 1 h med bil eller buss",
    travelMinutes: 60,
    distanceRange: "60-120",
    indoorOutdoor: "Både och",
    moodTags: ["Mysig", "Fotovänlig", "Budgetvänlig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Barnvänligt",
      "Bra på sommaren",
    ],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 1,
    duration: "Halvdag",
    bestFor: ["Stadspromenad", "Hamnliv", "Utgångspunkt för norra skärgården"],
    howToGetThere:
      "Buss 676 från Tekniska högskolan, ca 1 h. Bil samma restid via E18.",
    goodToKnow:
      "Bra utgångspunkt för vidare båtresor till öar som Blidö och Arholma.",
    whyGo:
      "En riktig småstad med levande hamn, gammal träbebyggelse och närhet till norra skärgårdens öar.",
    whatToDo:
      "Vandra längs hamnen, besök Roslagsmuseet, handla på torget och avsluta med glass vid kanalen.",
    eatAndCoffee:
      "Lilla Tobago och flera kaféer kring Societetsparken.",
    bestSeason: "Maj–september.",
    image: "https://picsum.photos/seed/norrtalje/800/600",
  },
  {
    id: "nynashamn",
    name: "Nynäshamn",
    category: "Småstad / by",
    description:
      "Sörmlands kuststad med klippbad, fiskhamn och färjeläge mot Gotland och södra skärgården.",
    travelTime: "ca 50 min med pendeltåg",
    travelMinutes: 50,
    distanceRange: "30-60",
    indoorOutdoor: "Både och",
    moodTags: ["Mysig", "Aktiv", "Solig dag", "Budgetvänlig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Bra på sommaren",
    ],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 1,
    duration: "Halvdag",
    bestFor: ["Klippbad vid Nickstabadet", "Fiskhamnen", "Utgångspunkt för Utö/Landsort"],
    howToGetThere:
      "Pendeltåg direkt till Nynäshamn, ca 50 min från city.",
    goodToKnow:
      "Bra startpunkt för dagsutflykt vidare till Utö eller fyren Landsort.",
    whyGo:
      "Enkel kollektivtrafik, fina klippbad och en levande fiskhamn — utan att behöva ta bil eller boka båt i förväg.",
    whatToDo:
      "Bada vid Nickstabadet, handla färsk fisk i hamnen och vandra ut mot Stora Vika.",
    eatAndCoffee:
      "Nynäshamns Fisk & Skaldjur och flera kaféer i hamnen.",
    bestSeason: "Maj–september.",
    image: "https://picsum.photos/seed/nynashamn/800/600",
  },
  {
    id: "gustavsberg",
    name: "Gustavsberg",
    category: "Kultur",
    description:
      "Gammal porslinsfabriksort i Värmdö, idag konsthall, designbutiker och hamnpromenad.",
    travelTime: "ca 35 min med buss",
    travelMinutes: 35,
    distanceRange: "30-60",
    indoorOutdoor: "Både och",
    moodTags: ["Mysig", "Fotovänlig", "Budgetvänlig"],
    practicalTags: [
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Bra på vintern",
      "Bra på sommaren",
    ],
    seasonTags: ["Året runt"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 1,
    duration: "1-2 timmar",
    bestFor: ["Porslinsmuseet", "Konsthallen", "Designshopping"],
    howToGetThere:
      "Buss 474 från Slussen till Gustavsbergs centrum, ca 35 min.",
    goodToKnow:
      "Porslinsfabrikens gamla lokaler hyser idag både museum, konsthall och outlet-butiker.",
    whyGo:
      "Svensk designhistoria mitt i en levande hamnmiljö, lagom långt från stan för en kort utflykt.",
    whatToDo:
      "Besök Konsthallen och Porslinsmuseet, fynda i outleten och promenera längs Farstaviken.",
    eatAndCoffee:
      "Hamncaféet och flera lunchställen i gamla fabriksbyggnaden.",
    bestSeason: "Året runt.",
    image: "https://picsum.photos/seed/gustavsberg/800/600",
  },
  {
    id: "langholmen",
    name: "Långholmen",
    category: "Badplats",
    description:
      "Grönskande ö mitt i stan med klippbad, gammalt fängelse och fina solnedgångar över Riddarfjärden.",
    travelTime: "ca 15 min med tunnelbana",
    travelMinutes: 15,
    distanceRange: "0-30",
    indoorOutdoor: "Utomhus",
    moodTags: ["Lugn & vacker", "Solig dag", "Budgetvänlig", "Fotovänlig"],
    practicalTags: [
      "Utomhus",
      "Lätt med kollektivtrafik",
      "Mat finns",
      "Café i närheten",
      "Hundvänligt",
      "Bra på sommaren",
    ],
    seasonTags: ["Sommar"],
    foodAvailable: true,
    cafeAvailable: true,
    publicTransport: true,
    island: true,
    costLevel: 1,
    duration: "1-2 timmar",
    bestFor: ["Klippbad", "Solnedgång", "Picknick"],
    howToGetThere:
      "Tunnelbana till Hornstull, sedan kort promenad över bron, totalt ca 15 min.",
    goodToKnow:
      "Populärt bland stockholmare på sommarkvällar — kom tidigt för bästa klippan.",
    whyGo:
      "Stadsnära skärgårdskänsla utan att lämna tunnelbanans räckhåll.",
    whatToDo:
      "Bada från klipporna, vandra runt ön förbi gamla fängelsemuren och avsluta med solnedgång vid Pålsundet.",
    eatAndCoffee:
      "Långholmens Wärdshus och flera kiosker längs vattnet.",
    bestSeason: "Juni–augusti.",
    image: "https://picsum.photos/seed/langholmen/800/600",
  },
  {
    id: "monteliusvagen",
    name: "Monteliusvägen",
    category: "Utsiktsplats",
    description:
      "Stockholms mest fotograferade utsiktsstig längs Söders höjder, med vy över Riddarfjärden och Stadshuset.",
    travelTime: "ca 10 min med tunnelbana",
    travelMinutes: 10,
    distanceRange: "0-30",
    indoorOutdoor: "Utomhus",
    moodTags: ["Romantisk", "Fotovänlig", "Lugn & vacker", "Solig dag"],
    practicalTags: [
      "Utomhus",
      "Lätt med kollektivtrafik",
      "Café i närheten",
      "Bra på sommaren",
    ],
    seasonTags: ["Året runt"],
    foodAvailable: false,
    cafeAvailable: true,
    publicTransport: true,
    island: false,
    costLevel: 1,
    duration: "1-2 timmar",
    bestFor: ["Solnedgång", "Fotografering", "Kvällspromenad"],
    howToGetThere:
      "Tunnelbana till Mariatorget eller Slussen, sedan kort promenad upp, totalt ca 10 min.",
    goodToKnow:
      "Som mest magisk i samband med solnedgång — populärt, så kom gärna i god tid.",
    whyGo:
      "En av de bästa gratisvyerna i stan, mitt i city men ändå overkligt vacker.",
    whatToDo:
      "Promenera hela stigen från Mariatorget till Fjällgatan, stanna vid bänkarna för utsikten och avsluta vid Fåfängan.",
    eatAndCoffee:
      "Flera kaféer vid Mariatorget i ena änden av promenaden.",
    bestSeason: "Året runt, men sommarkvällar är magiska.",
    image: "https://picsum.photos/seed/monteliusvagen/800/600",
  },
  {
    id: "bogesund",
    name: "Bogesund naturreservat",
    category: "Vandringsled",
    description:
      "Vidsträckt naturreservat utanför Vaxholm med ekhagar, vandringsleder och utsikt över Vaxholms fästning.",
    travelTime: "ca 40 min med bil",
    travelMinutes: 40,
    distanceRange: "30-60",
    indoorOutdoor: "Utomhus",
    moodTags: ["Lugn & vacker", "Aktiv", "Budgetvänlig", "Fotovänlig"],
    practicalTags: ["Utomhus", "Hundvänligt", "Barnvänligt", "Bra på sommaren"],
    seasonTags: ["Vår", "Sommar", "Höst"],
    foodAvailable: false,
    cafeAvailable: false,
    publicTransport: false,
    island: false,
    costLevel: 1,
    duration: "Halvdag",
    bestFor: ["Vandring", "Ekhagar med kor och får", "Utsikt över Vaxholm"],
    howToGetThere:
      "Bil ca 40 min via Norrtäljevägen mot Bogesund. Parkering vid Bogesunds slott.",
    goodToKnow:
      "Leden går delvis genom betesmark — håll hundar kopplade nära djuren.",
    whyGo:
      "Ett av Stockholms finaste naturreservat, med gammal ekskog och milsvid utsikt mot skärgården.",
    whatToDo:
      "Vandra Bogesundsleden, besök slottsruinen och njut av utsikten mot Vaxholms fästning.",
    eatAndCoffee:
      "Inget på plats — packa matsäck eller stanna till i Vaxholm efteråt.",
    bestSeason: "Maj–oktober.",
    image: "https://picsum.photos/seed/bogesund/800/600",
  },
  {
    id: "skinnarviksberget",
    name: "Skinnarviksberget",
    category: "Utsiktsplats",
    description:
      "Söders högsta klipphäll med ett av stans bästa utsiktsställen, populär plats för picknick i solnedgången.",
    travelTime: "ca 10 min med tunnelbana",
    travelMinutes: 10,
    distanceRange: "0-30",
    indoorOutdoor: "Utomhus",
    moodTags: ["Solig dag", "Fotovänlig", "Budgetvänlig", "Romantisk"],
    practicalTags: ["Utomhus", "Lätt med kollektivtrafik", "Bra på sommaren"],
    seasonTags: ["Sommar"],
    foodAvailable: false,
    cafeAvailable: false,
    publicTransport: true,
    island: false,
    costLevel: 1,
    duration: "1-2 timmar",
    bestFor: ["Picknick", "Solnedgång", "Klippsolande"],
    howToGetThere:
      "Tunnelbana till Hornstull, sedan ca 10 min promenad upp på berget.",
    goodToKnow:
      "Populärt bland stockholmare sommartid — ta med eget fika, inget finns att köpa på plats.",
    whyGo:
      "Gratis utsikt i klass med betydligt dyrare ställen, mitt i stan.",
    whatToDo:
      "Klättra upp på klipporna, ha picknick och titta på solen gå ner över Riddarfjärden.",
    eatAndCoffee:
      "Inget på plats — närmaste kafé finns nere vid Hornstull.",
    bestSeason: "Maj–augusti.",
    image: "https://picsum.photos/seed/skinnarviksberget/800/600",
  },
];
