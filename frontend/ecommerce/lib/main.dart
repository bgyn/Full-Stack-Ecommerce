import 'package:ecommerce/config/theme/theme.dart';
import 'package:ecommerce/features/auth/presentation/screens/forgot_password_screen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ecommerce',
      theme: getThemeData(context),
      home: const ForgotPasswordScreen(),
    );
  }
}
