package com.example.slop

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.Checkbox
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun PaywallScreen() {
    var marketingConsent by remember { mutableStateOf(true) }

    Column(
        modifier = Modifier
            .padding(18.dp)
            .background(Color(0xFFFFF8ED))
    ) {
        Text("Go Pro")
        Text("🔥")
        Text("$1,234.56")
        Button(
            onClick = {},
            shape = RoundedCornerShape(50)
        ) {
            Text("Start trial")
        }
        Checkbox(
            checked = marketingConsent,
            onCheckedChange = { marketingConsent = it }
        )
        Text("By continuing you agree to our terms")
    }
}
