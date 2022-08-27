package com.getupalarm; // replace com.your-app-name with your app’s name

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import android.icu.util.Calendar;


public class AlarmModuleTest extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactContext;
    private NotificationManager notificationManager;
    private AlarmManager alarmManager;
    private final String channelId = "alarm";

    AlarmModuleTest(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        alarmManager = (AlarmManager) reactContext.getSystemService(Context.ALARM_SERVICE);
        createNotificationChannel();
    }

    private void createNotificationChannel(){
        if(Build.VERSION.SDK_INT>=Build.VERSION_CODES.O){
            notificationManager = reactContext.getSystemService(NotificationManager.class);

            NotificationChannel channel = new NotificationChannel(channelId, "Alarm", NotificationManager.IMPORTANCE_HIGH);
            channel.setDescription("Alarm");
            channel.setSound(null, null);
            notificationManager.createNotificationChannel(channel);
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "AlarmModuleTest";
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void createAlarmTest() {
        Intent intent = new Intent(reactContext, AlarmReceiver.class);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(reactContext, 1, intent, 0);
        Calendar time = Calendar.getInstance();
        time.setTimeInMillis(System.currentTimeMillis());
        time.add(Calendar.SECOND, 30);
        alarmManager.set(AlarmManager.RTC_WAKEUP, time.getTimeInMillis(), pendingIntent);
        Log.d("##AlarmModuleTest", "ALARM: " + 30
                + " set to go off at: " + time.toString());

    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void createAlarmEvent(String name, Double epoch) {
        long time = epoch.longValue();
        Intent alarmIntent = new Intent(reactContext, AlarmReceiver.class);
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(time);
        calendar.set(Calendar.SECOND, 0);

        int id = name.hashCode();

        alarmIntent.putExtra("id", id);
        alarmIntent.putExtra("hour", calendar.get(Calendar.HOUR));
        alarmIntent.putExtra("minute", calendar.get(Calendar.MINUTE));
        alarmIntent.putExtra("title", name);
        // alarmIntent.putExtra("text", name);
        // alarmIntent.putExtra("sound", alarm.getAlarmSound());
        // alarmIntent.putExtra("icon", alarm.getAlarmIcon());
        alarmIntent.putExtra("soundLoop", true);
        alarmIntent.putExtra("vibration", true);
        alarmIntent.putExtra("notiRemovable", false);

        System.out.println(calendar.toString());
        Log.d("##AlarmModuleTest", "ALARM: " + id
                + " set to go off at: " + calendar.toString());

        PendingIntent alarmPendingIntent = PendingIntent.getBroadcast(reactContext, id, alarmIntent, PendingIntent.FLAG_CANCEL_CURRENT);
        alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), alarmPendingIntent);
    }

}