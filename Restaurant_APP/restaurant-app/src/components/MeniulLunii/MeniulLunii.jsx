import './MeniulLunii.css'
import { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export const BAUTURI = {
  Vinuri: [
    { nume: 'Brunello di Montalcino DOCG 2017', descriere: 'Sangiovese grosso din Toscana — complex, cu note de cireșe negre, cuir și tabac', pret: 380, imagine: '/images/meniu/brunello.jpg' },
    { nume: 'Barolo DOCG 2016 — Nebbiolo', descriere: 'Regele vinurilor italiene din Langhe, cu tanini eleganti și longevitate remarcabilă', pret: 320, imagine: '/images/meniu/barollo.jpg' },
    { nume: 'Tignanello 2019 — Super Tuscan', descriere: 'Sangiovese cu Cabernet Sauvignon, un icon al vinificației toscane contemporane', pret: 295, imagine: '/images/meniu/Tignanello.jpg' },
    { nume: 'Amarone della Valpolicella 2015', descriere: 'Corvina uscată, intensă și bogată — ciocolată, prune uscate și trufe', pret: 265, imagine: '/images/meniu/amarone.jpg' },
    { nume: 'Sancerre Blanc 2021 — Henri Bourgeois', descriere: 'Sauvignon Blanc din Loire — mineral, cu note de lime și piatră de cremene', pret: 185, imagine: '/images/meniu/sancerne.jpg' },
    { nume: 'Puligny-Montrachet 2020 — Chardonnay', descriere: 'Grand Cru de Burgundia, cu note de vanilie, unt și mineralitate remarcabilă', pret: 245, imagine: '/images/meniu/pulogni.jpg' },
    { nume: 'Champagne Moët & Chandon Brut Impérial', descriere: 'Cuvée iconică — brioche, fructe galbene, bule fine și finisaj delicat', pret: 220, imagine: '/images/meniu/moet.jpg' },
    { nume: 'Prosecco di Valdobbiadene DOCG', descriere: 'Glera din Veneto — proaspăt, spumos, cu note de măr verde și flori albe', pret: 120, imagine: '/images/meniu/proseco.jpg' },
    { nume: 'Château Pichon Baron 2018 — Pauillac', descriere: 'Cabernet Sauvignon de Bordeaux — cedru, cassis, tanini nobili', pret: 355, imagine: '/images/meniu/pichon.jpg' },
    { nume: 'Riesling Auslese Mosel 2020', descriere: 'Riesling german cu aciditate vibrantă, miere de albine și petrol nobil', pret: 165, imagine: '/images/meniu/riesling.jpg' },
  ],
  Whisky: [
    { nume: 'Glenfiddich 18 Years — Single Malt', descriere: 'Speyside scotch cu note de fructe tropicale, miere și nuanțe de sherry maturat', pret: 95, imagine: '/images/meniu/Glenfiddich.jpg' },
    { nume: 'Macallan 12 Double Cask', descriere: 'Highland scotch cu vanilie cremată, fructe coapte și unt de caramel din butoaie de sherry', pret: 85, imagine: '/images/meniu/macallan.jpg' },
    { nume: 'Johnnie Walker Blue Label', descriere: 'Blend de excepție — fum delicat, fructe uscate, ciocolată neagră și finisaj lung', pret: 155, imagine: '/images/meniu/johny.jpg' },
    { nume: 'Lagavulin 16 Years — Islay', descriere: 'Scotch turfos iconic din Islay — fum intens, iod, ciocolată și fructe uscate', pret: 115, imagine: '/images/meniu/lagavulin.jpg' },
    { nume: 'Balvenie DoubleWood 17 Years', descriere: 'Maturat în butoaie de bourbon apoi de sherry — miere, fructe de pădure, vanilie', pret: 125, imagine: '/images/meniu/balveni.jpg' },
    { nume: 'Yamazaki 12 Years — Suntory', descriere: 'Single malt japonez — elegant, cu note de piersică, miere de albine și lemn de mizunara', pret: 135, imagine: '/images/meniu/yamazaki.jpg' },
    { nume: 'Laphroaig 10 Years — Islay', descriere: 'Turfos, iodat și medicinal — un whisky cu caracter puternic și fideli devotiți', pret: 88, imagine: '/images/meniu/Laphroaig.jpg' },
    { nume: 'Dalmore 15 Years — Highland', descriere: 'Maturat în butoaie de bourbon, sherry și porto — ciocolată cu lapte, portocale și scorțișoară', pret: 105, imagine: '/images/meniu/dalmore.jpg' },
    { nume: 'Highland Park 18 Years', descriere: 'Orkney scotch cu echilibru perfect — fum delicat, miere de erica și fructe de pădure', pret: 118, imagine: '/images/meniu/Highland.jpg' },
    { nume: 'Oban 14 Years — West Highland', descriere: 'Scotch de coastă cu sare marină, fum ușor, portocale și miere de stâncă', pret: 92, imagine: '/images/meniu/oban.jpg' },
  ],
  Rom: [
    { nume: 'Diplomatico Reserva Exclusiva', descriere: 'Rom venezuelean de 12 ani — caramel, ciocolată și fructe tropicale coapte', pret: 72, imagine: '/images/meniu/diplomatico.jpg' },
    { nume: 'Appleton Estate 21 Years', descriere: 'Jamaica rum de excepție — complex, cu note de stejar, stafide și portocale', pret: 115, imagine: '/images/meniu/appleton.jpg' },
    { nume: 'Zacapa Centenario 23', descriere: 'Sistema solera din Guatemala — vanilie, caramel, miere și scorțișoară', pret: 88, imagine: '/images/meniu/zacapa.jpg' },
    { nume: 'Plantation XO 20th Anniversary', descriere: 'Blend de Barbados și Trinidad maturat în butoaie de cognac — rafinat și complex', pret: 95, imagine: '/images/meniu/plantation.jpg' },
    { nume: 'Havana Club 7 Years', descriere: 'Rom cubanez clasic — tutun blând, miere și lemn fin de cedru cuban', pret: 55, imagine: '/images/meniu/havana.jpg' },
    { nume: 'El Dorado 15 Years — Demerara', descriere: 'Rom guyanez din distileria Demerara — zahăr brun, prune, ananas și piper negru', pret: 85, imagine: '/images/meniu/elDorado.jpg' },
    { nume: 'Mount Gay XO — Barbados', descriere: 'Cel mai vechi brand de rom — complex, cu fructe uscate, cacao și ienibahar', pret: 78, imagine: '/images/meniu/mountGay.jpg' },
    { nume: 'Botucal Reserva Exclusiva', descriere: 'Rom venezuelean artizanal din hacienda privată — elegant, cu ciocolată și trufe', pret: 82, imagine: '/images/meniu/botucal.jpg' },
    { nume: 'Ron Abuelo 12 Years — Panama', descriere: 'Maturat în butoaie de bourbon american — caramel, vanilie și mirodenii fine', pret: 68, imagine: '/images/meniu/abuelo.jpg' },
    { nume: 'Bacardi Ocho 8 Years', descriere: 'Rom alb maturat 8 ani — fructe de padure, caramel și vanilie fină', pret: 52, imagine: '/images/meniu/bacardi.jpg' },
  ],
  Cocktailuri: [
    { nume: 'Negroni Clasic', descriere: 'Campari, gin London Dry, Vermouth Rosso — servit pe gheață cu coajă de portocală', pret: 55, imagine: '/images/meniu/negroni.jpg' },
    { nume: 'Aperol Spritz', descriere: 'Aperol, Prosecco, apă minerală și o felie de portocală proaspătă', pret: 48, imagine: '/images/meniu/aperol.jpg' },
    { nume: 'Old Fashioned cu Bourbon', descriere: "Bourbon Maker's Mark, zahăr brun, Angostura bitters și coajă de portocală", pret: 62, imagine: '/images/meniu/bourboun.jpg' },
    { nume: 'Espresso Martini', descriere: 'Vodka Belvedere, Kahlua, espresso proaspăt — shaked ușor și espumos', pret: 65, imagine: '/images/meniu/espresssoMartini.jpg' },
    { nume: 'Mojito Clasic', descriere: 'Havana Club 3 ani, lime proaspăt, mentă, zahăr de trestie și soda', pret: 52, imagine: '/images/meniu/mojito.jpg' },
    { nume: 'Margarita cu Lime', descriere: 'Tequila Patron Silver, Cointreau, lime proaspăt — cu margine de sare', pret: 58, imagine: '/images/meniu/margherita.jpg' },
    { nume: 'Manhattan cu Rye', descriere: 'Bulleit Rye, Vermouth Rosso, Angostura bitters, cireașă maraschino', pret: 65, imagine: '/images/meniu/Manhattan.jpg' },
    { nume: 'Hugo Spritz', descriere: 'Prosecco, Elderflower, mentă, lime și apă minerală — floral și răcoritor', pret: 48, imagine: '/images/meniu/hugo.jpg' },
    { nume: 'Amaretto Sour', descriere: 'Disaronno, suc de lămâie proaspăt, sirop, albuș de ou și bitter Angostura', pret: 55, imagine: '/images/meniu/amarerto.jpg' },
    { nume: 'Cosmopolitan', descriere: 'Vodka Ciroc, Cointreau, suc de merișor, lime — servit în cupă Martini', pret: 58, imagine: '/images/meniu/cosmopolitan.jpg' },
  ],
  Beri: [
    { nume: 'Peroni Nastro Azzurro', descriere: 'Bere italiană premium la draft — ușoară, curată, perfectă cu pizza sau antipasto', pret: 28, imagine: '/images/meniu/peroni.jpg' },
    { nume: 'Moretti alla Spina', descriere: 'Birra Moretti la halbă — bere italiană ușoară cu gust fin de malț', pret: 28, imagine: '/images/meniu/moretti.jpg' },
    { nume: 'Hoegaarden Wit — bere albă', descriere: 'Bere albă belgiană cu coajă de portocală și coriandru — nefiltrat, răcoritoare', pret: 32, imagine: '/images/meniu/bereAlba.jpg' },
    { nume: 'Leffe Brune', descriere: 'Bere abatiales belgică închisă — caramel, vanilie și note de fructe uscate', pret: 35, imagine: '/images/meniu/leffe.jpg' },
    { nume: 'Paulaner Weissbier', descriere: 'Hefeweizen bavarez autentic — banana, cuișoare și grâu nefiltrat', pret: 35, imagine: '/images/meniu/paulaner.jpg' },
    { nume: 'Grimbergen Blanc', descriere: 'Bere abatiales belgică albă — coriandru, coajă de portocală și aromă fină', pret: 35, imagine: '/images/meniu/crimbingen.jpg' },
    { nume: 'Erdinger Dunkel', descriere: 'Bere weiss neagră bavarezcă — ciocolată, caramel și note de malt prăjit', pret: 38, imagine: '/images/meniu/erdinger.jpg' },
    { nume: 'Stella Artois', descriere: 'Lager belgian premium — ușoară, echilibrată, cu ușoară amăreală de hamei', pret: 25, imagine: '/images/meniu/stella.jpg' },
    { nume: 'Corona Extra', descriere: 'Lager mexican ușor — servit cu felie de lime, perfect pentru vară', pret: 28, imagine: '/images/meniu/corona.jpg' },
    { nume: 'Heineken Premium', descriere: 'Lager olandez clasic la sticlă — proaspăt, curat și recunoscut în toată lumea', pret: 25, imagine: '/images/meniu/heineken.jpg' },
  ],
  Sucuri: [
    { nume: 'Suc de Portocale Proaspăt', descriere: 'Portocale siciliene stoarse la comandă, nefiltat', pret: 22, imagine: '/images/meniu/sucPortocale.jpg' },
    { nume: 'Limonadă Artizanală cu Mentă', descriere: 'Lămâi Amalfi, zahăr de trestie, apă carbogazoasă și mentă proaspătă', pret: 25, imagine: '/images/meniu/limonadaMenta.jpg' },
    { nume: 'Suc de Mere cu Ghimbir', descriere: 'Mere Fuji presate la rece, cu ghimbir proaspăt și puțin lime', pret: 22, imagine: '/images/meniu/mereGhimbir.jpg' },
    { nume: 'Smoothie Mango & Ananas', descriere: 'Mango alphonso și ananas, cu lapte de cocos și lime', pret: 28, imagine: '/images/meniu/mangoAnanas.jpg' },
    { nume: 'Suc de Rodie Proaspăt', descriere: 'Rodie stoarsă la comandă cu puțin lime și miere de flori', pret: 28, imagine: '/images/meniu/sucRodie.jpg' },
    { nume: 'Virgin Mojito', descriere: 'Lime proaspăt, mentă, zahăr de trestie și apă minerală carbogazoasă', pret: 25, imagine: '/images/meniu/virgin.jpg' },
    { nume: 'Suc de Sfeclă cu Lămâie', descriere: 'Sfeclă roșie, morcovi, ghimbir și lămâie presate la rece', pret: 25, imagine: '/images/meniu/sfeclaLmaaie.jpg' },
    { nume: 'Lemonade cu Lavandă', descriere: 'Sirop de lavandă, lămâi presate, apă arteziană — proaspăt și floral', pret: 25, imagine: '/images/meniu/limonadaLavanda.jpg' },
    { nume: 'Suc de Pepene Verde cu Mentă', descriere: 'Pepene roșu fără semințe, mentă proaspătă și puțin sare de Himalaya', pret: 22, imagine: '/images/meniu/limonadaPepene.jpg' },
    { nume: 'Suc de Morcovi și Grepfrut', descriere: 'Morcovi biologici, grepfrut roz și curcuma — detox natural', pret: 22, imagine: '/images/meniu/sucMorcov.jpg' },
  ],
  Ceaiuri: [
    { nume: 'Earl Grey Imperial', descriere: 'Ceai negru Ceylon cu bergamot natural — clasic și elegant, servit cu lapte', pret: 22, imagine: '/images/meniu/earl.jpg' },
    { nume: 'Darjeeling First Flush', descriere: 'Prima recoltă din Darjeeling, delicată și florală — Champagne-ul ceaiurilor', pret: 28, imagine: '/images/meniu/Darjeeling.jpg' },
    { nume: 'Matcha Ceremonial Grade', descriere: 'Matcha japonez de calitate superioară, preparat tradițional cu chasen', pret: 32, imagine: '/images/meniu/matcha.jpg' },
    { nume: 'Oolong Milk Tea', descriere: 'Oolong taiwanez cu note de piersică și miere, servit cu lapte de ovăz', pret: 28, imagine: '/images/meniu/oolong.jpg' },
    { nume: 'Jasmine Pearl', descriere: 'Muguri de ceai verde înfloriți cu flori de iasomie — parfumat și delicat', pret: 28, imagine: '/images/meniu/iasomie.jpg' },
    { nume: 'Ceai de Mentă Morocan', descriere: 'Ceai verde gunpowder cu mentă proaspătă și zahăr din trestie — servit la ibric', pret: 22, imagine: '/images/meniu/morocan.jpg' },
    { nume: 'Rooibos Vanilie', descriere: 'Rooibos sud-african fără cofeină cu vanilie naturală și note de caramel', pret: 22, imagine: '/images/meniu/Rooibos.jpg' },
    { nume: 'Chai Masala Indian', descriere: 'Ceai negru cu cardamom, scorțișoară, ghimbir și piper — servit cu lapte', pret: 25, imagine: '/images/meniu/masala.jpg' },
    { nume: 'Sencha Kyoto', descriere: 'Ceai verde japonez de calitate, cu gust de iarbă proaspătă și note marine', pret: 25, imagine: '/images/meniu/sencha.jpg' },
    { nume: 'Ceai de Hibiscus cu Trandafir', descriere: 'Petale de hibiscus și trandafir de damasc, servit cald sau rece cu miere', pret: 22, imagine: '/images/meniu/hibiscus.jpg' },
  ],
}

export const TARI = {
  spaniola: {
    nume: 'Spaniolă', titlu: 'Luna Spaniolă',
    descriere: 'Pasiunea și vivacitatea Spaniei în fiecare farfurie — tapas, paella și churros care îți vor încânta simțurile.',
    culoare: '#4a1a0a',
    preparate: [
      { nume: 'Paella Valenciana', descriere: 'Paella tradițională cu pui, iepure, fasole verde și șofran de La Mancha', pret: 85, este_desert: false, imagine: '/images/meniu-lunii/paella.jpg' },
      { nume: 'Gambas al Ajillo', descriere: 'Creveți tigru în ulei de măsline cu usturoi, chili și pătrunjel', pret: 78, este_desert: false, imagine: '/images/meniu-lunii/gambas.jpg' },
      { nume: 'Cochinillo Asado', descriere: 'Purcel de lapte fript la cuptor după rețeta din Segovia — crocant și suculent', pret: 115, este_desert: false, imagine: '/images/meniu-lunii/cochilo.jpg' },
      { nume: 'Bacalao a la Vizcaína', descriere: 'Cod desărat gătit în sos de ardei roșu cu ceapă și roșii', pret: 88, este_desert: false, imagine: '/images/meniu-lunii/bacalao.jpg' },
      { nume: 'Rabo de Toro', descriere: 'Coadă de taur brasată în vin Rioja cu legume și ierburi aromatice', pret: 92, este_desert: false, imagine: '/images/meniu-lunii/rabo.jpg' },
      { nume: 'Churros con Chocolate', descriere: 'Churros crocante prăjite cu ciocolată caldă de înmuiat', pret: 38, este_desert: true, imagine: '/images/meniu-lunii/churos.jpg' },
      { nume: 'Crema Catalana', descriere: 'Varianta spaniolă a crème brûlée cu scorțișoară și coajă de portocală', pret: 42, este_desert: true, imagine: '/images/meniu-lunii/catalana.jpg' },
      { nume: 'Tarta de Santiago', descriere: 'Tort de migdale cu zahăr pudră și Crucea Sfântului Iacob', pret: 40, este_desert: true, imagine: '/images/meniu-lunii/santiago.jpg' },
      { nume: 'Arroz con Leche', descriere: 'Orez cu lapte gătit lent cu vanilie, scorțișoară și coajă de lămâie', pret: 36, este_desert: true, imagine: '/images/meniu-lunii/aroz.jpg' },
      { nume: 'Tocino de Cielo', descriere: 'Desert din gălbenuș de ou și caramel — mătăsos și intens', pret: 38, este_desert: true, imagine: '/images/meniu-lunii/tocino.jpg' },
    ]
  },
  turceasca: {
    nume: 'Turcească', titlu: 'Luna Turcească',
    descriere: 'Bogăția aromelor Orientului Mijlociu — condimente exotice, grătare perfecte și deserturi cu miere și nuci.',
    culoare: '#3a1a0a',
    preparate: [
      { nume: 'Lamb Kebab', descriere: 'Miel marinat cu condimente otomane, la grătar pe cărbuni, cu orez pilaf', pret: 88, este_desert: false, imagine: '/images/meniu-lunii/lamb-Kebab.jpg' },
      { nume: 'Manti', descriere: 'Găluște turcești umplute cu miel, cu iaurt cu usturoi și unt cu boia', pret: 72, este_desert: false, imagine: '/images/meniu-lunii/manti.jpg'  },
      { nume: 'Hamsi Tava', descriere: 'Hamsii proaspete în mălai, prăjite crocant, cu salată de rucola și lămâie', pret: 65, este_desert: false, imagine: '/images/meniu-lunii/hamsiTava.jpg' },
      { nume: 'İskender Kebab', descriere: 'Kebab de vită pe pâine pita cu sos de roșii, unt topit și iaurt', pret: 85, este_desert: false, imagine: '/images/meniu-lunii/iskender.jpg'  },
      { nume: 'Kuzu Tandir', descriere: 'Miel gătit 12 ore la foc mic până cade de pe os, cu legume otomane', pret: 105, este_desert: false, imagine: '/images/meniu-lunii/kuzu.jpg'  },
      { nume: 'Baklava', descriere: 'Foi de patiserie cu nuci și fistic, îmbibate în sirop de miere și apă de trandafiri', pret: 42, este_desert: true, imagine: '/images/meniu-lunii/baklava.jpg' },
      { nume: 'Künefe', descriere: 'Desert cu brânză topită între straturi de kadaif, cu sirop și fistic', pret: 48, este_desert: true, imagine: '/images/meniu-lunii/kunefe.jpg' },
      { nume: 'Sütlaç', descriere: 'Orez cu lapte copt la cuptor cu caramel deasupra — reconfortant și cremos', pret: 36, este_desert: true, imagine: '/images/meniu-lunii/Sütlaç.jpg'  },
      { nume: 'Lokma', descriere: 'Gogoși mici prăjite îmbibate în sirop de miere, cu scorțișoară și nucă', pret: 34, este_desert: true, imagine: '/images/meniu-lunii/Lokma.jpg' },
      { nume: 'Kazandibi', descriere: 'Budincă de lapte caramelizată cu textură mătăsoasă și aromă de trandafir', pret: 38, este_desert: true, imagine: '/images/meniu-lunii/Kazandibi.jpg' },
    ]
  },
  moldoveneasca: {
    nume: 'Moldovenească', titlu: 'Luna Moldovenească',
    descriere: 'Căldura și simplitatea bucătăriei moldovenești — rețete transmise din generație în generație, cu ingrediente de la țară.',
    culoare: '#1a3a1a',
    preparate: [
      { nume: 'Sarmale în Foi de Viță', descriere: 'Sarmale tradiționale moldovenești în foi de viță cu carne de porc și orez', pret: 72, este_desert: false },
      { nume: 'Mămăligă cu Brânză și Smântână', descriere: 'Mămăligă fiartă în ceaun cu brânză de oaie și smântână grasă de la țară', pret: 55, este_desert: false },
      { nume: 'Tocană de Miel', descriere: 'Tocană de miel cu ceapă, roșii și usturoi verde, gătită la foc mic', pret: 85, este_desert: false },
      { nume: 'Plăcintă cu Cartofi', descriere: 'Plăcintă moldovenească cu umplutură de cartofi și ceapă caramelizată', pret: 48, este_desert: false },
      { nume: 'Răcituri de Porc', descriere: 'Piftie tradițională din carne de porc cu usturoi, servită cu hrean', pret: 62, este_desert: false },
      { nume: 'Cozonac Moldovenesc', descriere: 'Cozonac pufos cu nucă, cacao și stafide — rețeta bunicii', pret: 40, este_desert: true },
      { nume: 'Plăcintă cu Vișine', descriere: 'Plăcintă dulce cu vișine din livadă și zahăr vanilat', pret: 38, este_desert: true },
      { nume: 'Papanași cu Smântână', descriere: 'Papanași prăjiți cu smântână și dulceață de coacăze negre', pret: 42, este_desert: true },
      { nume: 'Tort Napoleon', descriere: 'Tort cu foi fragede și cremă de lapte — prezent la orice masă de sărbătoare', pret: 44, este_desert: true },
      { nume: 'Halva de Floarea Soarelui', descriere: 'Halva tradițională din semințe de floarea soarelui cu miere și nucă', pret: 32, este_desert: true },
    ]
  },
  japoneza: {
    nume: 'Japoneză', titlu: 'Luna Japoneză',
    descriere: 'Precizia și minimalismul bucătăriei japoneze — umami pur, ingrediente de excepție și prezentare ca o operă de artă.',
    culoare: '#2a1a1a',
    preparate: [
      { nume: 'Wagyu Teppanyaki', descriere: 'Vită Wagyu A5 gătită pe plită de fontă cu sos ponzu și wasabi proaspăt', pret: 245, este_desert: false },
      { nume: 'Miso Black Cod', descriere: 'Cod negru marinat 3 zile în miso alb și sake, caramelizat la grătar', pret: 165, este_desert: false },
      { nume: 'Ramen Tonkotsu', descriere: 'Supă de oase de porc gătită 18 ore cu chashu, ou marinat și nori', pret: 88, este_desert: false },
      { nume: 'Tempura Kaiseki', descriere: 'Selecție de legume și creveți în aluat tempura ușor, cu dashi dipping', pret: 95, este_desert: false },
      { nume: 'Duck Teriyaki', descriere: 'Piept de rață glazurat în sos teriyaki cu orez sushi și salată de castraveți', pret: 115, este_desert: false },
      { nume: 'Mochi Ice Cream', descriere: 'Bile de orez glutinos umplute cu înghețată de matcha, mango și căpșuni', pret: 48, este_desert: true },
      { nume: 'Dorayaki', descriere: 'Clătite japoneze cu umplutură de anko — pastă de fasole roșie dulce', pret: 38, este_desert: true },
      { nume: 'Matcha Tiramisu', descriere: 'Reinterpretare japoneză a tiramisù cu matcha ceremonial și mascarpone', pret: 52, este_desert: true },
      { nume: 'Taiyaki', descriere: 'Vafe în formă de pește umplute cu cremă de vanilie și pastă de matcha', pret: 36, este_desert: true },
      { nume: 'Warabi Mochi', descriere: 'Jeleuri de bracken cu kinako și sirop de kuromitsu', pret: 42, este_desert: true },
    ]
  },
  norvegiana: {
    nume: 'Norvegiană', titlu: 'Luna Norvegiană',
    descriere: 'Puritatea și prospețimea bucătăriei nordice — pește proaspăt din fiorduri, carne de vânat și deserturi cu fructe de pădure.',
    culoare: '#0d1a2a',
    preparate: [
      { nume: 'Gravlaks', descriere: 'Somon curat în sare, zahăr și mărar, servit cu sos de muștar dulce', pret: 95, este_desert: false },
      { nume: 'Fårikål', descriere: 'Tocană națională norvegiană de miel cu varză albă și boabe de piper negru', pret: 88, este_desert: false },
      { nume: 'Lutefisk', descriere: 'Cod uscat rehidratat tradițional, servit cu unt topit, mazăre și bacon', pret: 92, este_desert: false },
      { nume: 'Raspeballer', descriere: 'Găluște de cartofi cu bacon afumat și unt brun — comfort food norvegian', pret: 72, este_desert: false },
      { nume: 'Kjøttkaker', descriere: 'Chiftele norvegiene în sos brun cu unt și smântână, cu cartofi fierți', pret: 78, este_desert: false },
      { nume: 'Multekrem', descriere: 'Frișcă bătută cu mure arctice — desertul regal al Norvegiei', pret: 46, este_desert: true },
      { nume: 'Skoleboller', descriere: 'Chifle cu cardamom umplute cu cremă de vanilie și glasate cu cocos', pret: 38, este_desert: true },
      { nume: 'Krumkake', descriere: 'Vafe subțiri și crocante cu cardamom, rulate con, umplute cu frișcă', pret: 36, este_desert: true },
      { nume: 'Kvæfjordkake', descriere: 'Cel mai bun tort din lume — blat cu vanilie, bezea crocantă și cremă', pret: 48, este_desert: true },
      { nume: 'Lefse cu Unt și Scorțișoară', descriere: 'Lipie norvegiană moale din cartofi cu unt, zahăr și scorțișoară', pret: 32, este_desert: true },
    ]
  }
}

const MeniulLunii = () => {
  const [lunaActiva, setLunaActiva] = useState('spaniola')
  const [subcatBautura, setSubcatBautura] = useState('Vinuri')

  useEffect(() => {
    fetch('http://localhost:8080/luna/activa')
      .then(res => res.json())
      .then(data => setLunaActiva(data.tara))
      .catch(() => setLunaActiva('spaniola'))
  }, [])

  const tara = TARI[lunaActiva] || TARI['spaniola']
  const preparate = tara.preparate.filter(p => !p.este_desert)
  const deserturi = tara.preparate.filter(p => p.este_desert)


  return (
    <div className="meniu-lunii-page">
      <Navbar />

      <div className="ml-hero" style={{ background: tara.culoare }}>
        <div className="ml-hero-overlay" />
        <div className="ml-hero-content">
          <div className="ml-tag">Meniul Lunii · Martie 2026</div>
          <h1>{tara.titlu}</h1>
          <p>{tara.descriere}</p>
          <div className="ml-ornament">✦ ── ✦ ── ✦</div>
        </div>
      </div>

      <div className="ml-body">

        <section className="ml-sectiune">
          <div className="ml-sectiune-header">
            <div className="ml-sectiune-label">Preparate principale</div>
            <h2>Feluri de mâncare</h2>
          </div>
          <div className="ml-grid">
            {preparate.map((p, i) => (
              <div key={i} className="ml-card">
                {p.imagine && (
                  <div className="ml-card-img">
                    <img src={p.imagine} alt={p.nume} />
                  </div>
                )}
            <div className="ml-card-body">
                <h3>{p.nume}</h3>
                <p>{p.descriere}</p>
                <div className="ml-card-footer">
                   <span className="ml-pret">{p.pret} RON</span>
                   <button className="ml-btn-adauga">Adaugă la comandă</button>
           </div>
       </div>

              </div>
            ))}
          </div>
        </section>

        <section className="ml-sectiune ml-deserturi">
          <div className="ml-sectiune-header">
            <div className="ml-sectiune-label">Finalul mesei</div>
            <h2>Deserturi</h2>
          </div>
          <div className="ml-grid">
            {deserturi.map((p, i) => (
              <div key={i} className="ml-card ml-card-desert">
                {p.imagine && (
                  <div className="ml-card-img">
                    <img src={p.imagine} alt={p.nume} />
                  </div>
                )}
                <div className="ml-card-body">
                  <h3>{p.nume}</h3>
                  <p>{p.descriere}</p>
                  <div className="ml-card-footer">
                    <span className="ml-pret">{p.pret} RON</span>
                    <button className="ml-btn-adauga">Adaugă la comandă</button>
                </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="ml-sectiune ml-bauturi">
          <div className="ml-sectiune-header">
            <div className="ml-sectiune-label">Selecția barului</div>
            <h2>Băuturi</h2>
          </div>
          <div className="ml-bauturi-tabs">
            {Object.keys(BAUTURI).map(cat => (
              <button
                key={cat}
                className={`ml-tab ${subcatBautura === cat ? 'activ' : ''}`}
                onClick={() => setSubcatBautura(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="ml-grid ml-grid-bauturi">
            {BAUTURI[subcatBautura].map((b, i) => (
              <div key={i} className="ml-card ml-card-bautura">
                {b.imagine && (
                  <div className="ml-card-img">
                    <img src={b.imagine} alt={b.nume} />
                  </div>
                )}
               <div className="ml-card-body">
                <h3>{b.nume}</h3>
                <p>{b.descriere}</p>
                 <div className="ml-card-footer">
                     <span className="ml-pret">{b.pret} RON</span>
                     <button className="ml-btn-adauga">Adaugă la comandă</button>
                </div>
            </div>

              </div>
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </div>
  )
}

export default MeniulLunii
