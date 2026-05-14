---
title: 'Installing OS X 10.7 in VmWare Fusion'
date: '2012-01-02 20:26'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

By default, the Install Mac OS X Lion application is located in the
Applications folder. If you have already installed Lion on your Mac, the
Lion installer will be deleted and you need to download it again from
the Mac App store. To download Lion again, hold the option key in your
keyboard and then click the Purchases tab in the App store. You can now
view the application and can download the installer again.

To install Mac OS X 10.7 (Lion) in a virtual machine using the Lion
installer download:

In Fusion, from the menu bar, go to File \> New. Choose Continue without
disc. Drag and drop the Install Mac OS X Lion application onto the Use
operating system installation disc or image drop-down menu. (The inner
window frame highlights in blue, indicating that you can drop the file
there). Or browse to the Lion installer located in your /Applications
folder.

The drop-down menu changes to Install Mac OS X Lion.

Click Continue. Ensure Operating System is set to Apple Mac OS X and
Version is set to OS X 10.7 64-bit then click Continue. If you wish to
adjust any of the settings, click Customize Settings to specify
non-default values for memory (RAM), CPU, hard disk size, etc. Click
Finish.

The installation starts.

When prompted, select Reinstall Mac OS X and click Continue. Click
Continue. Agree to the license agreement and follow the prompts to begin
the installation. The Lion installer download additional needed
components, then reboots. To install Mac OS X 10.7 (Lion) in a virtual
machine using the Lion USB installer disk:

In Fusion, from the menu bar, go to File \> New. Choose Continue without
disc. Choose Create a custom virtual machine then click continue. Using
the drop down menus, select Apple Mac OS X for the Operating System, and
OS X 10.7 for the Version.

Note: Choose OS X 10.7 64-bit if you would like the 64 bit version.

Click Continue. If you wish to adjust any of the settings, to specify
non-default values for the memory (RAM), CPU, or hard disk size, click
Customize Settings. Click Finish.

You are presented with the VMware EFI boot screen.

Wait until the screen changes to the shell prompt, then type exit and
hit enter. Connect your Lion USB install disk to your Mac. In Fusion,
from the menu bar, go to Virtual Machine \> Settings.

Note: If your mouse pointer does not move, press the control and command
keys on your keyboard.

Select USB & Bluetooth, place a check next to the Mac OS X Install disk,
then select Connect to VM from the dropdown menu. Close the Settings
window. Click in the virtual machine window, then use the keyboard arrow
keys to select Boot Manager. Press enter. In the Boot Manager screen,
use the arrow keys to select EFI USB Device. Press enter.

The Lion recovery utility boots.

Select your language and press enter. Choose Reinstall Mac OS X and
press enter.

The OS X installation begins. Once the installation is complete, VMware
Tools must be installed in the guest. To do this, first eject the Mac OS
installation disc image from within the new virtual machine. Then in the
VMware Fusion menu click : Virtual Machine -\> Install VMware Tools and
follow the on screen instructions.

Image: OSX.png
