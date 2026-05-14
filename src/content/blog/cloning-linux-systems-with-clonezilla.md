---
title: 'Cloning Linux systems with CloneZilla'
date: '2010-01-10 21:40'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux","tutorial"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

We will save all the partitions entries (both primary and logicial ones
which appear in the extended partition). In this example, we'll be
assuming that hda (the first IDE hard disk) is to be backed up.

First, we will save the MBR with DD (GNU convert and copy)

cd /root mkdir partition-backup cd partition-backup dd if=/dev/hda
of=backup-hda.mbr count=1 bs=512

It will produce a very small, but very important file: 512 bytes of
data. Now, we will save entries of the extended partitions:

sfdisk -d /dev/hda \> backup-hda.sf

sfdisk is a tool provided with the util-linux package.

IMPORTANT: You should now put these files somewhere safe - copy them to
a floppy disk (and take a copy of it!), or burn them onto a CD. Keep
these files safe. Do not leave them on your hard drive - if there is a
problem with the drive, you may not be able to access these files, and
while your partition images won't be wortheless, it will certainly be a
lot harder to restore your data.

Restoring partition entries from the backup

Be careful, restoring is a dangerous action - it can destroy data!
First, we will restore the Master Boot Record:

dd if=backup-hda.mbr of=/dev/hda

Then, here is how to restore extended partitions entries:

sfdisk /dev/hda \< backup-hda.sf

To finish, you will have to reboot your computer.

Using Partclone with an ext4-formatted partition

Without compression

To backup without compression:

\$ partclone.ext4 -c -s /dev/sda1 -o \~/image_sda1.pcl

To restore it:

\$ partclone.ext4 -r -s \~/image_sda1.pcl -o /dev/sda1

With compression

This time, backup with compression:

\$ partclone.ext4 -c -s /dev/sda1 \| gzip -c \> \~/image_sda1.pcl.gz

Note: For maximum compression use "gzip -c9"

Restore it:

zcat \~/image_sda1.pcl.gz \| partclone.ext4 -r -o /dev/sda1

Whole system can be on a thumbdrive with clonezilla\....

Then for SWAP:

swapoff

mkswapfs /dev/sda5

swaponn

Restore:

swapoff /dev/sda5

dd if=backup.mbr of=/dev/sda

sfdisk /dev/sda\<backup.sf

zcat sda1.partclone.img.gz\|partclone.ext4 -r -o /dev/sda1 5
Troubleshooting

It is possible that you see this message during the restore:

Failed to install grub

and that the system will not boot afterwards:

Grub 2

(I've had this with Ubuntu systems.)

The solution is to boot into a rescue system (e.g. Knoppix or the Ubuntu
Live-CD) and install GRUB from the rescue system.

Once Knoppix or the Ubuntu Live system has started, open a terminal and
become root:

Knoppix:

su

Ubuntu:

sudo su

In this example, I have one big partition (/dev/sda1) that also contains
the /boot directory (the Boot column is marked with a star).

I will now mount that partition to the /mnt directory:

mount /dev/sda1 /mnt mount -o bind /dev /mnt/dev o bind -t proc /proc
/mnt/proc

(If you have a separate /boot partition, e.g. /dev/sda2, you'd mount it
to /mnt/boot after you have mounted /dev/sda1 to /mnt.)

Now we install GRUB as follows:

chroot /mnt grub-install \--no-floppy "(hd0)"

This will give you the following error:

<root@Knoppix>:\~\# chroot /mnt grub-install \--no-floppy "(hd0)"

You shouldn't call /sbin/grub-install. Please call
/usr/sbin/grub-install instead!

/dev/sda1 does not have any corresponding BIOS drive. \@Knoppix:\~\#

To overcome the error, run

chroot /mnt grub-install \--no-floppy "(hd0)" \--root-directory=/
\--recheck

<root@Knoppix>:\~\# chroot /mnt grub-install \--no-floppy "(hd0)"
\--root-directory=/ \--recheck

You shouldn't call /sbin/grub-install. Please call
/usr/sbin/grub-install instead!

Probing devices to guess BIOS drives. This may take a long time. GRUB to
(hd0) as (hd0)\... finished. No error reported. is the contents of the
device map //boot/grub/device.map. this is correct or not. If any of the
lines is incorrect, it and re-run the script `grub-install'.

(hd0) /dev/sda \@Knoppix:\~\#

That's it - now reboot\...

reboot

\... and don't forget to remove the Knoppix or Ubuntu CD from the CD
drive. If everything goes well, the GRUB error should be gone, and the
system should boot without any problems.
