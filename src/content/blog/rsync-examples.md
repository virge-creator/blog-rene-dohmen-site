---
title: 'Rsync examples'
date: '2011-11-02 19:52'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux","ssh"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

Rsync is arguably one of the most powerful tools you can have in your
arsenal as a systems administrator or user. It does not matter if you
take care of one system or thousands, rsync can make your life easier.
You can backup files, transfer data from one system to another or make
sure the data in two locations are identical. Rsync can do this for you
without you worrying about what data has changed; it will take care of
the details.

BUT: I always forgot how it works, weird slashes in the commands, spaces
in paths, have to read to the complete manpage, do some googling for
rsync examples and rsync howto to get stuff working. Hence as a reminder
my most used examples with some explanations.

Using rsync to copy locally
===========================

The simplest use of rsync is to copy data from on place to another on
the same machine. You can copy entire disks, directories or just files
with rsync. Lets says we have a external usb disk mount at /usbdisk/
that we are going to copy data from. We want to make sure the copy can
resume even if someone unplugs the usb disk or we loose power to the
unit. The following command will copy the files on the usb disk from the
directory /usbdisk/ to the local disk in /localdisk/.

``` {.bash}
rsync -av /usbdisk/ /localdisk/
```

Now, what if you lost connectivity to the usb device and the sync
stopped for some reason? You would then run the same rsync command a
second time. Rsync would look at the files in both locations and copy
the difference. In effect it would continue the copy from the point the
sync was interrupted.

Doing remote rsync stuff
========================

Lets say we wanted to copy all of the files under our local directory,
"/usbdisk/" and place a copy on the machine "somemachine" under the
remote directory "/backups/". The name of the user on the remote
machine is "foo". Notice we added the "-z" argument so all data will
be compressed over the network. We could use the following line:

``` {.bash}
rsync -avz /usbdisk/ foo@somemachine:/backups/
```

What if you wanted to delete any files on the \_remote\_ machine that
are no longer on the source machine? We can use the same command above
and simply add the "\--del" argument. This will tell rsync to delete
any files from "/backups/" that are no longer on the source directory,
"/usbdisk/".

``` {.bash}
rsync -avz --del /usbdisk/ foo@somemachine:/backups/
```

What if you wanted to not just copy all of the files under /usbdisk/,
but also the /usbdisk/ directory name. Just leave off the last "/"
after the "/usbdisk" directory name. This will tell rsync to copy the
directory name and all files under that directory. On the remote server
you will then see the directory structure /backups/usbdisk/.

``` {.bash}
rsync -avz /usbdisk foo@somemachine:/backups/
```

You can also rsync multiple files or directories using a single rsync
line. This is useful when coping over the network as you only need to
enter your ssh password once. Here we will copy the source directories
/data1 and /data2 to the remote machine "somemachine" in the /backups/
directory.

``` {.bash}
rsync -avz /data1 /data2 foo@somemachine:/backups/
```

You can also pull the data from a remote machine to your local box. To
rsync all of the files from the same "somemachine" to our local box
just reverse the target and destination of the previous example:

``` {.bash}
rsync -avz foo@somemachine:/backups/ /usbdisk/
```

Dealing with spaces in paths
============================

Spaces cause all sorts of problems. To rsync when you have spaces in the
files and/or directories you need to use a single tick to encompass the
entire string and then escape the spaces. The following line shows the
remote directory name "/I Hate Spaces" and the file name "some
File.avi", both contain spaces. We will be rsync'ing the file to our
local directory "/current_dir/".

``` {.bash}
rsync -av foo@somemachine:'/I\ Hate\ Spaces/some\ File.avi' /current_dir/
```

Execute remote shell command to rsync files
===========================================

It is important to note rsync can also execute commands on the remote
machine to help you generate a list of files copy. The shell command is
expanded by your remote shell before rsync is called.

The following line will run the find command on the remote machine in
the video directory and rsync all "avi" files it finds to our machine
in the /download directory.

``` {.bash}
rsync -avR foo@somemachine:'`find /data/video -name "*.[avi]"`' /download/
```

Pull data from a remote machine to local server using ssh
=========================================================

The following command will pull the data from "remote_machine" in
/stuff/data/ and place it on the local system in
/BACKUP/remote_machine/. The arguments "-avx" will set archive mode
(-a) equivalent to -rlptgoD, be verbose (-v) and will not cross file
system boundaries (-x) like NFS or samba. The timeout command makes sure
rsync will not hang if the remote system is unreachable after 30
seconds. We will be deleting any files on the target directory
(/BACKUP/remote_machine/) that are \_not\_ found in the source directory
(data/). If you do not want to allow rsync to delete any files then take
out "\--delete-excluded".

The directory structure of the target machine will look like
/BACKUP/remote_machine/data/ and this is considered a non-relative path
option. Notice /stuff/ is not in the path.

``` {.bash}
rsync -avx --timeout=30 --delete-excluded backupuser@remote_machine:/stuff/data/
/BACKUP/remote_machine/
```

If you wanted the target directory structure to be relative you can add
the argument "-R". The directory structure would then look like
/BACKUP/remote_machine/stuff/data/ as the sync path name starts / on the
source machine. The command with "-R" added looks like:

``` {.bash}
rsync -Ravx --timeout=30 --delete-excluded backupuser@remote_machine:/stuff/data/
/BACKUP/remote_machine/
```

Incremental backups using rsync
===============================

The following example will make an incremental backup of the directory
/data/working/ and put a copy of any file that changes into a dated
directory in /BACKUP/ . This can be used to keep a daily backup tree of
any changed files and not have to overwrite the previous days files.
Note that this method does need to copy the entire file if it changes as
the new files are made in the directory named under current day.

``` {.bash}
rsync --backup --backup-dir=`date +%Y.%m.%d` -a /data/working/ /BACKUP/
```

If you have a file under /BACKUP/ called file1 and that file has changed
on the source machine in /data/working/ then a new directory will be
made. The incremental dir would be named `date +%Y.%m.%d` or the
numerical values for YEAR.MONTH.DAY and put under /BACKUP/. The changed
data "file1" would be put under that directory.

What should I be careful with when using Rsync?
===============================================

1.  Be careful with the \--delete command. If your using a source dir
    that is not mounted (nfs,cifs,etc) but the mount for the dir is
    still there then you will sync your blank dir. All remote files will
    be deleted.
2.  Be careful with slashes after the dir names on the source. A slash
    after the dir name compared to no slash after the dir name will do 2
    totally different things.
3.  Running out of memory with the older version of Rsync when doing a
    huge amount of files. Use the newer version due to its ability to do
    incremental file lists.
