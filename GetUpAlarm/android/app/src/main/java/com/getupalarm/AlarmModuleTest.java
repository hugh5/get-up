package com.getupalarm; // replace com.your-app-name with your app’s name
import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;


public class AlarmModule extends ReactContextBaseJavaModule {
    AlarmModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "AlarmModule";
    }

    @ReactMethod
    public void createAlarmEvent(String name, String location) {
        Log.d("AlarmModule", "Create event called with name: " + name
                + " and location: " + location);
    }
}