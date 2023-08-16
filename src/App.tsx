import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Navbar from "./components/Navbar";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import AnswerBox from "./components/AnswerBox";
import FeedbackDisplay from "./components/FeedbackDisplay";
import HintButton from "./components/HintButton";
import Footer from "./components/Footer";
import HintDisplay from "./components/HintDisplay";


//Algdat
const allTopics = [
  {
    id: 1,
    questionText:
      "For at noe skal bli topologisk sortert, hvilken type graf må det være, og hvorfor er topologisk sortering viktig?",
    clue: "Topologisk sortering er en lineær rekkefølge av verteksene i en rettet graf. Tenk på forutsetninger eller forhold som må være oppfylt før en bestemt hendelse kan skje. Det er viktig i oppgaver som planlegging",
  },
  {
    id: 2,
    questionText:
      "Hvordan kan Dybde-først-søk (DFS) være spesielt nyttig i forhold til labyrinter?",
    clue: "Forestill deg at du utforsker en labyrint ved å gå så dypt inn i en sti som mulig før du vender tilbake. Hvordan vil dette hjelpe deg med å finne veien ut?",
  },
  {
    id: 3,
    questionText:
      "Hva er hovedmålet til Bredde-først-søk (BFS) i grafalgoritmer?",
    clue: "Når du vil utforske alle naboene på samme nivå før du går dypere inn, hvilken metode ville vært nyttig? Dette er spesielt viktig i nettverk eller sosiale grafer.",
  },
  {
    id: 4,
    questionText:
      "Hvilken datastruktur kan Prims algoritme effektivt bruke for å holde styr på kanter?",
    clue: "Hvis du vil finne et minimalt spennende tre, hvilken datastruktur ville vært nyttig for å holde styr på kanter?",
  },
  {
    id: 5,
    questionText:
      "Hvordan kan Kruskals algoritme sikre at det ikke dannes sykler når den konstruerer et minimalt spennende tre?",
    clue: "Når du bygger en sammenhengende struktur uten sykler, hvilken datastruktur vil hjelpe deg med å raskt finne ut om to noder allerede er koblet sammen?",
  },
  {
    id: 6,
    questionText:
      "Hvilken egenskap ved Bellmann-Ford algoritmen gjør den egnet for grafer med negative kantvekter?",
    clue: " Noen algoritmer tar hensyn til alle mulige stier for å finne den korteste. Hvordan ville negative kantvekter påvirke slike algoritmer?",
  },
  {
    id: 7,
    questionText:
      "Hvilken antagelse gjør Dijkstras algoritme om kantvektene i en graf?",
    clue: " For at en algoritme skal fungere effektivt, er det noen antagelser den må gjøre om dataene. Hva ville vært utfordringen hvis kantvektene var både positive og negative?",
  },
  {
    id: 8,
    questionText:
      "Hvilken algoritme kan du bruke for å finne korteste vei fra alle noder til alle andre noder i en graf, og hva er dens kjøretid i store O-notasjon?",
    clue: "For å finne avstandene mellom alle par av noder, hvilken algoritme tar hensyn til både direkte og indirekte veier? Tenk på dens effektivitet i O-notasjon.",
  },
  {
    id: 9,
    questionText:
      "Hva er hovedforskjellen mellom Ford-Fulkerson og Edmonds-Karp algoritmen?",
    clue: "Begge er flytalgoritmer, men en bruker en spesiell teknikk for å finne stier. Hva er denne teknikken?",
  },
  {
    id: 10,
    questionText:
      "Etter å ha funnet maksimal flyt, hvordan kan du bestemme et min-snitt basert på residualgraf og flytverdier i originalnettverket?",
    clue: "Etter å ha funnet den maksimale flyten, er det en spesiell deling av grafen som kan hjelpe deg med å verifisere denne flyten. Hvordan er denne delingen relatert til residualgrafen?",
  },
  {
    id: 11,
    questionText:
      "I konteksten av flytalgoritmer, hva er en 'bottle-neck' verdi, og hvordan påvirker den mengden flyt som kan sendes langs en sti i nettverket?",
    clue: "I et nettverk med flere kanter, hvilken kant bestemmer hvor mye flyt du faktisk kan sende? Tenk på den svakeste lenken i en kjede.",
  },
  {
    id: 12,
    questionText:
      "Hva betyr det hvis du kan nå en node i residualgrafen, men ikke i den originale grafen etter at maksimal flyt har blitt funnet?",
    clue: "Residualgrafen representerer hvor mye mer flyt som kan legges til. Hvis en node er tilgjengelig her og ikke i originalen, hva sier det om kapasiteten?",
  },
  {
    id: 13,
    questionText:
      "Hvordan kan et min-snitt hjelpe oss å verifisere riktigheten av en maksimal flyt i et nettverk?",
    clue: "Min-snitt gir oss en grense for flytverdien. Hvordan kan dette hjelpe oss med å sjekke maksimal flyt?",
  },
  {
    id: 14,
    questionText:
      "Hvorfor er det viktig at alle kapasitetene er heltall når man bruker Ford-Fulkerson algoritmen?",
    clue: "Hva ville skje hvis vi fortsatte å dele en desimal kapasitet i mindre og mindre deler?",
  },
  {
    id: 15,
    questionText:
      "Beskriv kort forskjellen mellom en flyt og en kapasitet i konteksten av maks-flyt problemer.",
    clue: "Tenk på en motorvei: kapasitet representerer maksimalt antall biler den kan håndtere, mens flyt representerer det aktuelle antallet biler på veien.",
  },
  {
    id: 16,
    questionText:
      "Hvordan kan du bruke topologisk sortering for å finne korteste veier i en DAG?",
    clue: "Ved å sortere nodene, kan vi sikre at alle forløpere til en node blir behandlet først. Hvordan hjelper dette med å beregne korteste vei?",
  },
  {
    id: 17,
    questionText:
      "Hvilken algoritme kan du bruke hvis du vil detektere en negativ vekt syklus i en rettet graf?",
    clue: "Det er en algoritme som ved gjentatt oppdatering kan avsløre om en syklus med negativ vekt eksisterer.",
  },
  {
    id: 18,
    questionText:
      "Hva er en 'greedy' algoritme, og hvordan gjelder dette prinsippet for Prims og Kruskals algoritmer?",
    clue: "Disse algoritmene tar den beste avgjørelsen på det nåværende tidspunktet uten å tenke på fremtiden. Hvordan bruker Prims og Kruskals denne tilnærmingen?",
  },
  {
    id: 19,
    questionText:
      "Hvilken teknikk benytter Dijkstra's algoritme for å sikre at den alltid velger den noden som ligger nærmest startnoden?",
    clue: "Det er en datastruktur som effektivt kan hente det minste elementet. Hva er denne datastrukturen?",
  },
];

const sortingAlgorithms = [
  {
    id: 1,
    questionText:
      "Hvordan bestemmer Counting Sort hvilken posisjon hvert element skal ha i det sorterte resultatet?",
    clue: "Denne algoritmen teller forekomstene av hvert unike element. Hvordan kan denne tellingen hjelpe med posisjonering?",
  },
  {
    id: 2,
    questionText:
      "Hvorfor kan ikke Counting Sort brukes effektivt for sortering av flyttall?",
    clue: "Tenk på hvordan Counting Sort benytter indekser basert på inputverdier.",
  },
  {
    id: 3,
    questionText:
      "Hvordan kan Radix Sort håndtere både positive og negative tall?",
    clue: "For negative tall, hva skjer hvis vi ser på dem som komplementære verdier?",
  },
  {
    id: 4,
    questionText:
      "Hvilket prinsipp bruker Bucket Sort for å distribuere elementer i ulike bøtter?",
    clue: "Tenk på intervaller og hvordan dataene kan deles opp basert på verdi.",
  },
  {
    id: 5,
    questionText:
      "Hvordan sikrer Radix Sort at rekkefølgen av elementer som har samme siffer i en gitt posisjon blir bevart etter sortering?",
    clue: "Dette har å gjøre med stabilitet. Hvordan beholder algoritmen sin stabilitet under sortering?",
  },
  {
    id: 6,
    questionText:
      "Hva er kjøretiden til Counting Sort i store O-notasjon når inputområdet er k?",
    clue: "Kjøretiden avhenger av antall elementer (n) og deres verdiområde (k). Hvordan kombineres disse for å bestemme effektiviteten?",
  },
  {
    id: 7,
    questionText:
      "Hvorfor er Bucket Sort ikke alltid den beste sorteringsteknikken for alle datadistribusjoner?",
    clue: "Hvordan blir elementene distribuert i bøtter og hva hvis alle elementene ender opp i en enkelt bøtte?",
  },
  {
    id: 8,
    questionText: "På hvilke datatyper fungerer Radix Sort best, og hvorfor?",
    clue: "Tenk på hvordan Radix Sort bryter ned tallene basert på deres siffer.",
  },
  {
    id: 9,
    questionText:
      "Hva er kjøretiden til Radix Sort hvis antall siffer i det største tallet er d og det er n elementer i listen?",
    clue: "Radix sort kjører en bestemt sorteringsteknikk d ganger. Hvordan påvirker dette total kjøretid?",
  },
  {
    id: 10,
    questionText: "Hvilke faktorer påvirker kjøretiden til Bucket Sort mest?",
    clue: "Tenk på fordelingen av data i bøttene og hvordan dataene deretter blir sortert innenfor hver bøtte.",
  },
  {
    id: 11,
    questionText:
      "Hvordan kan en optimal antall bøtter for Bucket Sort bestemmes basert på inngangsdata?",
    clue: "Optimal fordeling kan avhenge av spredningen og fordelingen av inngangsdata.",
  },
  {
    id: 12,
    questionText:
      "Hva er forskjellen mellom en stabil og en ustabil sorteringsalgoritme, og hvorfor er dette viktig?",
    clue: "Tenk på den relative rekkefølgen av like elementer før og etter sortering.",
  },
  {
    id: 13,
    questionText:
      "Hvorfor har algoritmer som Counting Sort, Radix Sort og Bucket Sort en lineær kjøretid under visse forutsetninger?",
    clue: "Disse algoritmene unngår typisk parvis sammenligning av elementer. Hvordan påvirker dette kjøretiden?",
  },
  {
    id: 14,
    questionText:
      "Hvilken sorteringsalgoritme ville du anbefalt for å sortere store mengder telefonnumre, og hvorfor?",
    clue: "Telefonnumre har flere siffer og en definert lengde. Hvordan kan vi utnytte dette for sortering?",
  },
  {
    id: 15,
    questionText:
      "Kan Bucket Sort brukes effektivt for sortering av strenger? Hvis ja, hvordan?",
    clue: "Tenk på hvordan strenger kan brytes ned til individuelle tegn og hvordan disse tegnene kan ha en bestemt verdi.",
  },
  {
    id: 16,
    questionText:
      "Hva er hovedideen bak Radix Sort, og hvordan bruker den Counting Sort som en hjelpeprosedyre?",
    clue: "Hvordan sorterer Radix Sort tall basert på individuelle siffer fra minst signifikante til mest signifikante?",
  },
  {
    id: 17,
    questionText:
      "Hvilke begrensninger har Counting Sort, og hvordan kan de begrensningene påvirke ytelsen av algoritmen?",
    clue: "Tenk på minneforbruk og hvordan verdiområdet påvirker dette.",
  },
  {
    id: 18,
    questionText:
      "Hvordan påvirker størrelsen på inputområdet (k) minnebruket i Counting Sort?",
    clue: "Algoritmen må opprette et array basert på maksverdien i inputområdet. Hvordan påvirker dette minnebruket?",
  },
  {
    id: 19,
    questionText:
      "Hva er forholdet mellom Bucket Sort og Counting Sort i form av hvordan de kategoriserer elementer?",
    clue: "Begge algoritmene grupperer elementer basert på en viss egenskap. Hvilke egenskaper er disse?",
  },
  {
    id: 20,
    questionText:
      "Hvilke forutsetninger gjør at Radix Sort kan oppnå en lineær kjøretid, selv når den behandler flere siffer?",
    clue: "Hvordan påvirker antall siffer (d) og antall elementer (n) i listen effektiviteten av Radix Sort?",
  },
];

const maxFlow = [
  {
    id: 1,
    questionText:
      "Hvordan fungerer Ford-Fulkerson-algoritmen for å finne maksimal flyt i et nettverk?",
    clue: "Tenk på iterative metoder som øker flyten langs stier.",
  },
  {
    id: 2,
    questionText:
      "Hva er hovedforskjellen mellom Edmonds-Karp og Ford-Fulkerson når det gjelder å finne stier?",
    clue: "Hvilken søkestrategi bruker Edmonds-Karp?",
  },
  {
    id: 3,
    questionText:
      "Hvorfor garanterer Edmonds-Karp-algoritmen konvergens på finit tid, mens Ford-Fulkerson ikke alltid gjør det?",
    clue: "Se på hvordan stiene blir valgt og oppdateres.",
  },
  {
    id: 4,
    questionText: "Hvordan kan du bestemme et min-kutt i et flytnettverk?",
    clue: "Se på residualgrafen etter at maksimal flyt er funnet.",
  },
  {
    id: 5,
    questionText:
      "Hva er sammenhengen mellom maks flyt og min kutt i et nettverk?",
    clue: "Min kutt setter en øvre grense for...",
  },
  {
    id: 6,
    questionText:
      "Hvorfor er det viktig at alle kapasiteter er heltall når man bruker Ford-Fulkerson-algoritmen?",
    clue: "Tenk på problemene med uendelige loops.",
  },
  {
    id: 7,
    questionText: "Hvordan håndterer Ford-Fulkerson-algoritmen tilbakeflyt?",
    clue: "Se på hvordan residualgrafen oppdateres.",
  },
  {
    id: 8,
    questionText:
      "Hva er kjøretiden til Edmonds-Karp-algoritmen i store O-notasjon?",
    clue: "Relatert til antall kanter og vertikser.",
  },
  {
    id: 9,
    questionText:
      "Hvordan bruker Edmonds-Karp-algoritmen bredde-først-søk (BFS) til sin fordel?",
    clue: "BFS finner korteste stier i termer av antall kanter.",
  },
  {
    id: 10,
    questionText:
      "Hvordan kan et min-kutt hjelpe oss å verifisere riktigheten av en maksimal flyt i et nettverk?",
    clue: "Se på flytkapasiteten gjennom kuttet.",
  },
  {
    id: 11,
    questionText:
      "Hva er en residualgraf, og hvilken rolle spiller den i algoritmer for maksimal flyt?",
    clue: "Den viser hvilke flytendringer som fortsatt er mulige.",
  },
  {
    id: 12,
    questionText:
      "Hvordan kan du oppdatere residualgrafen etter hver iterasjon av Ford-Fulkerson-algoritmen?",
    clue: "Subtraher flyt langs stien fra de opprinnelige kapasitetene.",
  },
  {
    id: 13,
    questionText:
      "Hva menes med 'bottle-neck' verdi i konteksten av flytalgoritmer?",
    clue: "Minste kapasitet på en sti bestemmer...",
  },
  {
    id: 14,
    questionText:
      "Hvordan kan maks flyt-problemet transformeres til et bipartitt matchingsproblem?",
    clue: "Tenk på hvordan du ville representert jobber og arbeidstakere i et nettverk.",
  },
  {
    id: 15,
    questionText:
      "Hvordan påvirker valg av sti i Ford-Fulkerson-algoritmen dens konvergenshastighet?",
    clue: "Ikke alle stier gir samme mengde forbedring.",
  },
  {
    id: 16,
    questionText:
      "Kan Ford-Fulkerson-algoritmen finne en løsning hvis grafen har flytende kapasiteter? Hvis ikke, hvorfor?",
    clue: "Hva skjer hvis vi har et veldig lite tall som kapasitet?",
  },
  {
    id: 17,
    questionText:
      "Hvordan relaterer Push-Relabel-algoritmen seg til Ford-Fulkerson og Edmonds-Karp i forhold til å løse maks flyt-problemet?",
    clue: "Push-Relabel har en annen tilnærming til å øke flyt.",
  },
  {
    id: 18,
    questionText:
      "Hvilke typer nettverksflytproblemer kan være mer effektive å løse med Push-Relabel enn med Edmonds-Karp?",
    clue: "Se på problemstørrelse og natur.",
  },
  {
    id: 19,
    questionText:
      "Hva er målet med å bruke flere kilder og sluk i et nettverksflytproblem, og hvordan kan tradisjonelle algoritmer tilpasses for å løse dem?",
    clue: "Tenk på scenarioer der det er mer enn en start eller slutt.",
  },
  {
    id: 20,
    questionText:
      "Beskriv hvordan begrepet maks flyt kan brukes i virkelige applikasjoner som nettverksrouting eller jobbskjemaplanlegging.",
    clue: "Nettverksrouting handler om datatrafikk, mens jobbskjema handler om tildeling av oppgaver.",
  },
];

//Stats
const statisticsQuestions = [
  {
    id: 1,
    questionText:
      "Gitt to uavhengige stokastiske variabler $$X$$ og $$Y$$ med forventningsverdier $$\\mu_X$$ og $$\\mu_Y$$ og varianser $$\\sigma^2_X$$ og $$\\sigma^2_Y$$ henholdsvis, hva er variansen til $$Z = aX + bY$$ hvor $$a$$ og $$b$$ er konstanter?",
    clue: "Variansen til $$Z$$ er gitt ved: $$a^2\\sigma^2_X + b^2\\sigma^2_Y$$.",
  },
  {
    id: 2,
    questionText: "Hva kjennetegner et stokastisk forsøk?",
    clue: "Resultatet kan ikke forutsies med sikkerhet.",
  },
  {
    id: 3,
    questionText: "Kan du definere hva en hendelse er i sannsynlighetsteori?",
    clue: "En samling av utfall fra et stokastisk forsøk.",
  },
  {
    id: 4,
    questionText: "Hvordan beregner man sannsynligheten for en hendelse?",
    clue: "Forholdet mellom gunstige utfall og alle mulige utfall.",
  },
  {
    id: 5,
    questionText: "Hva er kombinatorikk?",
    clue: "Studiet av hvordan man kan telle, arrangere og velge objekter.",
  },
  {
    id: 6,
    questionText: "Kan du nevne noen regneregler for sannsynlighet?",
    clue: "Tenk på addisjons- og multiplikasjonsreglene.",
  },
  {
    id: 7,
    questionText: "Hva er en stokastisk variabel?",
    clue: "En funksjon som tildeler et tall til hvert utfall av et stokastisk forsøk.",
  },
  {
    id: 8,
    questionText: "Hvordan defineres en sannsynlighetsfordeling?",
    clue: "Listen av alle mulige verdier av en stokastisk variabel og deres sannsynligheter.",
  },
  {
    id: 9,
    questionText: "Hva betyr det når to stokastiske variabler er uavhengige?",
    clue: "Kunnskap om verdien til en påvirker ikke verdien til den andre.",
  },
  {
    id: 10,
    questionText: "Hvordan beregner du forventningsverdi og varians?",
    clue: "Forventningsverdi er et vektet gjennomsnitt; varians måler spredningen.",
  },
  {
    id: 11,
    questionText: "Hva er kovarians og korrelasjon?",
    clue: "Mål på hvordan to stokastiske variabler varierer sammen.",
  },
  {
    id: 12,
    questionText: "Hvordan kan du forklare en binomisk fordeling?",
    clue: "Tenk på (n) uavhengige forsøk med to mulige utfall.",
  },
  {
    id: 13,
    questionText: "Kan du forklare hva en poissonfordeling er?",
    clue: "Brukes ofte for å modellere antall hendelser innenfor en fast tidsperiode.",
  },
  {
    id: 14,
    questionText: "Hva kjennetegner normalfordelingen?",
    clue: "Klokkeformet fordeling med kjente egenskaper.",
  },
  {
    id: 15,
    questionText: "Hva er hovedtrekkene ved eksponensialfordelingen?",
    clue: "Modellerer tiden mellom hendelser i en Poisson-prosess.",
  },
  {
    id: 16,
    questionText:
      "Hva er momentgenererende funksjoner, og hvorfor er de nyttige?",
    clue: "De genererer momentene (som forventning og varians) av en fordeling.",
  },
  {
    id: 17,
    questionText: "Hva menes med statistisk inferens?",
    clue: "Metoder for å trekke konklusjoner om en populasjon basert på et utvalg.",
  },
  {
    id: 18,
    questionText: "Hva er forskjellen mellom en populasjon og et utvalg?",
    clue: "Populasjonen er helheten, mens utvalget er en del av den.",
  },
  {
    id: 19,
    questionText: "Hva er en estimator?",
    clue: "En statistikk som estimerer en parameter i populasjonen.",
  },
  {
    id: 20,
    questionText: "Hva kjennetegner et konfidensintervall?",
    clue: "Et intervall der en populasjonsparameter ligger med en viss sannsynlighet.",
  },
];

const statisticsQuestions2 = [
  {
    id: 1,
    questionText: "Hva er hovedantagelsene i en lineær regresjonsmodell?",
    clue: "Linearitet, uavhengighet, homoskedasticitet, normalitet av feil.",
  },
  {
    id: 2,
    questionText:
      "Hvorfor er det viktig å sjekke for multicollinearity i en multippel regresjonsmodell?",
    clue: "Det kan gjøre tolkningen av koeffisientene vanskelig og redusere modellens stabilitet.",
  },
  {
    id: 3,
    questionText: "Hva er hovedmålet med regresjonsmodellvalidering?",
    clue: "Å vurdere hvor godt modellen generaliserer til nye data.",
  },
  {
    id: 4,
    questionText: "Hvordan tolker du den justerte ( R^2 ) verdien?",
    clue: "Måler hvor godt regresjonsforutsigelser samsvarer med de observerte dataene, justert for antall prediktorer.",
  },
  {
    id: 5,
    questionText: "Hva er hensikten med en F-test i regresjonsanalyse?",
    clue: "Å teste om det er en signifikant relasjon mellom den avhengige variabelen og settet av uavhengige variabler.",
  },
  {
    id: 6,
    questionText:
      "Hvordan kan du inkludere polynomiale termer i en lineær regresjonsmodell?",
    clue: "Ved å legge til potensene av den uavhengige variabelen.",
  },
  {
    id: 7,
    questionText: "Hva er logistisk regresjon og når ville du bruke den?",
    clue: "En regresjonsmodell for binær utfall. Når målvariabelen er kategorisk med to kategorier.",
  },
  {
    id: 8,
    questionText:
      "Hvordan håndterer du manglende data når du bygger en regresjonsmodell?",
    clue: "Metoder som imputering, listevis sletting eller modellbasert tilnærming.",
  },
  {
    id: 9,
    questionText: "Hva er regularisert regresjon og hvorfor brukes den?",
    clue: "En metode som legger til en straff på regresjonskoeffisienter for å forhindre overtilpasning.",
  },
  {
    id: 10,
    questionText:
      "Hva menes med heteroskedasticity, og hvordan kan det påvirke regresjonsanalysen?",
    clue: "Ujevn spredning av feilene. Det kan skjevhet standardfeil og konfidensintervaller.",
  },
  {
    id: 11,
    questionText:
      "Hvordan kan du vurdere den diagnostiske ytelsen til en logistisk regresjonsmodell?",
    clue: "Ved hjelp av metoder som ROC-kurve eller konfusjonsmatrise.",
  },
  {
    id: 12,
    questionText:
      "Hvordan tolker du oddsforholdet i en logistisk regresjonsmodell?",
    clue: "Som en endring i oddsen for utfallet for en enhetsendring i predikatoren.",
  },
  {
    id: 13,
    questionText:
      "Hva er forskjellen mellom faste og tilfeldige effekter i regresjonsanalyse?",
    clue: "Faste effekter er konstante for individer, mens tilfeldige effekter varierer.",
  },
  {
    id: 14,
    questionText:
      "Hvordan kan du sjekke for autocorrelation i regresjonsanalyse?",
    clue: "Ved hjelp av Durbin-Watson-testen eller plott av residensene.",
  },
  {
    id: 15,
    questionText:
      "Hva er kvantilregresjon, og når ville du vurdere å bruke den?",
    clue: "Estimerer medianten eller andre kvantiler. Nyttig når forholdet mellom variabler ikke er konstant over hele distribusjonen.",
  },
  {
    id: 16,
    questionText: "Hva er Cook's avstand i regresjonsanalyse?",
    clue: "Et mål på innflytelsen til en observasjon på alle regresjonsestimatene.",
  },
  {
    id: 17,
    questionText:
      "Hvordan kan du vurdere modelltilpasningen i en ikke-lineær regresjonsmodell?",
    clue: "Ved å sammenligne modellens prediksjoner med de observerte dataene, samt ved å bruke residualplott.",
  },
  {
    id: 18,
    questionText:
      "Hva er målet med en regulariseringsterm som L1 eller L2 i en regresjonsmodell?",
    clue: "For å legge til en straff på størrelsen av koeffisienter og forhindre overtilpasning.",
  },
  {
    id: 19,
    questionText: "Hva er et interaksjonsterm i regresjonsanalyse?",
    clue: "En term som representerer produktet av to eller flere uavhengige variabler.",
  },
  {
    id: 20,
    questionText:
      "Hva er hovedforskjellen mellom en parametrisk og en ikke-parametrisk regresjonsmodell?",
    clue: "Den formelle antagelsen om formen på den funksjonelle relasjonen mellom variablene.",
  },
];

const statisticsQuestions3 = [
  {
    id: 1,
    questionText:
      "Gitt en stokastisk variabel $$X$$ med forventningsverdi $$\\mu$$ og varians $$\\sigma^2$$, hva er forventningsverdien og variansen til $$Y = aX + b$$ hvor $$a$$ og $$b$$ er konstanter?",
    clue: "Forventningsverdi: $$\\mu_Y = a\\mu + b$$, Varians: $$\\sigma^2_Y = a^2\\sigma^2$$.",
  },
  {
    id: 2,
    questionText:
      "Hvordan kan korrelasjonen $$\\rho_{XY}$$ mellom to stokastiske variabler $$X$$ og $$Y$$ tolkes?",
    clue: "Korrelasjonen måler den lineære avhengigheten mellom $$X$$ og $$Y$$ og varierer mellom -1 og 1.",
  },
  {
    id: 3,
    questionText:
      "Hva er sammenhengen mellom kovariansen $$\\sigma_{XY}$$ og korrelasjonen $$\\rho_{XY}$$ av to stokastiske variabler?",
    clue: "$$\\rho_{XY} = \\frac{\\sigma_{XY}}{\\sigma_X\\sigma_Y}$$.",
  },
  {
    id: 4,
    questionText:
      "Hva er definisjonen av forventningsverdi for en diskret stokastisk variabel $$X$$?",
    clue: "Forventningsverdi er gitt ved $$E(X) = \\sum x P(X=x)$$.",
  },
  {
    id: 5,
    questionText:
      "Gitt to uavhengige stokastiske variabler $$X$$ og $$Y$$, hva er forventningsverdien til deres produkt?",
    clue: "$$E(XY) = E(X)E(Y)$$ for uavhengige variabler.",
  },
  {
    id: 6,
    questionText:
      "Hvordan er variansen til summen av to uavhengige stokastiske variabler definert?",
    clue: "For $$X$$ og $$Y$$ uavhengige, er det $$Var(X+Y) = Var(X) + Var(Y)$$.",
  },
  {
    id: 7,
    questionText:
      "Hva vil det si at to stokastiske variabler $$X$$ og $$Y$$ er ukorrelerte?",
    clue: "Det betyr at $$E[(X - E(X))(Y - E(Y))] = 0$$ eller tilsvarende at deres kovarians er null.",
  },
  {
    id: 8,
    questionText:
      "Hvordan er standardavviket til en stokastisk variabel $$X$$ med varians $$\\sigma^2$$ definert?",
    clue: "Standardavviket er kvadratroten av variansen: $$\\sigma = \\sqrt{\\sigma^2}$$.",
  },
  {
    id: 9,
    questionText: "Hva er betinget forventning $$E(X|Y=y)$$?",
    clue: "Det er den forventede verdien av $$X$$ gitt en kjent verdi av $$Y$$.",
  },
  {
    id: 10,
    questionText:
      "Hvordan kan du finne kovariansen mellom to stokastiske variabler $$X$$ og $$Y$$?",
    clue: "$$Cov(X, Y) = E(XY) - E(X)E(Y)$$.",
  },
  {
    id: 11,
    questionText:
      "Hva er forventningsverdien og variansen til en binomisk fordelt stokastisk variabel med parametere $$n$$ og $$p$$?",
    clue: "Forventningsverdi: $$\\mu = np$$, Varians: $$\\sigma^2 = np(1-p)$$.",
  },
  {
    id: 12,
    questionText:
      "Hvordan kan forventningsverdien av en funksjon $$g(X)$$ av en stokastisk variabel $$X$$ finnes?",
    clue: "Forventningsverdi: $$E(g(X)) = \\sum g(x) P(X=x)$$ for diskrete variabler.",
  },
  {
    id: 13,
    questionText:
      "For en kontinuerlig stokastisk variabel $$X$$ med tetthetsfunksjon $$f(x)$$, hvordan finner du $$P(a < X < b)$$?",
    clue: "Sannsynligheten er gitt ved integralet: $$\\int_a^b f(x) dx$$.",
  },
  {
    id: 14,
    questionText: "Hva vil det si at to stokastiske variabler er uavhengige?",
    clue: "For to variabler $$X$$ og $$Y$$ betyr det at $$P(X=x, Y=y) = P(X=x)P(Y=y)$$ for alle verdier av $$x$$ og $$y$$.",
  },
  {
    id: 15,
    questionText:
      "Hvordan er forventningsverdien til en kontinuerlig stokastisk variabel $$X$$ med tetthetsfunksjon $$f(x)$$ definert?",
    clue: "$$E(X) = \\int_{-\\infty}^{\\infty} x f(x) dx$$.",
  },
  {
    id: 16,
    questionText:
      "Gitt en stokastisk variabel $$X$$ med varians $$\\sigma^2$$, hva er variansen til $$Z = cX$$, hvor $$c$$ er en konstant?",
    clue: "Variansen til $$Z$$ er gitt ved: $$\\sigma^2_Z = c^2\\sigma^2$$.",
  },
  {
    id: 17,
    questionText:
      "Hva er sammenhengen mellom forventningsverdien og medianen av en symmetrisk fordeling?",
    clue: "For en symmetrisk fordeling, er forventningsverdien og medianen like.",
  },
  {
    id: 18,
    questionText:
      "Hva er forventningsverdien til summen av to stokastiske variabler $$X$$ og $$Y$$?",
    clue: "$$E(X+Y) = E(X) + E(Y)$$.",
  },
  {
    id: 19,
    questionText:
      "Hva er definisjonen av korrelasjonskoeffisienten for to stokastiske variabler $$X$$ og $$Y$$?",
    clue: "$$\\rho_{XY} = \\frac{Cov(X,Y)}{\\sigma_X \\sigma_Y}$$.",
  },
  {
    id: 20,
    questionText:
      "Hva er betydningen av en korrelasjonskoeffisient som er lik 0 mellom to stokastiske variabler?",
    clue: "Det indikerer ingen lineær avhengighet mellom de to variablene.",
  },
];

const questions = [
  [[...allTopics], [...sortingAlgorithms], [...maxFlow]],
  [
    [...statisticsQuestions],
    [...statisticsQuestions2],
    [...statisticsQuestions3],
  ],
];

const openai = new OpenAIApi(
  new Configuration({
    apiKey: import.meta.env.VITE_API_KEY,
  }),
);

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    Math.floor(Math.random() * 20),
  );
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState(0);
  const [hint, setHint] = useState(false);
  const [subject, setSubject] = useState<number>(0);

  const goToNextQuestion = () => {
    console.log(topic);
    setFeedback("");
    setHint(false);
    let prevNumber = currentQuestionIndex;
    let randomNum = prevNumber;
    while (randomNum === prevNumber) {
      randomNum = Math.floor(Math.random() * 20);
    }
    console.log("this is the random number: " + randomNum);
    setCurrentQuestionIndex(randomNum);
  };

  const handleSubmit = async () => {
    const prompt =
      "Er dette svaret: " +
      userAnswer +
      ", ett korrekt svar på dette spørsmålet: " +
      questions[subject][topic][currentQuestionIndex].questionText +
      "? Svar kort og presist med 2-3 setninger";
    console.log("this is the prompt: " + prompt);

    setIsLoading(true); // Start loading

    try {
      openai
        .createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        })
        .then((res) => {
          if (
            res.data.choices[0].message &&
            typeof res.data.choices[0].message.content === "string"
          ) {
            console.log(res.data.choices[0].message.content);
            const gptResponse = res.data.choices[0].message.content;
            setIsLoading(false); // Stop loading
            setFeedback(gptResponse);
          }
        });
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
    setUserAnswer(""); // Clear the input after submitting

    const setHint = () => {
      setHint(true);
    };
  };

  return (
    <>
    <div className="fixed top-0 left-0 right-0 z-10">
      {/* Navbar */}
      <Navbar
        setTopic={setTopic}
        setHint={setHint}
        topic={topic}
        setSubject={setSubject}
        questions={questions}
        subject={subject}
      />
      </div>
      <div className="fixed mt-40 left-10 right-10 z-10">
          <div className="flex w-full">
            <div className="h-20 w-3/4 overflow-y-auto overflow-x-hidden">
              <NextButton onClick={goToNextQuestion} />
              <Question
                questionText={
                  questions[subject][topic][currentQuestionIndex].questionText
                }
              />
            </div>
            <div className="w-1/4 flex justify-center items-center">
              <HintButton onClick={setHint} />
            </div>
          </div>
          <div className="flex w-full">
            <AnswerBox
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <div className="w-1/4 flex justify-center items-center">
              <HintDisplay hint={hint} clue={questions[subject][topic][currentQuestionIndex].clue} />
            </div>

        </div>
        <FeedbackDisplay feedback={feedback} isLoading={isLoading} />
      
      
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-0">
        <Footer />
      </div>
    </>
  );
}

export default App;