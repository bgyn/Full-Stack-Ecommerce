import 'package:ecommerce/core/extension/extension.dart';
import 'package:ecommerce/core/widgets/primary_button.dart';
import 'package:ecommerce/features/auth/presentation/widgets/auth_text_field.dart';
import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formkey = GlobalKey<FormState>();

  @override
  void dispose() {
    super.dispose();
    _emailController.dispose();
    _passwordController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Form(
          key: _formkey,
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("Login", style: Theme.of(context).textTheme.headlineLarge),
                SizedBox(height: 0.08.h(context)),
                //Email
                AuthTextField(
                  controller: _emailController,
                  isPasswordField: false,
                  label: "Email",
                  textInputType: TextInputType.emailAddress,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Please enter your email";
                    }
                    // Regular expression for validating email
                    final emailRegex = RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$');
                    if (!emailRegex.hasMatch(value)) {
                      return "Please enter a valid email address";
                    }
                    return null;
                  },
                ),
                SizedBox(height: 0.01.h(context)),
                //Password
                AuthTextField(
                  controller: _passwordController,
                  isPasswordField: true,
                  label: "Password",
                  textInputType: TextInputType.visiblePassword,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Please enter your password";
                    }
                    if (value.length < 8) {
                      return "Password must be at least 8 characters long";
                    }
                    final passwordRegex = RegExp(
                      r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$',
                    );
                    if (!passwordRegex.hasMatch(value)) {
                      return "Password must include uppercase, lowercase, number, and special character";
                    }
                    return null;
                  },
                ),
                SizedBox(height: 0.01.h(context)),
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () {},
                    child: Text(
                      "Forgot your password?",
                      style: Theme.of(context).textTheme.labelLarge,
                    ),
                  ),
                ),
                //singnup button
                SizedBox(height: 0.04.h(context)),
                PrimaryButton(
                  title: "Login",
                  onTap: () {
                    if (_formkey.currentState!.validate()) {
                    } else {}
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
