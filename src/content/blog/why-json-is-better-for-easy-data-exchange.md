---
title: 'Why json is better for easy data exchange'
date: '2013-04-02 05:15'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","javascript"]
thumbnail: '/images/thumbnails/webdesign.png'
status: 'published'
---

JSON: The Fat-Free Alternative to XML
=====================================

Extensible Markup Language (XML) is a text format derived from Standard
Generalized Markup Language (SGML). Compared to SGML, XML is simple.
HyperText Markup Language (HTML), by comparison, is even simpler. Even
so, a good reference book on HTML is an inch thick. This is because the
formatting and structuring of documents is a complicated business.

Most of the excitement around XML is around a new role as an
interchangeable data serialization format. XML provides two enormous
advantages as a data representation language:

It's text-based. It's position-independent. These together encouraged
a higher level of application-independence than other data-interchange
formats. The fact that XML was already a W3C standard meant that there
wasn't much left to fight about (or so it seemed).

Unfortunately, XML is not well suited to data-interchange and it
doesn't match the data model of most programming languages. When most
programmers saw XML for the first time, they were shocked at how ugly
and inefficient it was. The XML tags generate quite some overhead. There
is another text notation that has all of the advantages of XML, but is
much better suited to data-interchange. That notation is JavaScript
Object Notation (JSON).

JSON promises the same benefits of interoperability and openness, but
without the disadvantages.

Let's compare XML and JSON on the attributes that the XML community
considers important.

Simple to use
-------------

JSON is much simpler than XML. JSON has a much smaller grammar and maps
more directly onto the data structures used in modern programming
languages.

Extensible
----------

JSON is not extensible because it does not need to be. JSON is not a
document markup language, so it is not necessary to define new tags or
attributes to represent data in it.

Interoperable
-------------

JSON has the same interoperability potential as XML.

Openness
--------

JSON is at least as open as XML, perhaps more so because it is not in
the center of corporate/political standardization struggles.

In summary these are some of the advantages of XML
==================================================

XML separates the presentation of data from the structure of that data.

XML requires translating the structure of the data into a document
structure. This mapping can be complicated. JSON structures are based on
arrays and records. That is what data is made of. XML structures are
based on elements (which can be nested), attributes (which cannot), raw
content text, entities, DTDs, and other meta structures.

JSON is a better *data exchange format*. XML is a better *document
exchange format*.

Use the right tool for the right job.

When to use XML
---------------

In general, XML is good for situations in which\...

-   You need message validation
-   You're using XSLT
-   Your messages include a lot of marked-up text
-   You need to interoperate with environments that don't support JSON
-   You need attributes or namespacing

When to use Json
----------------

In general, JSON is good for situations in which\...

-   Messages don't need to be validated, or validating their
    deserialization is simple
-   You're not transforming messages, or transforming their
    deserialization is simple
-   Your messages are mostly data, not marked-up text
-   The messaging endpoints have good JSON tools
