/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <FBSDKCoreKit/FBSDKCoreKit.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <AVFoundation/AVFoundation.h>

#import "HubInfo.h"

#import "RNNotifications.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // FACEBOOK SDK
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  
  // AUDIO SESSION
  [[AVAudioSession sharedInstance] setCategory: AVAudioSessionCategoryAmbient
                                   withOptions: AVAudioSessionCategoryOptionMixWithOthers
                                         error:nil];
  
  [[AVAudioSession sharedInstance] setActive: YES
                                       error: nil];

  // REACT NATIVE
  NSURL *jsCodeLocation;
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Eloyt"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  
  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                openURL:url
                                                      sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                                             annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
                  ];
  // Add any custom logic here.
  return handled;
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}

// Required to register for notifications
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  [RNNotifications didRegisterUserNotificationSettings:notificationSettings];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *) deviceToken {
  // SETUP MICROSOFT AZURE
//  SBNotificationHub* hub = [[SBNotificationHub alloc] initWithConnectionString:HUBLISTENACCESS
//                                                           notificationHubPath:HUBNAME];
//
//  NSString * deviceTokenString = [[[[deviceToken description]
//                                    stringByReplacingOccurrencesOfString: @"<" withString: @""]
//                                   stringByReplacingOccurrencesOfString: @">" withString: @""]
//                                  stringByReplacingOccurrencesOfString: @" " withString: @""];
//
//  NSMutableArray* tagArray = [[NSMutableArray alloc] init];
//
//  [tagArray addObject:@"apple_apn"];
//  [tagArray addObject:deviceTokenString];
//
//  NSSet* tagSet = [[NSSet alloc] initWithArray:tagArray];
//
//  [hub registerNativeWithDeviceToken:deviceToken tags:tagSet completion:^(NSError* error) {
//    if (error != nil) {
//      NSLog(@"Error registering for notifications: %@", error);
//    }
//    else {
//      [RNNotifications didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
//    }
//  }];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  NSLog(@"didFailToRegisterForRemoteNotificationsWithError: %@", error);
  [RNNotifications didFailToRegisterForRemoteNotificationsWithError:error];
}

// Required for the notification event.
- (void)application:(UIApplication *)application didReceiveRemoteNotification: (NSDictionary *)userInfo {
  NSLog(@"didReceiveRemoteNotification: %@", userInfo);
  [RNNotifications didReceiveRemoteNotification:userInfo];
}

// Required for the localNotification event.
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  NSLog(@"didReceiveLocalNotification: %@", notification);
  [RNNotifications didReceiveLocalNotification:notification];
}

// Required for the notification actions.
- (void)application:(UIApplication *)application handleActionWithIdentifier:(NSString *)identifier forLocalNotification:(UILocalNotification *)notification withResponseInfo:(NSDictionary *)responseInfo completionHandler:(void (^)())completionHandler
{
  NSLog(@"handleActionWithIdentifier => forLocalNotification");
  
  [RNNotifications handleActionWithIdentifier:identifier forLocalNotification:notification withResponseInfo:responseInfo completionHandler:completionHandler];
}

- (void)application:(UIApplication *)application handleActionWithIdentifier:(NSString *)identifier forRemoteNotification:(NSDictionary *)userInfo withResponseInfo:(NSDictionary *)responseInfo completionHandler:(void (^)())completionHandler
{
  NSLog(@"handleActionWithIdentifier => forRemoteNotification");
  
  [RNNotifications handleActionWithIdentifier:identifier forRemoteNotification:userInfo withResponseInfo:responseInfo completionHandler:completionHandler];
}

@end
