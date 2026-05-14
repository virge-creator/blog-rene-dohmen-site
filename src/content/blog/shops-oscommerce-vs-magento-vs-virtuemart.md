---
title: 'Shops osCommerce vs Magento vs VirtueMart'
date: '2011-07-05 20:26'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","javascript","database"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

Voor een klant zijn we bezig aan een webshop. Nu hebben we in het
verleden veel gedaan met osCommerce, maar dat staat al jaren op dezelfde
versie. Dat is eigenlijk geen probleem want osCommerce draait harstikke
stabiel als ie eenmaal is ingericht. Een van de nadelen van osCommerce
vind ik wel dat het lastig is om er je eigen looknfeel aan te geven
omdat de structuur al helemaal vaststaat en dat het design in de code
verwerkt zit, wat betekent dat je een hoop bestanden moet bewerken om
een nieuw design neer te zetten.

Dus op zoek gegaan naar een aantal andere kandidaten: 3 vielen me op;
Magento, VirtueMart en Zen Cart.

Zencart is een door ontwikkeling (fork) van osCommerce, virtueMart is
vooral bekend als joomla plugin. Na wat zoekwerk in Google kom je vooral
mensen tegen die willen overstappen van ZenCart of VirtueMart naar
Magento.

Op een aantal voordelen van Magento ga ik nu verder in.

**Multishop**
=============

Via een enkele back-end van Magento kun je meerdere webwinkels
aanbieden, maar ook koppelen aan verschillende domeinnamen. Het voordeel
van de Magento multishop functie is dat je gebruik kan maken van 1
database waar al je producten in staan. Zo kun je per webwinkel bepalen
hoeveel of hoe weinig informatie de webwinkels met elkaar zullen delen.
Even snel wat termen tussendoor. In Magento spreekt men over [Websites,
Stores en Store
Views](http://www.magentocommerce.com/knowledge-base/entry/overview-how-multiple-websites-stores-work/).
Het verschil tussen een Website en een Store, is dat een Website
eigenlijk alleen klant data bevat, maar geen producten en categorieën.
Stores zijn de echte winkels. Deze bevatten de verschillende producten
die in de shop beschikbaar zijn. Stores hebben een of meerdere Store
views. Store views zijn de verschillende manieren waarop de Stores
zichtbaar worden gemaakt. Vaak is er b.v. per taal een Store View
aangemaakt. Elke Magento site heeft dus altijd minstens een Website, een
Store, en een Store View. Het multi store principe is dus best flexibel.

Een van de dingen waar ik bij deze business case tegen aan liep was de
vraag of een product in de ene store een andere prijs kan hebben dan in
de andere. Met de recente versie van magento is zelfs hier over
nagedacht:

> "You can determine the level at which prices are shared in the
> Catalog Price Scope drop-down. If you select Global, prices will be
> shared across all websites. If you select Website, prices can differ
> between websites, although they will still be shared between store
> views contained in the same website. The price here affects several
> different areas in Magento. For example, this includes product prices,
> base currency, price filters in the admin, and catalog/shopping cart
> price rules."

Je kan het dus vanuit de GUI instellen, globaal of per shop.

**Voorraad beheer**
===================

Voorraad wordt in Magento op 2 plaatsen beheerd. Via Algemene
instellingen of via productbeheer. Als je dit in een multi shop setup
draait dan heb je uiteindelijk maar 1 centraal voorraadbeheer systeem.
Een andere optie is er niet; je kan een sub shop geen eigen los
voorraadbeheer systeem geven. Dit speelt natuurlijk alleen een rol als
een produkt in meerdere van je sub shop(s) voorkomt.

Design
======

Magento heeft een uitgekiend template systeem dat volledig met CSS
werkt. Nadeel is dat in de praktijk de css versnipperd over een aantal
bestanden wordt ingelezen zodat het in het begin lastig zoeken is naar
waar iets staat (layered css). Snelste optie is om een template extern
in te kopen die qua structuur het beste eruit ziet. Kleuren van de
template kunnen wel redelijk eenvoudig aangepast worden. Wel zit er
behoorlijk verschil tussen templates van Magento 1.3 -\> minstens versie
1.5 nodig
