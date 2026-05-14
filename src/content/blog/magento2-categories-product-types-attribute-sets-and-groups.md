---
title: 'Magento2 Categories, product types, attribute sets and groups'
date: '2017-06-16 23:28'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

As a reminder for myself, some info about the Magento2 product model,
and it's quircks.

Product types
=============

A configurable product allows the shopper to choose options from
drop-down lists. Each option is actually a separate, simple product.
Each drop-down list values is based on an attribute of the "Dropdown"
input type. The drop-down attributes must be included in the attribute
set, which is then used as a template for the configurable product. The
thumbnail image in the shopping cart can be set to display the image
from the configurable product record, or from the product variation.

Magento Product Attribute Sets
==============================

Magento uses a dynamic product attribute system that is also used to
create and populate filters. It has some intelligence as it will only
use existing, populated, product/attributes to show filters fore the
products that are displayed in a category.

One of the first steps when creating a product is to choose the
attribute set that is used as a template for the product. The attribute
set determines the fields that are available during data entry, and the
values that appear to the customer. The attributes are organized into
groups that determine where they appear in the product record. Your
store comes with an initial attribute set called "default" which
includes a set of commonly-used attributes. If your store will only
contain a small amount of attributes, you can add them to the default
attribute set. However, for large catalog of products that require
specific types of information, such as cameras, it might be better to
create a dedicated attribute set that includes the specific attributes
that are needed to describe the product. Some extra benefits of defining
attribute sets is the ability to show filters and to determine what info
will be available when a customer uses the compare functionality.

**Global attributes**
---------------------

-   Product details
    -   status
    -   name
    -   sku
    -   sku_type
    -   price
    -   price_type
    -   tax_class_id
    -   quantity_and_stock_status
    -   weight
    -   weight_type
    -   visibility
    -   news_from_date
    -   news_ro_date
    -   country_of_manufacture
-   Content
    -   description
    -   short description
-   Bundle items
    -   shipment_type

Custom product attribute sets
-----------------------------

When creating product attribute sets some constraints apply.

**Constraints**

-   A product has global attributes that can be used for all products,
    only name, price, sku, are mandatory
-   A product is only assigned to one product set
-   Attributes in a attribute set can be mandatory or optional; this is
    a global poperty , e.g. shared between all attributes sets that are
    using this attribute

When you insist on using multiple attribute sets for a product you could
use an configurable product.

It's also nice to use attribute groups when you have a large catalogus,
when you want to create a page like this:
Image: Schermafbeelding-2017-06-17-om-00.24.01.png

To get an idea of how the DB model looks:
Image: Custom-Attribute-1.png
