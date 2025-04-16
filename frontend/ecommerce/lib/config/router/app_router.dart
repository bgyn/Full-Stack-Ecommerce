import 'package:ecommerce/core/constant/app_route.dart';
import 'package:ecommerce/core/constant/storage_key.dart';
import 'package:ecommerce/core/utils/secure_storage.dart';
import 'package:ecommerce/features/auth/presentation/screens/forgot_password_screen.dart';
import 'package:ecommerce/features/auth/presentation/screens/login_screen.dart';
import 'package:ecommerce/features/auth/presentation/screens/signup_screen.dart';
import 'package:ecommerce/features/main/presentation/screens/main_screen.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

final _shellNavigatorKey = GlobalKey<NavigatorState>();

final routerConfig = GoRouter(
  redirect: (context, state) async {
    final isGoingToLogin = state.matchedLocation == AppRoute.login;
    final isGoingToSignup = state.matchedLocation == AppRoute.signup;
    final isGoingToForgotPassword =
        state.matchedLocation == AppRoute.forgotPassword;
    final isLoggedIn = await SecureStorage.read(StorageKey.accessToken);

    if (isGoingToLogin || isGoingToSignup || isGoingToForgotPassword) {
      return null;
    }

    if (isLoggedIn == null || isLoggedIn == "false") {
      return AppRoute.login;
    }
    return null;
  },
  routes: <RouteBase>[
    GoRoute(
      path: AppRoute.login,
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: AppRoute.signup,
      builder: (context, state) => const SignupScreen(),
    ),
    GoRoute(
      path: AppRoute.forgotPassword,
      builder: (context, state) => const ForgotPasswordScreen(),
    ),
    GoRoute(
      path: AppRoute.main,
      builder: (context, state) => const MainScreen(),
    ),
  ],
);
