package com.example.slop

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun HomeScreen(viewModel: HomeViewModel) {
    val users by viewModel.users.collectAsState()

    Scaffold(
        topBar = {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Menu, contentDescription = null)
                Text("Home")
                Icon(Icons.Default.MoreVert, contentDescription = null)
            }
        },
        floatingActionButton = {
            FloatingActionButton(onClick = {}) {
                Icon(Icons.Default.Add, contentDescription = null)
            }
            FloatingActionButton(onClick = {}) {
                Icon(Icons.Default.Edit, contentDescription = null)
            }
        }
    ) { padding ->
        LazyColumn(contentPadding = padding) {
            items(users) { user ->
                Card(shape = RoundedCornerShape(50)) {
                    Column(Modifier.padding(13.dp)) {
                        Text(
                            text = user.name,
                            color = Color(0xFF2196F3),
                            fontSize = 14.sp
                        )
                        Text("🔥")
                        Row {
                            Button(
                                onClick = {},
                                shape = RoundedCornerShape(50)
                            ) {
                                Text("Follow")
                            }
                            Icon(
                                imageVector = Icons.Default.MoreVert,
                                contentDescription = null,
                                modifier = Modifier
                                    .size(40.dp)
                                    .clickable { }
                            )
                        }
                    }
                }
            }
        }
    }
}
