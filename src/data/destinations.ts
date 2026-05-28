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
];
