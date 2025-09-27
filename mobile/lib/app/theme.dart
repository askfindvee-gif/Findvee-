import 'package:flutter/material.dart';

ThemeData buildAppTheme() {
  const surface = Color(0xFF0B1016);
  const overlay = Color(0xFF111823);
  const accent = Color(0xFF7DD3FC);

  final colorScheme = ColorScheme.dark(
    primary: accent,
    secondary: const Color(0xFF38BDF8),
    surface: surface,
    background: surface,
    onPrimary: Colors.black,
    onSurface: Colors.white,
    onBackground: Colors.white,
  );

  return ThemeData(
    useMaterial3: true,
    colorScheme: colorScheme,
    scaffoldBackgroundColor: surface,
    fontFamily: 'Roboto',
    appBarTheme: const AppBarTheme(
      backgroundColor: overlay,
      foregroundColor: Colors.white,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: TextStyle(fontSize: 14, letterSpacing: 4, fontWeight: FontWeight.w600),
    ),
    textTheme: const TextTheme(
      bodyLarge: TextStyle(letterSpacing: 0.2),
      bodyMedium: TextStyle(letterSpacing: 0.2),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ButtonStyle(
        shape: const MaterialStatePropertyAll(RoundedRectangleBorder(borderRadius: BorderRadius.zero)),
        backgroundColor: MaterialStatePropertyAll(accent),
        foregroundColor: const MaterialStatePropertyAll(Colors.black),
        padding: const MaterialStatePropertyAll(EdgeInsets.symmetric(horizontal: 28, vertical: 16)),
      ),
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: ButtonStyle(
        shape: const MaterialStatePropertyAll(RoundedRectangleBorder(borderRadius: BorderRadius.zero)),
        backgroundColor: MaterialStatePropertyAll(accent),
        foregroundColor: const MaterialStatePropertyAll(Colors.black),
        padding: const MaterialStatePropertyAll(EdgeInsets.symmetric(horizontal: 28, vertical: 16)),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: ButtonStyle(
        shape: const MaterialStatePropertyAll(RoundedRectangleBorder(borderRadius: BorderRadius.zero)),
        side: MaterialStatePropertyAll(BorderSide(color: accent.withOpacity(0.6))),
        foregroundColor: MaterialStatePropertyAll(accent),
        padding: const MaterialStatePropertyAll(EdgeInsets.symmetric(horizontal: 28, vertical: 16)),
      ),
    ),
    cardTheme: const CardTheme(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.zero),
    ),
  );
}
