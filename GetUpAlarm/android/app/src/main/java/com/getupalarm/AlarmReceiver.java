package com.getupalarm;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.icu.util.Calendar;

import com.baekgol.reactnativealarmmanager.util.AlarmService;

public class AlarmReceiver extends BroadcastReceiver {
    private AlarmManager alarmManager;

    @Override
    public void onReceive(Context context, Intent intent) {
        alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

        Intent alarmServiceIntent = new Intent(context, AlarmService.class);
        alarmServiceIntent.putExtra("id", intent.getIntExtra("id", 0));
        alarmServiceIntent.putExtra("hour", intent.getIntExtra("hour", 0));
        alarmServiceIntent.putExtra("minute", intent.getIntExtra("minute", 0));
        alarmServiceIntent.putExtra("title", intent.getStringExtra("title"));
        alarmServiceIntent.putExtra("text", intent.getStringExtra("text"));
        alarmServiceIntent.putExtra("sound", intent.getStringExtra("sound"));
        alarmServiceIntent.putExtra("icon", intent.getStringExtra("icon"));
        alarmServiceIntent.putExtra("soundLoop", intent.getBooleanExtra("soundLoop", true));
        alarmServiceIntent.putExtra("vibration", intent.getBooleanExtra("vibration", true));
        alarmServiceIntent.putExtra("notiRemovable", intent.getBooleanExtra("notiRemovable", true));

        context.startForegroundService(alarmServiceIntent);
        scheduleNextAlarm(context, intent);
    }

    private void scheduleNextAlarm(Context context, Intent intent) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(System.currentTimeMillis() + (1000*60*60*24));
        calendar.set(Calendar.HOUR_OF_DAY, intent.getIntExtra("hour", 1));
        calendar.set(Calendar.MINUTE, intent.getIntExtra("minute", 1));
        calendar.set(Calendar.SECOND, 0);

        PendingIntent alarmPendingIntent = PendingIntent.getBroadcast(context, intent.getIntExtra("id", 0), intent, PendingIntent.FLAG_NO_CREATE);
        alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), alarmPendingIntent);
    }
}