package com.example.slop

import android.content.pm.ActivityInfo
import android.graphics.Color
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
        window.statusBarColor = Color.BLACK
        setContent {
            AppTheme {
                AppNav()
            }
        }
    }

    override fun onBackPressed() {
        super.onBackPressed()
    }
}
