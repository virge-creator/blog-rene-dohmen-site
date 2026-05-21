---
title: 'Moving a phpBB to another domain'
date: '2012-02-29 21:51'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","database","tutorial"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

This small guide explains the actions and steps to move a phpBB (php
based forum software) to another domain with all setting and boards
intact.

Most of the steps are described very detailed at
<http://www.phpbb.com/kb/article/transferring-your-board-to-a-new-host-or-domain/>

**Step 1**

Make sure de domain force settings are disabled: Visit your old board's
Administration Control Panel. On the General tab, select the Server
settings link on the left-hand side of the page. Ensure Force server URL
settings is set to NO.

![1.png](/images/posts/moving-a-phpbb-to-another-domain/1.png)

Then disable the forum for the moment, to make sure that no new posts
etc are done while transferring the stuff to the new domain: Select the
Board settings link on the left-hand side of the page. Ensure Disable
board is set toYES.

![2.png](/images/posts/moving-a-phpbb-to-another-domain/2.png)

**Step 2**

Download the complete forum from the old host to a temporary folder.
Then upload the temporary folder to the new location. A couple of
folders should have write access: store, files, cache and
images/avatars/upload/

**Step 3**

Download the mysql database from the old forum and upload it to the new
host.

**Step 4**

Rebuilding the conf file: in this case it's simple just use the old
config file and change DB settings to the new DB settings provided by
your hosting company and upload it to the new host.

**Step 5**

If you are lucky you can now login to the forum on the new host. Try to
login as administrator and go to the ACP. If this works, consider
yourself lucky :-) After some celebration navigate to Cookie setting in
the General tab. Make sure that the Cookie domain is set to your domain.
Then everything should work. If you run in to troubles with the cookie
method you can find more info here:
<http://www.phpbb.com/kb/article/fixing-incorrect-cookie-settings/>

**Step 6**

enable your forum again

That's it; your forum should be up and running on the new location now.
