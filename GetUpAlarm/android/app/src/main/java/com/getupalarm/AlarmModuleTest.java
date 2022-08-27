package com.getupalarm; // replace com.your-app-name with your app’s name
import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

import android.app.AlarmManager;
import android.util.Log;


public class AlarmModuleTest extends ReactContextBaseJavaModule {
    AlarmModuleTest(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "AlarmModuleTest";
    }

    @ReactMethod
    public void createAlarmEvent(String name, String location) {
        Log.d("AlarmModuleTest", "Create event called with name: " + name
                + " and location: " + location);
    }
}