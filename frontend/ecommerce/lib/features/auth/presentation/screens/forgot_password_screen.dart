import 'package:ecommerce/core/extension/extension.dart';
import 'package:ecommerce/core/widgets/primary_button.dart';
import 'package:ecommerce/features/auth/presentation/widgets/auth_text_field.dart';
import 'package:flutter/material.dart';

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
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
                Text(
                  "Forgot Password",
                  style: Theme.of(context).textTheme.headlineLarge,
                ),
                SizedBox(height: 0.08.h(context)),
                //Email
                Text(
                  "Please, enter your email address. You will receive a link to create a new password via email.",
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                SizedBox(height: 0.01.h(context)),
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

                //singnup button
                SizedBox(height: 0.04.h(context)),
                PrimaryButton(
                  title: "Send",
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
