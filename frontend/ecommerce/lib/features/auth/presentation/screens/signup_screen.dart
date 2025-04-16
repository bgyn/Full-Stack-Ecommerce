import 'package:ecommerce/core/extension/extension.dart';
import 'package:ecommerce/core/widgets/primary_button.dart';
import 'package:ecommerce/features/auth/presentation/widgets/auth_text_field.dart';
import 'package:flutter/material.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formkey = GlobalKey<FormState>();

  @override
  void dispose() {
    super.dispose();
    _nameController.dispose();
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
                Text(
                  "Sign up",
                  style: Theme.of(context).textTheme.headlineLarge,
                ),
                SizedBox(height: 0.08.h(context)),
                //Name
                AuthTextField(
                  controller: _nameController,
                  isPasswordField: false,
                  label: "Name",
                  textInputType: TextInputType.name,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Please enter your name";
                    }
                    if (value.length < 3) {
                      return "Please enter a valid names";
                    }
                    return null;
                  },
                ),
                SizedBox(height: 0.01.h(context)),
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
                      "Already have an account?",
                      style: Theme.of(context).textTheme.labelLarge,
                    ),
                  ),
                ),
                //singnup button
                SizedBox(height: 0.04.h(context)),
                PrimaryButton(
                  title: "Sign up",
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
