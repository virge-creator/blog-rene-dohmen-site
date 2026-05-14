---
title: 'Switching UIViews on Orientation change with an animation'
date: '2011-02-19 17:48'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

For our [Iscore Card
App](http://itunes.apple.com/us/app/iscore-cards/id398621803?mt=8) we
are working on an update which has card counting functionality for some
complex card games including "Klaverjassen".

We use the orientation in some UIViewControllers to show certain other
features for a specific game. In Klaverjas mode landscape orientation
will be used for totals after a couple of rounds. The nice thing is that
you get fancy animation from iOS while doing the orientation change.

This is the code I came up with after googling the web. And combining
some snippets I had elsewhere.

This what I did:

I originally had one viewController for the Klaverjas view, I added the
other one in Xcode, with .h and .xib files. In both .h files I added the
other viewController.h with an import.

One view is for portrait mode, the other for landscape; i created the
design for both views with Interface Builder.

First add code to both UIViewControllers indicating which one is used
for portrait and landscape orientation:

``` {.bash}
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    // Overriden to allow any orientation.
    //return YES;
    // portrait view controller
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    // Overriden to allow any orientation.
    //return YES;
    return (interfaceOrientation == UIInterfaceOrientationLandscapeRight) || (interfaceOrientation == UIDeviceOrientationLandscapeLeft);
}
```

After that, make sure you get the rotation events, and attach a callback
to it to do the view switching; It does some animation morphing the 2
screens. If you enable the *animated:TRUE* it will animate the change
nicely :-)

``` {.bash}
- (void)viewDidLoad {
    [super viewDidLoad];
    //get notification is orientation changes
    [[UIDevice currentDevice] beginGeneratingDeviceOrientationNotifications];
    NSNotificationCenter *notificationCenter = [NSNotificationCenter defaultCenter];
    [notificationCenter addObserver:self
                selector:@selector(didRotate:)
                name:UIDeviceOrientationDidChangeNotification
                object:nil];
    }
- (void)didRotate:(id)notification {
    NSLog(@"Switching to jassTotalsViewController");
    JassTotalsViewController *jassTotalsViewController = [[JassTotalsViewController alloc]init];
    jassTotalsViewController.modalTransitionStyle = UIModalTransitionStyleCrossDissolve;
    //[self dismissModalViewControllerAnimated:YES];
    [self presentModalViewController:jassTotalsViewController animated:TRUE];
    [jassTotalsViewController release];
}
```

Hier een screenshot van een early development versie:

Image: Screen-shot-2011-02-19-at-18.29.33-e1298137658348.png

Image: Screen-shot-2011-02-19-at-18.47.17-e1298138525230.png
