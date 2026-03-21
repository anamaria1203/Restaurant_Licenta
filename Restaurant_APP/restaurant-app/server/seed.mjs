import db from './models/index.mjs'

await db.sequelize.sync({ alter: true })

await db.Preparat.destroy({ where: {} })

await db.Preparat.bulkCreate([

  
  // APERITIVE (25)
  
  { categorie: 'Aperitive', nume: 'Bruschetta cu Roșii și Busuioc', descriere: 'Pâine rustică prăjită, roșii cherry, busuioc proaspăt și ulei de măsline extravirgin', pret: 38, badge: null, alergeni: 'gluten', imagine: 'aperitiv_bruschetta.jpg' },
  { categorie: 'Aperitive', nume: 'Carpaccio di Manzo', descriere: 'Vită Angus crud-feliat subțire, parmezan, rucola, capere și dressing de lămâie', pret: 72, badge: 'Signature', alergeni: 'lactate, muștar', imagine: 'aperitiv_carpaccio.jpg' },
  { categorie: 'Aperitive', nume: 'Burrata cu Roșii Cherry', descriere: 'Burrata cremată de Puglia, roșii cherry colorate, pesto de busuioc și pâine croccantă', pret: 65, badge: "Chef's Choice", alergeni: 'lactate, gluten', imagine: 'aperitiv_burrata.jpg' },
  { categorie: 'Aperitive', nume: 'Prosciutto e Melone', descriere: 'Prosciutto di Parma 24 luni maturat, pepene galben de sezon și miere de trufe', pret: 68, badge: null, alergeni: null, imagine: 'aperitiv_prosciutto_melone.jpg' },
  { categorie: 'Aperitive', nume: 'Arancini cu Mozzarella', descriere: 'Bile de orez sicilian prăjite, cu inimaă de mozzarella fior di latte și sos de roșii', pret: 52, badge: null, alergeni: 'gluten, lactate, ou', imagine: 'aperitiv_arancini.jpg' },
  { categorie: 'Aperitive', nume: 'Vitello Tonnato', descriere: 'Vițel fiert rece feliat fin, acoperit cu cremă de ton, capere și lămâie', pret: 78, badge: 'Signature', alergeni: 'pește, ou, muștar', imagine: 'aperitiv_vitello_tonnato.jpg' },
  { categorie: 'Aperitive', nume: 'Tartare de Ton cu Avocado', descriere: 'Ton bluefin proaspăt tăiat, avocado cremos, sesame, sos ponzu și chips de wonton', pret: 95, badge: "Chef's Choice", alergeni: 'pește, soia, gluten, susan', imagine: 'aperitiv_tartare_ton.jpg' },
  { categorie: 'Aperitive', nume: 'Insalata Caprese', descriere: 'Mozzarella di bufala, roșii heirloom, busuioc proaspăt și balsamico de Modena', pret: 58, badge: null, alergeni: 'lactate', imagine: 'aperitiv_caprese.jpg' },
  { categorie: 'Aperitive', nume: 'Antipasto Misto della Casa', descriere: 'Selecție de mezeluri italiene, brânzeturi, măsline marinate și legume alla griglia', pret: 88, badge: 'Signature', alergeni: 'lactate, gluten', imagine: 'aperitiv_antipasto.jpg' },
  { categorie: 'Aperitive', nume: 'Crostini cu Ricotta și Smochine', descriere: 'Pâine prăjită cu ricotta bătută, smochine proaspete și miere de castane', pret: 48, badge: 'Sezonier', alergeni: 'gluten, lactate', imagine: 'aperitiv_crostini_ricotta.jpg' },
  { categorie: 'Aperitive', nume: 'Tartare de Vită cu Trufe', descriere: 'Mușchi de vită Angus tocat manual, trufe negre răzuite, gălbenuș de ou și muștar Dijon', pret: 120, badge: "Chef's Choice", alergeni: 'ou, muștar', imagine: 'aperitiv_tartare_vita.jpg' },
  { categorie: 'Aperitive', nume: 'Calamari Fritti', descriere: 'Inele de calamari tineri prăjiți în aluat ușor, cu aioli de usturoi și lămâie', pret: 58, badge: null, alergeni: 'gluten, ou, crustacee', imagine: 'aperitiv_calamari.jpg' },
  { categorie: 'Aperitive', nume: 'Bruschetta cu Ciuperci și Trufe', descriere: 'Ciuperci porcini și chanterelle sotate, pe pâine de campagne, cu ulei de trufe albe', pret: 62, badge: 'Sezonier', alergeni: 'gluten', imagine: 'aperitiv_bruschetta_ciuperci.jpg' },
  { categorie: 'Aperitive', nume: 'Focaccia cu Rozmarin', descriere: 'Focaccia artizanală coaptă în ziua respectivă, cu rozmarin, fleur de sel și ulei de măsline', pret: 35, badge: null, alergeni: 'gluten', imagine: 'aperitiv_focaccia.jpg' },
  { categorie: 'Aperitive', nume: 'Gravlax de Somon', descriere: 'Somon Atlantic curat în sare și anason, cu crème fraîche, icre și blini cald', pret: 85, badge: 'Signature', alergeni: 'pește, lactate, gluten, ou', imagine: 'aperitiv_gravlax.jpg' },
  { categorie: 'Aperitive', nume: 'Polenta Prăjită cu Gorgonzola', descriere: 'Bastoane de polentă crocantă cu gorgonzola DOP topit și nuci caramelizate', pret: 52, badge: null, alergeni: 'lactate, nuci', imagine: 'aperitiv_polenta.jpg' },
  { categorie: 'Aperitive', nume: 'Tapenade cu Măsline Negre', descriere: 'Pastă fină de măsline Kalamata, capere, ansoa și usturoi, cu pâine grillată', pret: 42, badge: null, alergeni: 'pește, gluten', imagine: 'aperitiv_tapenade.jpg' },
  { categorie: 'Aperitive', nume: 'Ceviche de Doradă', descriere: 'Doradă marinată în lime, cu coriandru, ardei iute, ceapă roșie și leche de tigre', pret: 78, badge: "Chef's Choice", alergeni: 'pește', imagine: 'aperitiv_ceviche.jpg' },
  { categorie: 'Aperitive', nume: 'Foie Gras cu Jeleu de Porto', descriere: 'Terină de foie gras de rață, jeleu de porto roșu, brioche prăjită și fleur de sel', pret: 115, badge: 'Signature', alergeni: 'gluten', imagine: 'aperitiv_foie_gras.jpg' },
  { categorie: 'Aperitive', nume: 'Prawn Cocktail Clasic', descriere: 'Creveți regali fierți, sos Marie Rose cu cognac, iceberg și lămâie', pret: 72, badge: null, alergeni: 'crustacee, ou, muștar', imagine: 'aperitiv_prawn_cocktail.jpg' },
  { categorie: 'Aperitive', nume: 'Blini cu Icre Negre', descriere: 'Blini calde cu smântână acidulată și icre de sturion selecție', pret: 125, badge: 'Signature', alergeni: 'gluten, lactate, ou, pește', imagine: 'aperitiv_blini_icre.jpg' },
  { categorie: 'Aperitive', nume: 'Crostini cu Ficat de Pui', descriere: 'Pateu fin de ficat de pui cu vin vin Marsala, capere și pâine croccantă', pret: 48, badge: null, alergeni: 'gluten', imagine: 'aperitiv_crostini_ficat.jpg' },
  { categorie: 'Aperitive', nume: 'Baked Camembert', descriere: 'Camembert copt în brânzâ, cu miere de trufe, cimbru proaspăt și nuci glazurate', pret: 68, badge: 'Sezonier', alergeni: 'lactate, nuci, gluten', imagine: 'aperitiv_camembert.jpg' },
  { categorie: 'Aperitive', nume: 'Oysters Rockefeller', descriere: 'Stridii coapte cu unt de ierburi, spanac, pernod și parmezan gratinат', pret: 110, badge: "Chef's Choice", alergeni: 'lactate, crustacee', imagine: 'aperitiv_oysters.jpg' },
  { categorie: 'Aperitive', nume: 'Pâté en Croûte', descriere: 'Clasic pâté franțuzesc în crustă crocantă, cu pistachios și gelée de madeira', pret: 82, badge: 'Signature', alergeni: 'gluten, nuci', imagine: 'aperitiv_pate_en_croute.jpg' },

  
  // SUPE (25)
  
  { categorie: 'Supe', nume: 'Bisque de Homar', descriere: 'Cremă bogată de homar cu cognac, tarragon și crème fraîche, servită cu crutoane', pret: 85, badge: 'Signature', alergeni: 'crustacee, lactate, gluten', imagine: 'supa_bisque_homar.jpg' },
  { categorie: 'Supe', nume: 'Ciorbă de Văcuță', descriere: 'Rețetă tradițională cu legume de sezon, leuștean și smântână 20%', pret: 42, badge: null, alergeni: 'lactate, țelină', imagine: 'supa_ciorba_vacuta.jpg' },
  { categorie: 'Supe', nume: 'Cremă de Dovleac cu Ghimbir', descriere: 'Dovleac butternut copt, ghimbir proaspăt, lapte de cocos și semințe de dovleac prăjite', pret: 48, badge: 'Sezonier', alergeni: null, imagine: 'supa_crema_dovleac.jpg' },
  { categorie: 'Supe', nume: 'Minestrone Clasică', descriere: 'Supă italiană de legume cu fasole, paste mici, pesto genovez și parmezan', pret: 45, badge: null, alergeni: 'gluten, lactate', imagine: 'supa_minestrone.jpg' },
  { categorie: 'Supe', nume: 'French Onion Soup', descriere: 'Supă de ceapă caramelizată cu vin alb, crouton gratinат cu Gruyère topit', pret: 58, badge: "Chef's Choice", alergeni: 'gluten, lactate', imagine: 'supa_french_onion.jpg' },
  { categorie: 'Supe', nume: 'Cremă de Ciuperci Porcini', descriere: 'Ciuperci porcini uscate și proaspete, ulei de trufe și chips de pâine cu usturoi', pret: 62, badge: 'Signature', alergeni: 'gluten, lactate', imagine: 'supa_crema_porcini.jpg' },
  { categorie: 'Supe', nume: 'Gazpacho Andaluz', descriere: 'Supă rece de roșii coapte, ardei, castraveți, usturoi și ulei de măsline', pret: 45, badge: 'Sezonier', alergeni: 'gluten', imagine: 'supa_gazpacho.jpg' },
  { categorie: 'Supe', nume: 'Cremă de Sparanghel cu Trufe', descriere: 'Sparanghel verde de primăvară, cu trufe albe răzuite și unt brun', pret: 75, badge: "Chef's Choice", alergeni: 'lactate', imagine: 'supa_crema_sparanghel.jpg' },
  { categorie: 'Supe', nume: 'Vichyssoise Rece', descriere: 'Cremă clasică franceză de praz și cartofi, servită rece cu ciboulette', pret: 52, badge: null, alergeni: 'lactate, țelină', imagine: 'supa_vichyssoise.jpg' },
  { categorie: 'Supe', nume: 'Zuppa Toscana', descriere: 'Cârnați italieni picante, fasole cannellini, kale toscan și parmezan', pret: 55, badge: null, alergeni: 'lactate', imagine: 'supa_zuppa_toscana.jpg' },
  { categorie: 'Supe', nume: 'Cremă de Morcovi cu Curcuma', descriere: 'Morcovi biologici, curcuma proaspătă, lapte de cocos și ulei de semințe de coriandru', pret: 42, badge: null, alergeni: null, imagine: 'supa_crema_morcov.jpg' },
  { categorie: 'Supe', nume: 'Bouillabaisse Provençală', descriere: 'Tocăniță tradițională marseilleză de pești și fructe de mare, cu rouille și croûtons', pret: 95, badge: 'Signature', alergeni: 'pește, crustacee, gluten, ou', imagine: 'supa_bouillabaisse.jpg' },
  { categorie: 'Supe', nume: 'Cremă de Broccoli cu Cheddar', descriere: 'Broccoli proaspăt, cheddar maturat 18 luni, smântână și biguș de ceapă', pret: 48, badge: null, alergeni: 'lactate', imagine: 'supa_crema_broccoli.jpg' },
  { categorie: 'Supe', nume: 'Avgolemono Grecesc', descriere: 'Supă greacă cremoasă de pui cu orez, ou și lămâie proaspătă', pret: 45, badge: null, alergeni: 'ou', imagine: 'supa_avgolemono.jpg' },
  { categorie: 'Supe', nume: 'Cremă de Linte Roșie', descriere: 'Linte roșie egipteană, chimen, mentă proaspătă și iaurt greek', pret: 42, badge: null, alergeni: 'lactate', imagine: 'supa_crema_linte.jpg' },
  { categorie: 'Supe', nume: 'Cremă de Sfeclă Roșie', descriere: 'Sfeclă cuptă, capre cheese cremă, nuci prăjite și balsamico redus', pret: 52, badge: 'Sezonier', alergeni: 'lactate, nuci', imagine: 'supa_crema_sfecla.jpg' },
  { categorie: 'Supe', nume: 'Supă Cremă de Trufe', descriere: 'Cremă intensă de trufe negre Périgord, cu brioche prăjită și ulei de trufe albe', pret: 88, badge: "Chef's Choice", alergeni: 'gluten, lactate', imagine: 'supa_crema_trufe.jpg' },
  { categorie: 'Supe', nume: 'Supă de Coadă de Bou', descriere: 'Rețetă clasică gătită 8 ore, cu legume de rădăcină, porto și ierburi aromate', pret: 68, badge: 'Signature', alergeni: 'țelină', imagine: 'supa_coada_bou.jpg' },
  { categorie: 'Supe', nume: 'Cremă de Mazăre cu Mentă', descriere: 'Mazăre verde de grădină, mentă proaspătă, yogurt greek și bacon crumble crocant', pret: 48, badge: 'Sezonier', alergeni: 'lactate', imagine: 'supa_crema_mazare.jpg' },
  { categorie: 'Supe', nume: 'Tom Kha Gai', descriere: 'Supă thailandeză cu lapte de cocos, pui, ciuperci shiitake, lemongrass și chili', pret: 55, badge: null, alergeni: null, imagine: 'supa_tom_kha.jpg' },
  { categorie: 'Supe', nume: 'Mulligatawny', descriere: 'Supă anglo-indiană cu pui, linte, curry, mere și lapte de cocos', pret: 52, badge: null, alergeni: null, imagine: 'supa_mulligatawny.jpg' },
  { categorie: 'Supe', nume: 'Borscht Roșu Tradițional', descriere: 'Supă ucraineană cu sfeclă roșie, varză, cartofi, smântână și mărar', pret: 45, badge: null, alergeni: 'lactate', imagine: 'supa_borscht.jpg' },
  { categorie: 'Supe', nume: 'Cremă de Conopidă cu Parmezan', descriere: 'Conopidă coaptă în cuptor, parmezan 24 luni, căpere prăjite și crutoane de brioche', pret: 48, badge: null, alergeni: 'lactate, gluten', imagine: 'supa_crema_conopida.jpg' },
  { categorie: 'Supe', nume: 'Supă de Ceapă cu Gruyère', descriere: 'Varianta noastră: ceapă caramelizată 3 ore, fond brun de vită și Gruyère AOP gratinаt', pret: 62, badge: 'Signature', alergeni: 'lactate, gluten', imagine: 'supa_ceapa_gruyere.jpg' },
  { categorie: 'Supe', nume: 'Cremă de Usturoi Copt', descriere: 'Usturoi copt lent, fond de pui, mascarpone și crutoane cu ierburi proaspete', pret: 45, badge: null, alergeni: 'lactate, gluten', imagine: 'supa_crema_usturoi.jpg' },

  
  // CARNE (25)
  
  { categorie: 'Carne', nume: 'Ribeye Angus 400g', descriere: 'Ribeye Black Angus maturizat 28 zile, cu unt de ierburi, cartofi dauphine și salată verde', pret: 185, badge: 'Signature', alergeni: 'lactate', imagine: 'carne_ribeye.jpg' },
  { categorie: 'Carne', nume: 'Filet Mignon cu Sos de Vin Roșu', descriere: 'Medallion de mușchi de vițel, sos de Barolo, ciuperci chanterelle și cartofi Pont Neuf', pret: 195, badge: "Chef's Choice", alergeni: 'lactate', imagine: 'carne_filet_mignon.jpg' },
  { categorie: 'Carne', nume: 'Rack of Lamb', descriere: 'Coastă de miel în crustă de ierburi provençale, cu ratatouille și jus de miel', pret: 175, badge: 'Signature', alergeni: 'gluten', imagine: 'carne_rack_lamb.jpg' },
  { categorie: 'Carne', nume: 'Duck Confit', descriere: 'Pulpă de rață confiată 12 ore, cu cartofi sarladaise și sos de prune', pret: 128, badge: null, alergeni: null, imagine: 'carne_duck_confit.jpg' },
  { categorie: 'Carne', nume: 'Osso Buco Milanese', descriere: 'Jarret de vițel gătit lent cu gremolata, risotto alla Milanese cu șofran', pret: 145, badge: 'Signature', alergeni: 'lactate, gluten', imagine: 'carne_osso_buco.jpg' },
  { categorie: 'Carne', nume: 'T-Bone Steak 500g', descriere: 'T-bone maturizat dry-aged 21 zile, cu bearnaise clasică și cartofi wedges cu rozmarin', pret: 210, badge: null, alergeni: 'lactate, ou, muștar', imagine: 'carne_tbone.jpg' },
  { categorie: 'Carne', nume: 'Wellington de Vită', descriere: 'Mușchi de vită Angus în crustă de foietaj, cu duxelles de ciuperci și muștar Dijon', pret: 245, badge: "Chef's Choice", alergeni: 'gluten, ou, muștar', imagine: 'carne_wellington.jpg' },
  { categorie: 'Carne', nume: 'Boeuf Bourguignon', descriere: 'Clasic franțuzesc cu vită gătită 4 ore în Burgundy, ciuperci de pădure și perle de ceapă', pret: 135, badge: 'Signature', alergeni: 'lactate', imagine: 'carne_boeuf_bourguignon.jpg' },
  { categorie: 'Carne', nume: 'Veal Scaloppine al Limone', descriere: 'Escalop de vițel cu unt, lămâie, capere și vin alb, servit cu risotto simplu', pret: 138, badge: null, alergeni: 'lactate, gluten', imagine: 'carne_veal_scaloppine.jpg' },
  { categorie: 'Carne', nume: 'Porc Iberic cu Mere Caramelizate', descriere: 'Cotlet de porc iberico pata negra, cu mere granny caramelizate și sos cidru', pret: 142, badge: 'Sezonier', alergeni: 'lactate', imagine: 'carne_porc_iberic.jpg' },
  { categorie: 'Carne', nume: 'Medallions de Vită cu Foie Gras', descriere: 'Trei medallions de mușchi, fiecare cu escalop de foie gras și sos de Sauternes', pret: 275, badge: "Chef's Choice", alergeni: 'gluten', imagine: 'carne_medallions_foie.jpg' },
  { categorie: 'Carne', nume: 'Tagine de Miel', descriere: 'Miel gătit în tagine 3 ore, cu prune, migdale, Ras el Hanout și couscous cu ierburi', pret: 135, badge: null, alergeni: 'nuci, gluten', imagine: 'carne_tagine_miel.jpg' },
  { categorie: 'Carne', nume: 'Entrecôte cu Béarnaise', descriere: 'Antricot franțuzesc 350g la sânge cu bearnaise clasică, frites de maison și salată', pret: 158, badge: null, alergeni: 'lactate, ou, muștar', imagine: 'carne_entrecote.jpg' },
  { categorie: 'Carne', nume: 'Coasta de Vită Gătită 12h', descriere: 'Short rib de vită la foc mic 12 ore, cu piure de rădăcinoase și sos de cireșe negre', pret: 165, badge: 'Signature', alergeni: 'lactate', imagine: 'carne_short_rib.jpg' },
  { categorie: 'Carne', nume: 'Friptură de Rață cu Portocale', descriere: 'Piept de rță à l\'orange cu sos grand marnier, pak choi și cartofi fondants', pret: 128, badge: null, alergeni: null, imagine: 'carne_rata_portocale.jpg' },
  { categorie: 'Carne', nume: 'Cotlet de Miel cu Chimichurri', descriere: 'Cotlete de miel la grătar, cu chimichurri de ierburi argentinian și cartofi prăjiți', pret: 155, badge: null, alergeni: null, imagine: 'carne_cotlet_miel.jpg' },
  { categorie: 'Carne', nume: 'Chateaubriand pentru 2', descriere: 'Mușchi central de vită 600g, cu béarnaise, gratin dauphinois și legume grillate', pret: 380, badge: 'Signature', alergeni: 'lactate, ou, muștar', imagine: 'carne_chateaubriand.jpg' },
  { categorie: 'Carne', nume: 'Miel în Crustă de Ierburi', descriere: 'Spelă de miel în crustă de pesmet, ierburi și muștar, cu flageolet și jus de miel', pret: 168, badge: "Chef's Choice", alergeni: 'gluten, muștar', imagine: 'carne_miel_crusta.jpg' },
  { categorie: 'Carne', nume: 'Gulaș Vienez', descriere: 'Gulaș tradițional vienez cu vită Angus, boia dulce-afumată și tăiței de casă', pret: 95, badge: null, alergeni: 'gluten', imagine: 'carne_gulyas.jpg' },
  { categorie: 'Carne', nume: 'Chicken Kiev', descriere: 'Piept de pui umplut cu unt de ierburi și usturoi, pané, cu cartofi noisette', pret: 88, badge: null, alergeni: 'gluten, lactate, ou', imagine: 'carne_chicken_kiev.jpg' },
  { categorie: 'Carne', nume: 'Pui Massaman Curry', descriere: 'Curry thai cu pui de fermă, cartofi, arahide, lapte de cocos și orez jasmin', pret: 85, badge: null, alergeni: 'nuci', imagine: 'carne_massaman.jpg' },
  { categorie: 'Carne', nume: 'Pui Tikka Masala', descriere: 'Pui marinat în tandoor cu sos Tikka Masala bogat, orez basmati și naan cald', pret: 82, badge: null, alergeni: 'lactate, gluten', imagine: 'carne_tikka_masala.jpg' },
  { categorie: 'Carne', nume: 'Cotlet de Porc cu Salvie', descriere: 'Cotlet de porc heritage cu saltimbocca de salvie și prosciutto, risotto simplu', pret: 118, badge: null, alergeni: 'lactate', imagine: 'carne_cotlet_porc.jpg' },
  { categorie: 'Carne', nume: 'Rață la Presă', descriere: 'Preparat clasic de bistro parizian — rața întreagă presată, flambeată la masă', pret: 285, badge: 'Signature', alergeni: null, imagine: 'carne_rata_presa.jpg' },
  { categorie: 'Carne', nume: 'Vânăt Ragù cu Polenta', descriere: 'Ragù de vânat mixt (cerb, mistreț), gătit 6 ore cu vin roșu, servit cu polenta cremoasă', pret: 145, badge: 'Sezonier', alergeni: 'lactate', imagine: 'carne_vanat_polenta.jpg' },

  // PEȘTE (25)
 
  { categorie: 'Pește', nume: 'Somon la Grătar cu Unt de Lămâie', descriere: 'Somon Atlantic proaspăt, unt de lămâie și capere, cu sparanghel verde și orez', pret: 112, badge: null, alergeni: 'pește, lactate', imagine: 'peste_somon_gratar.jpg' },
  { categorie: 'Pește', nume: 'Sea Bass în Crustă de Sare', descriere: 'Branzino întreg copt în crustă de sare de mare, cu ulei de măsline și lămâie', pret: 135, badge: "Chef's Choice", alergeni: 'pește', imagine: 'peste_seabass_sare.jpg' },
  { categorie: 'Pește', nume: 'Doradă Mediteraneană', descriere: 'Doradă la cuptor cu roșii cherry, măsline Kalamata, capere și ulei de măsline', pret: 118, badge: null, alergeni: 'pește', imagine: 'peste_dorada.jpg' },
  { categorie: 'Pește', nume: 'Halibut cu Sos de Capere', descriere: 'File de halibut pacific, sos gribiche cu capere și cornichons, cartofi vapeur', pret: 145, badge: 'Signature', alergeni: 'pește, ou, muștar', imagine: 'peste_halibut.jpg' },
  { categorie: 'Pește', nume: 'Bouillabaisse Provençală', descriere: 'Tocăniță marseilleză de pești de rock și fructe de mare, cu rouille și croûtons', pret: 155, badge: 'Signature', alergeni: 'pește, crustacee, gluten, ou', imagine: 'peste_bouillabaisse.jpg' },
  { categorie: 'Pește', nume: 'Scoici Saint-Jacques', descriere: 'Scoici Saint-Jacques flambate în unt de șofran, cu piure de conopidă și lardo di Colonnata', pret: 145, badge: "Chef's Choice", alergeni: 'crustacee, lactate', imagine: 'peste_saint_jacques.jpg' },
  { categorie: 'Pește', nume: 'Ton Tataki', descriere: 'Ton bluefin ușor marcat la exterior, cu sos ponzu, daikon și wasabi proaspăt', pret: 135, badge: 'Signature', alergeni: 'pește, soia', imagine: 'peste_ton_tataki.jpg' },
  { categorie: 'Pește', nume: 'Homard Grillat', descriere: 'Jumătate de homard breton la grătar, cu unt clarificat de trufe și salată de rucola', pret: 220, badge: "Chef's Choice", alergeni: 'crustacee, lactate', imagine: 'peste_homard.jpg' },
  { categorie: 'Pește', nume: 'Moules Marinières', descriere: 'Scoici de midii de Bretagne în vin alb, usturoi, șalotă și frize croccante', pret: 82, badge: null, alergeni: 'crustacee, lactate, gluten', imagine: 'peste_moules.jpg' },
  { categorie: 'Pește', nume: 'Crevete în Sos de Usturoi', descriere: 'Crevete Tiger flambate cu vin alb, usturoi, chili și pâine artizanală', pret: 115, badge: null, alergeni: 'crustacee, gluten', imagine: 'peste_crevete_usturoi.jpg' },
  { categorie: 'Pește', nume: 'Paella de Fructe de Mare', descriere: 'Orez Bomba cu creveți, midii, calmar și sofran, gătit în paellera la foc viu', pret: 165, badge: 'Signature', alergeni: 'crustacee, pește', imagine: 'peste_paella.jpg' },
  { categorie: 'Pește', nume: 'Branzino cu Salsa Verde', descriere: 'File de branzino la tigaie, cu salsa verde de capere, ansoa și gremolata', pret: 125, badge: null, alergeni: 'pește', imagine: 'peste_branzino.jpg' },
  { categorie: 'Pește', nume: 'Langoustine Grillate', descriere: 'Langoustine de Scoția la grătar, cu aioli de busuioc și brioche prăjit', pret: 175, badge: "Chef's Choice", alergeni: 'crustacee, gluten, ou', imagine: 'peste_langoustine.jpg' },
  { categorie: 'Pește', nume: 'Pește-Spadă cu Gremolata', descriere: 'File de pește-spadă la grătar cu gremolata siciliană, caponata și ulei de lămâie', pret: 122, badge: null, alergeni: 'pește', imagine: 'peste_pestesp.jpg' },
  { categorie: 'Pește', nume: 'Calamar Umplut cu Orez', descriere: 'Calamari tineri umpluți cu orez, roșii, ierburi și coapți în sos de roșii', pret: 98, badge: 'Sezonier', alergeni: 'crustacee', imagine: 'peste_calamar_umplut.jpg' },
  { categorie: 'Pește', nume: 'Tilapia în Crustă de Parmezan', descriere: 'File de tilapia în crustă de parmezan și pesmet, cu sos de lămâie și capere', pret: 88, badge: null, alergeni: 'pește, lactate, gluten', imagine: 'peste_tilapia.jpg' },
  { categorie: 'Pește', nume: 'Corvina cu Salsa Verde', descriere: 'File de corvina proaspătă, salsa verde cu capere și prezentare de legume grillate', pret: 115, badge: null, alergeni: 'pește', imagine: 'peste_corvina.jpg' },
  { categorie: 'Pește', nume: 'Sashimi Platter Premium', descriere: 'Selecție de ton, somon, yellowtail și doradă, cu wasabi, ghimbir murat și sos soia', pret: 175, badge: 'Signature', alergeni: 'pește, soia', imagine: 'peste_sashimi.jpg' },
  { categorie: 'Pește', nume: 'Trout cu Migdale', descriere: 'Păstrăv de munte cu unt brun, migdale feliate și lămâie, cartofi vapeur', pret: 95, badge: 'Sezonier', alergeni: 'pește, lactate, nuci', imagine: 'peste_trout.jpg' },
  { categorie: 'Pește', nume: 'Doradă en Papillote', descriere: 'Doradă la pachet cu fenicul, rozmarin, lămâie și ulei de măsline', pret: 112, badge: null, alergeni: 'pește', imagine: 'peste_dorada_papillote.jpg' },
  { categorie: 'Pește', nume: 'Crevete Tiger cu Mango Salsa', descriere: 'Crevete mari la grătar, cu salsa de mango proaspăt, chili verde și coriandru', pret: 125, badge: 'Sezonier', alergeni: 'crustacee', imagine: 'peste_crevete_mango.jpg' },
  { categorie: 'Pește', nume: 'Platou de Fructe de Mare', descriere: 'Homard, creveți regali, scoici, midii și stridii pe gheață crushed — pentru 2 persoane', pret: 320, badge: 'Signature', alergeni: 'crustacee, pește', imagine: 'peste_platou_mare.jpg' },
  { categorie: 'Pește', nume: 'Bacalhau à Brás', descriere: 'Cod uscat portughez cu ouă bătute, cartofi pai, ceapă și pătrunjel', pret: 105, badge: null, alergeni: 'pește, ou', imagine: 'peste_bacalhau.jpg' },
  { categorie: 'Pește', nume: 'Turbot în Unt Brun', descriere: 'File de turbot copt, cu unt brun de salvie, capere prăjite și gnocchi de cartofi', pret: 158, badge: "Chef's Choice", alergeni: 'pește, lactate, gluten', imagine: 'peste_turbot.jpg' },
  { categorie: 'Pește', nume: 'Risotto Nero cu Sepie', descriere: 'Orez Carnaroli cu cerneală de sepie, sepie grillată și aioli de usturoi negru', pret: 105, badge: 'Signature', alergeni: 'crustacee, ou, lactate', imagine: 'peste_risotto_nero.jpg' },

 
  // PASTE & RISOTTO (25)
  
  { categorie: 'Paste & Risotto', nume: 'Tagliatelle al Ragù Bolognese', descriere: 'Paste artizanale cu ou, ragù tradițional de vită gătit 4 ore și parmezan Reggiano', pret: 78, badge: 'Signature', alergeni: 'gluten, ou, lactate', imagine: 'paste_tagliatelle_ragu.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Risotto ai Funghi Porcini', descriere: 'Orez Carnaroli mantecato cu porcini proaspăt și uscați, unt și parmezan 24 luni', pret: 88, badge: "Chef's Choice", alergeni: 'lactate', imagine: 'paste_risotto_porcini.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Spaghetti Carbonara Clasică', descriere: 'Spaghetti de Gragnano, guanciale croccant, pecorino Romano, ouă și piper negru', pret: 72, badge: 'Signature', alergeni: 'gluten, ou, lactate', imagine: 'paste_carbonara.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Linguine alle Vongole', descriere: 'Linguine cu vongole (molusc proaspăt), vin alb, usturoi, pătrunjel și chili', pret: 85, badge: null, alergeni: 'gluten, crustacee', imagine: 'paste_vongole.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Cacio e Pepe', descriere: 'Tonnarelli romano, pecorino și parmezan, cu piper negru proaspăt crăpat', pret: 68, badge: "Chef's Choice", alergeni: 'gluten, lactate', imagine: 'paste_cacio_pepe.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Risotto al Tartufo Nero', descriere: 'Orez Vialone Nano cu trufe negre Umbria, parmezan și unt de calitate', pret: 115, badge: "Chef's Choice", alergeni: 'lactate', imagine: 'paste_risotto_tartufo.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Gnocchi al Gorgonzola', descriere: 'Gnocchi de casă cu gorgonzola DOP, noci e noce, unt brun și salvie', pret: 75, badge: null, alergeni: 'gluten, lactate, ou, nuci', imagine: 'paste_gnocchi_gorgonzola.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Tortellini in Brodo', descriere: 'Tortellini clasici emilieni umpluți cu carne și prosciutto în fond clar de pui', pret: 72, badge: 'Signature', alergeni: 'gluten, ou, lactate', imagine: 'paste_tortellini_brodo.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Penne all\'Arrabbiata', descriere: 'Penne rigati cu sos de roșii San Marzano, usturoi, chili peperoncino și parmezan', pret: 62, badge: null, alergeni: 'gluten, lactate', imagine: 'paste_arrabbiata.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Pasta al Pesto Genovese', descriere: 'Trofie liguri cu pesto de busuioc genovez, pine nuts, parmigiano și fagioli', pret: 72, badge: null, alergeni: 'gluten, lactate, nuci', imagine: 'paste_pesto.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Bucatini all\'Amatriciana', descriere: 'Bucatini cu guanciale, roșii San Marzano și pecorino di Amatrice', pret: 75, badge: 'Signature', alergeni: 'gluten, lactate', imagine: 'paste_amatriciana.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Ravioli di Ricotta e Spinaci', descriere: 'Ravioli de casă umpluți cu ricotta de oaie și spanac, cu unt brun de salvie', pret: 82, badge: null, alergeni: 'gluten, lactate, ou', imagine: 'paste_ravioli_ricotta.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Fettuccine Alfredo', descriere: 'Fettuccine cu unt de calitate, parmezan și puțin fond de pui — rețetă romană originală', pret: 68, badge: null, alergeni: 'gluten, lactate, ou', imagine: 'paste_fettuccine_alfredo.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Orecchiette con Cime di Rapa', descriere: 'Paste din Puglia cu varcolici (cime di rapa), salsiccia, usturoi și anchoveta', pret: 75, badge: null, alergeni: 'gluten, pește', imagine: 'paste_orecchiette.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Rigatoni alla Norma', descriere: 'Rigatoni cu vinetele prăjite, sos de roșii sicilian, ricotta salata și busuioc', pret: 68, badge: null, alergeni: 'gluten, lactate', imagine: 'paste_norma.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Risotto allo Zafferano', descriere: 'Risotto clasic milanese cu șofran iranian, unt și parmezan — acompaniament ideal', pret: 78, badge: null, alergeni: 'lactate', imagine: 'paste_risotto_zafferano.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Tagliolini al Limone', descriere: 'Paste fine cu sos de smântână, lămâie Amalfi, parmezan și garoafă proaspătă', pret: 72, badge: 'Sezonier', alergeni: 'gluten, lactate, ou', imagine: 'paste_tagliolini_limone.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Mafaldine cu Ragù de Vânat', descriere: 'Paste cu bordo crestat cu ragù de cerb și mistreț, rozmarin și vin roșu Barolo', pret: 95, badge: 'Sezonier', alergeni: 'gluten', imagine: 'paste_mafaldine_vanat.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Risotto cu Creveți și Lemon Zest', descriere: 'Orez Carnaroli cu creveți tigru, coajă de lămâie Amalfi și mentă proaspătă', pret: 95, badge: null, alergeni: 'lactate, crustacee', imagine: 'paste_risotto_crevete.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Lasagna al Forno', descriere: 'Lasagna clasică cu ragù bolognese, béchamel de casă și parmezan Reggiano', pret: 78, badge: null, alergeni: 'gluten, lactate, ou', imagine: 'paste_lasagna.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Pappardelle cu Ciuperci de Pădure', descriere: 'Pappardelle largi cu mix de ciuperci sălbatice, trufe de vară și parmezan', pret: 88, badge: 'Sezonier', alergeni: 'gluten, lactate, ou', imagine: 'paste_pappardelle_ciuperci.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Pasta Primavera', descriere: 'Fusilli cu legume de sezon sotate, ulei de măsline și parmezan ușor', pret: 62, badge: 'Sezonier', alergeni: 'gluten, lactate', imagine: 'paste_primavera.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Risotto cu Sfeclă Roșie', descriere: 'Risotto vibrant cu sfeclă roșie cuptă, capre cheese cremă și nuci caramelizate', pret: 78, badge: null, alergeni: 'lactate, nuci', imagine: 'paste_risotto_sfecla.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Pasta e Fagioli', descriere: 'Pastă rustică cu fasole borlotti, rosmarino și pancetta — tradițională Veneto', pret: 62, badge: null, alergeni: 'gluten', imagine: 'paste_e_fagioli.jpg' },
  { categorie: 'Paste & Risotto', nume: 'Spaghetti al Nero di Seppia', descriere: 'Spaghetti negre cu cerneală de sepie, sepie și gamberi, cu aioli de usturoi', pret: 88, badge: 'Signature', alergeni: 'gluten, crustacee, ou', imagine: 'paste_spaghetti_nero.jpg' },

  
  // DESERTURI (25)
 
  { categorie: 'Deserturi', nume: 'Tiramisu Clasic', descriere: 'Rețeta originală de Treviso — savoiardi, mascarpone, espresso și Marsala', pret: 52, badge: 'Signature', alergeni: 'gluten, lactate, ou', imagine: 'desert_tiramisu.jpg' },
  { categorie: 'Deserturi', nume: 'Crème Brûlée cu Vanilie', descriere: 'Cremă de Madagascar cu vanilie bourbоn, cu crustă de zahăr ars la torță', pret: 48, badge: "Chef's Choice", alergeni: 'lactate, ou', imagine: 'desert_creme_brulee.jpg' },
  { categorie: 'Deserturi', nume: 'Panna Cotta', descriere: 'Panna cotta de vanilie, cu coulis de fructe de pădure proaspete și mentă', pret: 45, badge: null, alergeni: 'lactate', imagine: 'desert_panna_cotta.jpg' },
  { categorie: 'Deserturi', nume: 'Soufflé au Chocolat', descriere: 'Soufflé cald de ciocolată Valrhona 70%, servit cu înghețată de vanilie artizanală', pret: 68, badge: "Chef's Choice", alergeni: 'gluten, lactate, ou', imagine: 'desert_souffle.jpg' },
  { categorie: 'Deserturi', nume: 'Cannoli Sicilieni', descriere: 'Tuburi crocante cu ricotta de oaie, ciocolată, fistic de Bronte și portocale confiate', pret: 52, badge: 'Signature', alergeni: 'gluten, lactate, nuci', imagine: 'desert_cannoli.jpg' },
  { categorie: 'Deserturi', nume: 'Fondant de Ciocolată', descriere: 'Inimă de ciocolată Valrhona neagră lichidă, cu înghețată de tonka și pralin', pret: 62, badge: "Chef's Choice", alergeni: 'gluten, lactate, ou, nuci', imagine: 'desert_fondant.jpg' },
  { categorie: 'Deserturi', nume: 'Tarte Tatin cu Mere', descriere: 'Tartă clasică franceză cu mere Golden caramelizate și foietaj croissant', pret: 52, badge: null, alergeni: 'gluten, lactate', imagine: 'desert_tarte_tatin.jpg' },
  { categorie: 'Deserturi', nume: 'Opera Cake', descriere: 'Clasicul gâteau parizian cu straturi de joconde, cremă de cafea și glazură de ciocolată', pret: 58, badge: 'Signature', alergeni: 'gluten, lactate, ou, nuci', imagine: 'desert_opera.jpg' },
  { categorie: 'Deserturi', nume: 'Millefeuille', descriere: 'Foietaj caramelizat cu cremă diplomat de vanilie și căpșuni proaspete', pret: 55, badge: null, alergeni: 'gluten, lactate, ou', imagine: 'desert_millefeuille.jpg' },
  { categorie: 'Deserturi', nume: 'Tartă de Lămâie cu Bezea', descriere: 'Curd intens de lămâie Amalfi, cu bezea italiană flambată pe tartă crispy', pret: 52, badge: null, alergeni: 'gluten, lactate, ou', imagine: 'desert_tarta_lamaie.jpg' },
  { categorie: 'Deserturi', nume: 'Mousse de Ciocolată 70%', descriere: 'Mousse aerată de ciocolată Guanaja 70% Valrhona, cu fleur de sel și caramel', pret: 48, badge: null, alergeni: 'lactate, ou', imagine: 'desert_mousse_cioco.jpg' },
  { categorie: 'Deserturi', nume: 'Mont Blanc cu Castane', descriere: 'Meringe croccantă, cremă de castane, vermicelli de marron glacé și chantilly', pret: 58, badge: 'Sezonier', alergeni: 'ou, lactate, nuci', imagine: 'desert_mont_blanc.jpg' },
  { categorie: 'Deserturi', nume: 'Profiteroles cu Ciocolată', descriere: 'Ecleruri mici cu cremă chantilly, glazurate cu ciocolată caldă Caraibe', pret: 52, badge: null, alergeni: 'gluten, lactate, ou', imagine: 'desert_profiteroles.jpg' },
  { categorie: 'Deserturi', nume: 'Cheesecake New York', descriere: 'Cheesecake dens cu biscuit Graham, coulis de mango și lime zest', pret: 55, badge: null, alergeni: 'gluten, lactate, ou', imagine: 'desert_cheesecake.jpg' },
  { categorie: 'Deserturi', nume: 'Sfogliatella Napoletana', descriere: 'Sfogliatella riccia crocantă cu ricotta, griș, portocale confiate și scorțișoară', pret: 42, badge: 'Signature', alergeni: 'gluten, lactate, ou', imagine: 'desert_sfogliatella.jpg' },
  { categorie: 'Deserturi', nume: 'Bavarois de Zmeură', descriere: 'Bavarois fin cu coulis de zmeură proaspătă, biscuit dacquoise și zmeură surgelată', pret: 52, badge: 'Sezonier', alergeni: 'lactate, ou, nuci', imagine: 'desert_bavarois.jpg' },
  { categorie: 'Deserturi', nume: 'Ecler cu Cremă de Vanilie', descriere: 'Ecler clasic Paris-Brest cu cremă patiserie de vanilie și fondant auriu', pret: 42, badge: null, alergeni: 'gluten, lactate, ou', imagine: 'desert_ecler.jpg' },
  { categorie: 'Deserturi', nume: 'Cremă Catalană cu Portocale', descriere: 'Varianta catalană cu coajă de portocală și scorțișoară, cu crustă de zahăr', pret: 48, badge: null, alergeni: 'lactate, ou', imagine: 'desert_crema_catalana.jpg' },
  { categorie: 'Deserturi', nume: 'Torta Caprese', descriere: 'Tortă siciliană fără făină cu migdale și ciocolată neagră — intensă și umedă', pret: 52, badge: null, alergeni: 'lactate, ou, nuci', imagine: 'desert_torta_caprese.jpg' },
  { categorie: 'Deserturi', nume: 'Parfait de Fistic', descriere: 'Parfait înghețat de fistic de Bronte, cu granată proaspătă și sirop de trandafir', pret: 55, badge: 'Sezonier', alergeni: 'lactate, nuci', imagine: 'desert_parfait_fistic.jpg' },
  { categorie: 'Deserturi', nume: 'Îngheţată Artizanală (3 bile)', descriere: 'Selecție din: vanilie bourbon, pistachio, stracciatella, caramel fleur de sel', pret: 42, badge: null, alergeni: 'lactate, nuci', imagine: 'desert_inghetata.jpg' },
  { categorie: 'Deserturi', nume: 'Carpaccio de Ananas', descriere: 'Ananas proaspăt feliat subțire, cu sorbet de cocos, mentă și vanilie Tahiti', pret: 45, badge: null, alergeni: 'lactate', imagine: 'desert_carpaccio_ananas.jpg' },
  { categorie: 'Deserturi', nume: 'Plăcintă de Mere cu Înghețată', descriere: 'Plăcintă caldă de mere cu scorțișoară, înghețată de vanilie de casă și caramel', pret: 48, badge: null, alergeni: 'gluten, lactate, ou', imagine: 'desert_placinta_mere.jpg' },
  { categorie: 'Deserturi', nume: 'Zuccotto Fiorentin', descriere: 'Cupola florentină cu ricotta, ciocolată, fructe confiate și lichior Alchermes', pret: 55, badge: 'Signature', alergeni: 'gluten, lactate, ou', imagine: 'desert_zuccotto.jpg' },
  { categorie: 'Deserturi', nume: 'Bunet Piemontez', descriere: 'Budincă tradițională din Piemont cu ciocolată, cacao, amaretti și rom', pret: 48, badge: null, alergeni: 'lactate, ou, gluten', imagine: 'desert_bunet.jpg' },

  
  // BĂUTURI — VINURI (10)
 
  { categorie: 'Bauturi', subcategorie: 'Vinuri', nume: 'Brunello di Montalcino DOCG 2017', descriere: 'Sangiovese grosso din Toscana — complex, cu note de cireșe negre, cuir și tabac', pret: 380, badge: 'Signature', alergeni: null, imagine: 'vin_brunello.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Vinuri', nume: 'Barolo DOCG 2016 — Nebbiolo', descriere: 'Regele vinurilor italiene din Langhe, cu tanini eleganti și longevitate remarcabilă', pret: 320, badge: null, alergeni: null, imagine: 'vin_barolo.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Vinuri', nume: 'Tignanello 2019 — Super Tuscan', descriere: 'Sangiovese cu Cabernet Sauvignon, un icon al vinificației toscane contemporane', pret: 295, badge: "Chef's Choice", alergeni: null, imagine: 'vin_tignanello.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Vinuri', nume: 'Amarone della Valpolicella 2015', descriere: 'Corvina uscată, intensă și bogată — ciocolată, prune uscate și trufe', pret: 265, badge: null, alergeni: null, imagine: 'vin_amarone.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Vinuri', nume: 'Sancerre Blanc 2021 — Henri Bourgeois', descriere: 'Sauvignon Blanc din Loire — mineral, cu note de lime și piatră de cremene', pret: 185, badge: null, alergeni: null, imagine: 'vin_sancerre.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Vinuri', nume: 'Puligny-Montrachet 2020 — Chardonnay', descriere: 'Grand Cru de Burgundia, cu note de vanilie, unt și mineralitate remarcabilă', pret: 245, badge: 'Signature', alergeni: null, imagine: 'vin_puligny.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Vinuri', nume: 'Champagne Moët & Chandon Brut Impérial', descriere: 'Cuvée iconică — brioche, fructe galbene, bule fine și finisaj delicat', pret: 220, badge: null, alergeni: null, imagine: 'vin_moet.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Vinuri', nume: 'Prosecco di Valdobbiadene DOCG', descriere: 'Glera din Veneto — proaspăt, spumos, cu note de măr verde și flori albe', pret: 120, badge: null, alergeni: null, imagine: 'vin_prosecco.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Vinuri', nume: 'Château Pichon Baron 2018 — Pauillac', descriere: 'Cabernet Sauvignon de Bordeaux — cedru, cassis, tanini nobili', pret: 355, badge: null, alergeni: null, imagine: 'vin_pichon.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Vinuri', nume: 'Riesling Auslese Mosel 2020', descriere: 'Riesling german cu aciditate vibrantă, miere de albine și petrol nobil', pret: 165, badge: null, alergeni: null, imagine: 'vin_riesling.jpg' },

 
  // BĂUTURI — WHISKY (10)

  { categorie: 'Bauturi', subcategorie: 'Whisky', nume: 'Glenfiddich 18 Years — Single Malt', descriere: 'Speyside scotch cu note de fructe tropicale, miere și nuanțe de sherry maturat', pret: 95, badge: null, alergeni: null, imagine: 'whisky_glenfiddich.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Whisky', nume: 'Macallan 12 Double Cask', descriere: 'Highland scotch cu vanilie cremată, fructe coapte și unt de caramel din butoaie de sherry', pret: 85, badge: null, alergeni: null, imagine: 'whisky_macallan.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Whisky', nume: 'Johnnie Walker Blue Label', descriere: 'Blend de excepție — fum delicat, fructe uscate, ciocolată neagră și finisaj lung', pret: 155, badge: 'Signature', alergeni: null, imagine: 'whisky_jw_blue.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Whisky', nume: 'Lagavulin 16 Years — Islay', descriere: 'Scotch turfos iconic din Islay — fum intens, iod, ciocolată și fructe uscate', pret: 115, badge: "Chef's Choice", alergeni: null, imagine: 'whisky_lagavulin.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Whisky', nume: 'Balvenie DoubleWood 17 Years', descriere: 'Maturat în butoaie de bourbon apoi de sherry — miere, fructe de pădure, vanilie', pret: 125, badge: null, alergeni: null, imagine: 'whisky_balvenie.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Whisky', nume: 'Yamazaki 12 Years — Suntory', descriere: 'Single malt japonez — elegant, cu note de piersică, miere de albine și lemn de mizunara', pret: 135, badge: 'Signature', alergeni: null, imagine: 'whisky_yamazaki.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Whisky', nume: 'Laphroaig 10 Years — Islay', descriere: 'Turfos, iodat și medicinal — un whisky cu caracter puternic și fideli devotiți', pret: 88, badge: null, alergeni: null, imagine: 'whisky_laphroaig.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Whisky', nume: 'Dalmore 15 Years — Highland', descriere: 'Maturat în butoaie de bourbon, sherry și porto — ciocolată cu lapte, portocale și scorțișoară', pret: 105, badge: null, alergeni: null, imagine: 'whisky_dalmore.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Whisky', nume: 'Highland Park 18 Years', descriere: 'Orkney scotch cu echilibru perfect — fum delicat, miere de erica și fructe de pădure', pret: 118, badge: null, alergeni: null, imagine: 'whisky_highland_park.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Whisky', nume: 'Oban 14 Years — West Highland', descriere: 'Scotch de coastă cu sare marină, fum ușor, portocale și miere de stâncă', pret: 92, badge: null, alergeni: null, imagine: 'whisky_oban.jpg' },


  // BĂUTURI — ROM (10)
 
  { categorie: 'Bauturi', subcategorie: 'Rom', nume: 'Diplomatico Reserva Exclusiva', descriere: 'Rom venezuelean de 12 ani — caramel, ciocolată și fructe tropicale coapte', pret: 72, badge: 'Signature', alergeni: null, imagine: 'rom_diplomatico.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Rom', nume: 'Appleton Estate 21 Years', descriere: 'Jamaica rum de excepție — complex, cu note de stejar, stafide și portocale', pret: 115, badge: "Chef's Choice", alergeni: null, imagine: 'rom_appleton.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Rom', nume: 'Zacapa Centenario 23', descriere: 'Sistema solera din Guatemala — vanilie, caramel, miere și scorțișoară', pret: 88, badge: null, alergeni: null, imagine: 'rom_zacapa.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Rom', nume: 'Plantation XO 20th Anniversary', descriere: 'Blend de Barbados și Trinidad maturat în butoaie de cognac — rafinat și complex', pret: 95, badge: null, alergeni: null, imagine: 'rom_plantation_xo.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Rom', nume: 'Havana Club 7 Years', descriere: 'Rom cubanez clasic — tutun blând, miere și lemn fin de cedru cuban', pret: 55, badge: null, alergeni: null, imagine: 'rom_havana.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Rom', nume: 'El Dorado 15 Years — Demerara', descriere: 'Rom guyanez din distileria Demerara — zahăr brun, prune, ananas și piper negru', pret: 85, badge: null, alergeni: null, imagine: 'rom_el_dorado.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Rom', nume: 'Mount Gay XO — Barbados', descriere: 'Cel mai vechi brand de rom — complex, cu fructe uscate, cacao și ienibahar', pret: 78, badge: null, alergeni: null, imagine: 'rom_mount_gay.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Rom', nume: 'Botucal Reserva Exclusiva', descriere: 'Rom venezuelean artizanal din hacienda privată — elegant, cu ciocolată și trufe', pret: 82, badge: null, alergeni: null, imagine: 'rom_botucal.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Rom', nume: 'Ron Abuelo 12 Years — Panama', descriere: 'Maturat în butoaie de bourbon american — caramel, vanilie și mirodenii fine', pret: 68, badge: null, alergeni: null, imagine: 'rom_abuelo.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Rom', nume: 'Bacardi Ocho 8 Years', descriere: 'Rom alb maturat 8 ani — fructe de padure, caramel și vanilie fină', pret: 52, badge: null, alergeni: null, imagine: 'rom_bacardi_ocho.jpg' },

  
  // BĂUTURI — SUCURI (10)
 
  { categorie: 'Bauturi', subcategorie: 'Sucuri', nume: 'Suc de Portocale Proaspăt', descriere: 'Portocale siciliene stoarse la comandă, nefiltre', pret: 22, badge: null, alergeni: null, imagine: 'suc_portocale.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Sucuri', nume: 'Limonadă Artizanală cu Mentă', descriere: 'Lămâi Amalfi, zahăr de trestie, apă carbogazoasă și mentă proaspătă', pret: 25, badge: null, alergeni: null, imagine: 'suc_limonada.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Sucuri', nume: 'Suc de Mere cu Ghimbir', descriere: 'Mere Fuji presate la rece, cu ghimbir proaspăt și puțin lime', pret: 22, badge: null, alergeni: null, imagine: 'suc_mere_ghimbir.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Sucuri', nume: 'Smoothie Mango & Ananas', descriere: 'Mango alphonso și ananas prăjit, cu lapte de cocos și lime', pret: 28, badge: null, alergeni: null, imagine: 'suc_mango_ananas.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Sucuri', nume: 'Suc de Rodie Proaspăt', descriere: 'Rodie iraniana stoarsă la comandă cu puțin lime și miere de flori', pret: 28, badge: null, alergeni: null, imagine: 'suc_rodie.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Sucuri', nume: 'Virgin Mojito', descriere: 'Lime proaspăt, mentă, zahăr de trestie și apă minerală carbogazoasă', pret: 25, badge: null, alergeni: null, imagine: 'suc_virgin_mojito.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Sucuri', nume: 'Suc de Sfeclă cu Lămâie', descriere: 'Sfeclă roșie, morcovi, ghimbir și lămâie presate la rece', pret: 25, badge: null, alergeni: null, imagine: 'suc_sfecla.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Sucuri', nume: 'Lemonade cu Lavandă', descriere: 'Sirop de lavandă, lămâi presate, apă arteziană — proaspăt și floral', pret: 25, badge: 'Sezonier', alergeni: null, imagine: 'suc_lavanda.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Sucuri', nume: 'Suc de Pepene Verde cu Mentă', descriere: 'Pepene roșu fără semințe, mentă proaspătă și puțin sare de Himalaya', pret: 22, badge: 'Sezonier', alergeni: null, imagine: 'suc_pepene.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Sucuri', nume: 'Suc de Morcovi și Grepfrut', descriere: 'Morcovi biologici, grepfrut roz și curcuma — detox natural', pret: 22, badge: null, alergeni: null, imagine: 'suc_morcov_grepfrut.jpg' },

  
  // BĂUTURI — CEAIURI (10)
 
  { categorie: 'Bauturi', subcategorie: 'Ceaiuri', nume: 'Earl Grey Imperial', descriere: 'Ceai negru Ceylon cu bergamot natural — clasic și elegant, servit cu lapte', pret: 22, badge: null, alergeni: 'lactate', imagine: 'ceai_earl_grey.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Ceaiuri', nume: 'Darjeeling First Flush', descriere: 'Prima recoltă din Darjeeling, delicată și florală — numită și Champagne-ul ceaiurilor', pret: 28, badge: 'Signature', alergeni: null, imagine: 'ceai_darjeeling.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Ceaiuri', nume: 'Matcha Ceremonial Grade', descriere: 'Matcha japonez de calitate superioară, preparat tradițional cu chasen', pret: 32, badge: null, alergeni: null, imagine: 'ceai_matcha.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Ceaiuri', nume: 'Oolong Milk Tea', descriere: 'Oolong taiwanez cu note de piersică și miere, servit cu lapte de ovăz', pret: 28, badge: null, alergeni: null, imagine: 'ceai_oolong.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Ceaiuri', nume: 'Jasmine Pearl', descriere: 'Muguri de ceai verde rulați înfloriți cu flori de iasomie — parfumat și delicat', pret: 28, badge: null, alergeni: null, imagine: 'ceai_jasmine.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Ceaiuri', nume: 'Ceai de Mentă Morocan', descriere: 'Ceai verde gunpowder cu mentă proaspătă și zahăr din trestie — servit la ibric', pret: 22, badge: null, alergeni: null, imagine: 'ceai_menta.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Ceaiuri', nume: 'Rooibos Vanilie', descriere: 'Rooibos sud-african fără cofeină cu vanilie naturală și note de caramel', pret: 22, badge: null, alergeni: null, imagine: 'ceai_rooibos.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Ceaiuri', nume: 'Chai Masala Indian', descriere: 'Amestec de ceai negru, cardamom, scorțișoară, ghimbir și piper — servit cu lapte', pret: 25, badge: null, alergeni: 'lactate', imagine: 'ceai_chai.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Ceaiuri', nume: 'Sencha Kyoto', descriere: 'Ceai verde japonez de calitate, cu gust de iarbă proaspătă și note marine', pret: 25, badge: null, alergeni: null, imagine: 'ceai_sencha.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Ceaiuri', nume: 'Ceai de Hibiscus cu Trandafir', descriere: 'Petale de hibiscus și trandafir de damasc, servit cald sau rece cu miere', pret: 22, badge: 'Sezonier', alergeni: null, imagine: 'ceai_hibiscus.jpg' },

 
  // BĂUTURI — COCKTAILURI (10)

  { categorie: 'Bauturi', subcategorie: 'Cocktailuri', nume: 'Negroni Clasic', descriere: 'Campari, gin London Dry, Vermouth Rosso — servit pe gheată cu coajă de portocală', pret: 55, badge: null, alergeni: null, imagine: 'cocktail_negroni.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Cocktailuri', nume: 'Aperol Spritz', descriere: 'Aperol, Prosecco, apă minerală și o felie de portocală proaspătă', pret: 48, badge: null, alergeni: null, imagine: 'cocktail_aperol.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Cocktailuri', nume: 'Old Fashioned cu Bourbon', descriere: 'Bourbon Maker\'s Mark, zahăr brun, Angostura bitters și coajă de portocală', pret: 62, badge: 'Signature', alergeni: null, imagine: 'cocktail_old_fashioned.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Cocktailuri', nume: 'Espresso Martini', descriere: 'Vodka Belvedere, Kahlua, espresso proaspăt — shaked ușor și espumos', pret: 65, badge: "Chef's Choice", alergeni: null, imagine: 'cocktail_espresso_martini.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Cocktailuri', nume: 'Mojito Clasic', descriere: 'Havana Club 3 ani, lime proaspăt, mentă, zahăr de trestie și soda', pret: 52, badge: null, alergeni: null, imagine: 'cocktail_mojito.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Cocktailuri', nume: 'Margarita cu Lime', descriere: 'Tequila Patron Silver, Cointreau, lime proaspăt — cu margine de sare', pret: 58, badge: null, alergeni: null, imagine: 'cocktail_margarita.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Cocktailuri', nume: 'Manhattan cu Rye', descriere: 'Bulleit Rye, Vermouth Rosso, Angostura bitters, cireașă maraschino', pret: 65, badge: null, alergeni: null, imagine: 'cocktail_manhattan.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Cocktailuri', nume: 'Hugo Spritz', descriere: 'Prosecco, Elderflower, mentă, lime și apă minerală — floral și răcoritor', pret: 48, badge: 'Sezonier', alergeni: null, imagine: 'cocktail_hugo.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Cocktailuri', nume: 'Amaretto Sour', descriere: 'Disaronno, suc de lămâie proaspăt, sirop, albuș de ou și bitter Angostura', pret: 55, badge: null, alergeni: 'ou', imagine: 'cocktail_amaretto_sour.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Cocktailuri', nume: 'Cosmopolitan', descriere: 'Vodka Ciroc, Cointreau, suc de merișor, lime — servit în cupă Martini', pret: 58, badge: null, alergeni: null, imagine: 'cocktail_cosmopolitan.jpg' },

 
  // BĂUTURI — BERI (10)

  { categorie: 'Bauturi', subcategorie: 'Beri', nume: 'Peroni Nastro Azzurro — la presă', descriere: 'Bere italiană premium la draft — ușoară, curată, perfectă cu pizza sau antipasto', pret: 28, badge: null, alergeni: 'gluten', imagine: 'bere_peroni.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Beri', nume: 'Moretti alla Spina', descriere: 'Birra Moretti la halbă — bere italiană ușoară cu gust fin de malț', pret: 28, badge: null, alergeni: 'gluten', imagine: 'bere_moretti.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Beri', nume: 'Hoegaarden Wit — bere albă', descriere: 'Bere albă belgiană cu coajă de portocală și coriandru — nefiltrat, răcoritoare', pret: 32, badge: null, alergeni: 'gluten', imagine: 'bere_hoegaarden.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Beri', nume: 'Leffe Brune', descriere: 'Bere abatiales belgiancă închisă — caramel, vanilie și note de fructe uscate', pret: 35, badge: null, alergeni: 'gluten', imagine: 'bere_leffe_brune.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Beri', nume: 'Paulaner Weissbier', descriere: 'Hefeweizen bavarez autentic — banana, cuișoare și grâu nefiltat', pret: 35, badge: null, alergeni: 'gluten', imagine: 'bere_paulaner.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Beri', nume: 'Grimbergen Blanc', descriere: 'Bere abatiales belgiancă albă — coriandru, coajă de portocală și aromă fină', pret: 35, badge: null, alergeni: 'gluten', imagine: 'bere_grimbergen.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Beri', nume: 'Erdinger Dunkel', descriere: 'Bere weiss neagră bavarezcă — ciocolată, caramel și note de malt prăjit', pret: 38, badge: null, alergeni: 'gluten', imagine: 'bere_erdinger.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Beri', nume: 'Stella Artois', descriere: 'Lager belgianс premium — ușoară, echilibrată, cu ușoară amar de hamei', pret: 25, badge: null, alergeni: 'gluten', imagine: 'bere_stella.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Beri', nume: 'Corona Extra', descriere: 'Lager mexican ușor — servit cu felie de lime, perfect pentru vară', pret: 28, badge: null, alergeni: 'gluten', imagine: 'bere_corona.jpg' },
  { categorie: 'Bauturi', subcategorie: 'Beri', nume: 'Heineken Premium', descriere: 'Lager olandez clasic la sticlă — proaspăt, curat și recunoscut în toată lumea', pret: 25, badge: null, alergeni: 'gluten', imagine: 'bere_heineken.jpg' }

])

console.log('Seed complet! 220 preparate inserate.')
process.exit(0)
