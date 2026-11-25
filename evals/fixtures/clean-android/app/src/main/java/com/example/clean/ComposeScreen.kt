package com.example.clean

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ComposeScreen() {
    Column(
        modifier = Modifier
            .imePadding()
            .padding(24.dp)
    ) {
        OutlinedTextField(
            value = "",
            onValueChange = {},
            label = { Text("Message") }
        )
        Button(onClick = { send() }) {
            Text("Send")
        }
    }
}
