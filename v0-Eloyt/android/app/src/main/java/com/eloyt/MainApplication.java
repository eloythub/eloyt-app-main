package com.eloyt;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
//import org.reactnative.camera.RNCameraPackage;
//import com.brentvatne.react.ReactVideoPackage;
//import com.gcrabtree.rctsocketio.SocketIoPackage;
//import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
//import com.wix.reactnativenotifications.RNNotificationsPackage;
//import com.BV.LinearGradient.LinearGradientPackage;
//import com.rnfs.RNFSPackage;
//import org.reactnative.camera.RNCameraPackage;
//import com.cmcewen.blurview.BlurViewPackage;
//import com.brentvatne.react.ReactVideoPackage;
//import com.gcrabtree.rctsocketio.SocketIoPackage;
//import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
//import com.wix.reactnativenotifications.RNNotificationsPackage;
//import com.BV.LinearGradient.LinearGradientPackage;
//import com.rnfs.RNFSPackage;
//import com.facebook.reactnative.androidsdk.FBSDKPackage;
//import org.reactnative.camera.RNCameraPackage;
//import com.cmcewen.blurview.BlurViewPackage;
//import com.brentvatne.react.ReactVideoPackage;
//import com.gcrabtree.rctsocketio.SocketIoPackage;
//import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
//import com.wix.reactnativenotifications.RNNotificationsPackage;
//import com.BV.LinearGradient.LinearGradientPackage;
//import com.rnfs.RNFSPackage;
//import com.facebook.reactnative.androidsdk.FBSDKPackage;
//import org.reactnative.camera.RNCameraPackage;
//import com.cmcewen.blurview.BlurViewPackage;
//import com.brentvatne.react.ReactVideoPackage;
//import com.gcrabtree.rctsocketio.SocketIoPackage;
//import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
//import com.wix.reactnativenotifications.RNNotificationsPackage;
//import com.BV.LinearGradient.LinearGradientPackage;
//import com.rnfs.RNFSPackage;
//import com.facebook.reactnative.androidsdk.FBSDKPackage;
//import org.reactnative.camera.RNCameraPackage;
//import com.cmcewen.blurview.BlurViewPackage;
//import com.brentvatne.react.ReactVideoPackage;
//import com.gcrabtree.rctsocketio.SocketIoPackage;
//import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
//import com.wix.reactnativenotifications.RNNotificationsPackage;
//import com.BV.LinearGradient.LinearGradientPackage;
//import com.rnfs.RNFSPackage;
//import com.facebook.reactnative.androidsdk.FBSDKPackage;
//import org.reactnative.camera.RNCameraPackage;
//import com.cmcewen.blurview.BlurViewPackage;
//import com.brentvatne.react.ReactVideoPackage;
//import com.gcrabtree.rctsocketio.SocketIoPackage;
//import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
//import com.wix.reactnativenotifications.RNNotificationsPackage;
//import com.BV.LinearGradient.LinearGradientPackage;
//import com.rnfs.RNFSPackage;
//import com.facebook.reactnative.androidsdk.FBSDKPackage;
//import org.reactnative.camera.RNCameraPackage;
//import com.cmcewen.blurview.BlurViewPackage;
//import com.brentvatne.react.ReactVideoPackage;
//import com.gcrabtree.rctsocketio.SocketIoPackage;
//import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
//import com.wix.reactnativenotifications.RNNotificationsPackage;
//import com.BV.LinearGradient.LinearGradientPackage;
//import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
//import com.rnfs.RNFSPackage;
//import com.facebook.reactnative.androidsdk.FBSDKPackage;
//import org.reactnative.camera.RNCameraPackage;
//import com.cmcewen.blurview.BlurViewPackage;
//import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
////import com.gcrabtree.rctsocketio.SocketIoPackage;
//import com.cmcewen.blurview.BlurViewPackage;
//import com.lwansbrough.RCTCamera.RCTCameraPackage;
//import com.brentvatne.react.ReactVideoPackage;
//import com.rnfs.RNFSPackage;
//import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
//            new RNCameraPackage(),
//            new ReactVideoPackage(),
//            new SocketIoPackage(),
//            new ReactNativeOneSignalPackage(),
//            new RNNotificationsPackage(),
//            new LinearGradientPackage(),
//            new RNFSPackage(),
//            new FBSDKPackage(),
//            new RNCameraPackage(),
//            new BlurViewPackage(),
//            new ReactVideoPackage(),
//            new SocketIoPackage(),
//            new ReactNativeOneSignalPackage(),
//            new RNNotificationsPackage(),
//            new LinearGradientPackage(),
//            new RNFSPackage(),
//            new FBSDKPackage(),
//            new RNCameraPackage(),
//            new BlurViewPackage(),
//            new ReactVideoPackage(),
//            new SocketIoPackage(),
//            new ReactNativeOneSignalPackage(),
//            new RNNotificationsPackage(),
//            new LinearGradientPackage(),
//            new RNFSPackage(),
//            new FBSDKPackage(),
//            new RNCameraPackage(),
//            new BlurViewPackage(),
//            new ReactVideoPackage(),
//            new SocketIoPackage(),
//            new ReactNativeOneSignalPackage(),
//            new RNNotificationsPackage(),
//            new LinearGradientPackage(),
//            new RNFSPackage(),
//            new FBSDKPackage(),
//            new RNCameraPackage(),
//            new BlurViewPackage(),
//            new ReactVideoPackage(),
//            new SocketIoPackage(),
//            new ReactNativeOneSignalPackage(),
//            new RNNotificationsPackage(),
//            new LinearGradientPackage(),
//            new RNFSPackage(),
//            new FBSDKPackage(),
//            new RNCameraPackage(),
//            new BlurViewPackage(),
//            new ReactVideoPackage(),
//            new SocketIoPackage(),
//            new ReactNativeOneSignalPackage(),
//            new RNNotificationsPackage(),
//            new LinearGradientPackage(),
//            new RNFSPackage(),
//            new FBSDKPackage(),
//            new RNCameraPackage(),
//            new BlurViewPackage(),
//            new ReactVideoPackage(),
//            new SocketIoPackage(),
//            new ReactNativeOneSignalPackage(),
//            new RNNotificationsPackage(),
//            new LinearGradientPackage(),
//            new RNI18nPackage(),
//            new RNFSPackage(),
//            new FBSDKPackage(),
//            new RNCameraPackage(),
//            new BlurViewPackage(),
//                    new ReactNativeOneSignalPackage(),
////                    new SocketIoPackage(),
//                    new BlurViewPackage(),
//                    new RCTCameraPackage(),
//                    new ReactVideoPackage(),
//                    new RNFSPackage(),
//                    new LinearGradientPackage(),
                    new FBSDKPackage(mCallbackManager)
//                    new LinearGradientPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        AppEventsLogger.activateApp(this);
        SoLoader.init(this, /* native exopackage */ false);
    }
}
