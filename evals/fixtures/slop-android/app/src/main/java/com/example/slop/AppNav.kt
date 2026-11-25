package com.example.slop

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Bookmark
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.MoreHoriz
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue

@Composable
fun AppNav(onSelect: (Int) -> Unit = {}) {
    var selected by remember { mutableIntStateOf(0) }

    NavigationBar {
        NavigationBarItem(
            selected = selected == 0,
            onClick = { selected = 0; onSelect(0) },
            icon = { Icon(Icons.Default.Home, contentDescription = null) },
            label = { Text("Home") }
        )
        NavigationBarItem(
            selected = selected == 1,
            onClick = { selected = 1; onSelect(1) },
            icon = { Icon(Icons.Default.Search, contentDescription = null) },
            label = { Text("Search") }
        )
        NavigationBarItem(
            selected = selected == 2,
            onClick = { selected = 2; onSelect(2) },
            icon = { Icon(Icons.Default.Bookmark, contentDescription = null) },
            label = { Text("Saved") }
        )
        NavigationBarItem(
            selected = selected == 3,
            onClick = { selected = 3; onSelect(3) },
            icon = { Icon(Icons.Default.Email, contentDescription = null) },
            label = { Text("Inbox") }
        )
        NavigationBarItem(
            selected = selected == 4,
            onClick = { selected = 4; onSelect(4) },
            icon = { Icon(Icons.Default.Person, contentDescription = null) },
            label = { Text("Profile") }
        )
        NavigationBarItem(
            selected = selected == 5,
            onClick = { selected = 5; onSelect(5) },
            icon = { Icon(Icons.Default.MoreHoriz, contentDescription = null) },
            label = { Text("More") }
        )
    }
}
