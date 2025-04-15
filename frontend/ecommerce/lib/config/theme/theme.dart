import 'package:flutter/material.dart';

class ColorPallete {
  const ColorPallete();
  static const Color primaryColor = Color(0xFFDB3022);
  static const Color scaffoldColor = Color(0xFFF9F9F9);
}

ThemeData getThemeData(BuildContext context) {
  return ThemeData(
    useMaterial3: true,
    fontFamily: 'Metropolis',
    primaryColor: ColorPallete.primaryColor,
    scaffoldBackgroundColor: ColorPallete.scaffoldColor,
    textTheme: const TextTheme(
      displayLarge: TextStyle(fontWeight: FontWeight.w700), // Bold
      displayMedium: TextStyle(fontWeight: FontWeight.w600), // Semi-bold
      displaySmall: TextStyle(fontWeight: FontWeight.w500), // Medium

      headlineLarge: TextStyle(fontWeight: FontWeight.w600), // Semi-bold
      headlineMedium: TextStyle(fontWeight: FontWeight.w500), // Medium
      headlineSmall: TextStyle(fontWeight: FontWeight.w400), // Regular

      titleLarge: TextStyle(fontWeight: FontWeight.w600), // Semi-bold
      titleMedium: TextStyle(fontWeight: FontWeight.w500), // Medium
      titleSmall: TextStyle(fontWeight: FontWeight.w400), // Regular

      bodyLarge: TextStyle(fontWeight: FontWeight.w400), // Regular
      bodyMedium: TextStyle(fontWeight: FontWeight.w300), // Thin
      bodySmall: TextStyle(fontWeight: FontWeight.w300), // Thin

      labelLarge: TextStyle(fontWeight: FontWeight.w500), // Medium
      labelMedium: TextStyle(fontWeight: FontWeight.w400), // Regular
      labelSmall: TextStyle(fontWeight: FontWeight.w300), // Thin
    ),
  );
}
