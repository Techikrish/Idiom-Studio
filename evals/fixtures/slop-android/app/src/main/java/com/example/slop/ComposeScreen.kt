package com.example.slop

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ComposeScreen() {
    Column(Modifier.padding(24.dp)) {
        OutlinedTextField(value = "", onValueChange = {})
        Button(onClick = { post() }) {
            Text("Post")
        }
    }
}
