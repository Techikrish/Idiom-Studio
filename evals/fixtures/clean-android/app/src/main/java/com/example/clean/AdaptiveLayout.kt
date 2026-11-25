package com.example.clean

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.material3.adaptive.currentWindowAdaptiveInfo
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.window.core.layout.WindowWidthSizeClass

@Composable
fun AdaptiveLayout() {
    val windowSizeClass = currentWindowAdaptiveInfo().windowSizeClass
    val expanded = windowSizeClass.windowWidthSizeClass == WindowWidthSizeClass.EXPANDED

    Row(Modifier.padding(16.dp)) {
        if (expanded) {
            Text("List")
            Text("Detail")
        } else {
            Text("List")
        }
    }
}
