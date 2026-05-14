---
title: 'What to do if you PyCharm doesn’t start after an update'
date: '2018-08-24 00:49'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","ssh"]
thumbnail: '/images/thumbnails/python.jpg'
status: 'published'
---

Yesterday after updating from 2018.1 to 2018.2 PyCharm kept crashing when closing a project. As Pycharm reopens a
project upon restart and I normally have a lot of PyCharm instance open, this kind of forced me to open a lot of
PyCharms that I don’t need all the time. As the crash also wiped preference changes it couldn’t be changed via the GUI.

I had to edit a config file to change the setting responsible for starting projects after launch.

Reminder for myself in the future, might this happen again.

# Edit file:

`vim ~/Library/Preferences/PyCharm2018.2/options/ide.general.xml`

Changed it to:

```xml
<application>
  <component name="GeneralSettings">
    <option name="confirmExit" value="false" />
    <option name="reopenLastProject" value="false" />
  </component>
  <component name="Registry">
    <entry key="ide.ssh.one.time.password" value="true" />
  </component>
</application>
```
