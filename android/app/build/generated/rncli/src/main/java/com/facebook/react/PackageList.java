
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

import com.dopamine.BuildConfig;
import com.dopamine.R;

// react-native-audio
import com.rnim.rn.audio.ReactNativeAudioPackage;
// react-native-audio-record
import com.goodatlas.audiorecord.RNAudioRecordPackage;
// react-native-audio-recorder-player
import com.dooboolab.RNAudioRecorderPlayerPackage;
// react-native-audiowaveform
import com.otomogroove.OGReactNativeWaveform.OGWavePackage;
// react-native-permissions
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
// react-native-sound
import com.zmxv.RNSound.RNSoundPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  public PackageList(ReactNativeHost reactNativeHost) {
    this.reactNativeHost = reactNativeHost;
  }

  public PackageList(Application application) {
    this.reactNativeHost = null;
    this.application = application;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new ReactNativeAudioPackage(),
      new RNAudioRecordPackage(),
      new RNAudioRecorderPlayerPackage(),
      new OGWavePackage(),
      new RNPermissionsPackage(),
      new RNSoundPackage(),
      new VectorIconsPackage()
    ));
  }
}
