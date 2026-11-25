package com.example.clean

import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ListItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Modifier

@Composable
fun FeedScreen(viewModel: FeedViewModel) {
    val uiState by viewModel.uiState.collectAsState()

    when (val state = uiState) {
        is FeedUiState.Loading -> CircularProgressIndicator()
        is FeedUiState.Empty -> Text("Nothing here yet")
        is FeedUiState.Error -> Text(state.message)
        is FeedUiState.Content -> LazyColumn {
            items(state.items, key = { it.id }) { item ->
                ListItem(
                    headlineContent = { Text(item.title) },
                    supportingContent = { Text(item.subtitle) }
                )
            }
        }
    }
}
