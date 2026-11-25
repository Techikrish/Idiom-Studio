package com.example.clean

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val Background = Color(0xFFFAF8F3)
private val Surface = Color(0xFFFFFFFF)
private val TextPrimary = Color(0xFF1A1A18)
private val TextMuted = Color(0xFF5F5A52)
private val Accent = Color(0xFF8C2F1B)
private val OnAccent = Color(0xFFFFFFFF)

private val DarkColors = darkColorScheme(
    primary = OnAccent,
    background = Color(0xFF141412),
    onBackground = TextPrimary
)

private val LightColors = lightColorScheme(
    primary = Accent,
    onPrimary = OnAccent,
    background = Background,
    onBackground = TextPrimary,
    surface = Surface,
    onSurface = TextPrimary,
    onSurfaceVariant = TextMuted
)

@Composable
fun AppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = if (darkTheme) DarkColors else LightColors,
        typography = Typography,
        content = content
    )
}
