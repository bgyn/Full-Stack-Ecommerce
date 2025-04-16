import 'package:ecommerce/config/router/app_router.dart';
import 'package:ecommerce/config/theme/theme.dart';
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
    return MaterialApp.router(
      title: 'Ecommerce',
      theme: getThemeData(context),
      routerConfig: routerConfig,
      // routeInformationParser: routerConfig.routeInformationParser,
      // routerDelegate: routerConfig.routerDelegate,
    );
  }
}
