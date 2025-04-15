import 'package:flutter/material.dart';

class AuthTextField extends StatefulWidget {
  final String label;
  final bool isPasswordField;
  final TextEditingController controller;
  final TextInputType textInputType;
  final String? Function(String?)? validator;

  const AuthTextField({
    super.key,
    required this.controller,
    required this.isPasswordField,
    required this.label,
    required this.textInputType,
    this.validator,
  });

  @override
  State<AuthTextField> createState() => _AuthTextFieldState();
}

class _AuthTextFieldState extends State<AuthTextField> {
  bool isValid = false;
  bool isActive = false;
  late FocusNode _focusNode;

  @override
  void initState() {
    super.initState();
    _focusNode = FocusNode();
    _focusNode.addListener(() {
      setState(() {
        if (!_focusNode.hasFocus && widget.controller.text.trim().isEmpty) {
          isActive = false;
        }
      });
    });
  }

  @override
  void dispose() {
    _focusNode.dispose();
    super.dispose();
  }

  void _validateText(String value) {
    if (widget.validator != null) {
      final validationResult = widget.validator!(value);
      setState(() {
        isValid = validationResult == null;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Stack(
        children: [
          TextFormField(
            onTap: () {
              setState(() {
                isActive = true;
              });
            },
            focusNode: _focusNode,
            controller: widget.controller,
            keyboardType: widget.textInputType,
            obscureText: widget.isPasswordField,
            validator: widget.validator,
            onChanged: _validateText,
            autovalidateMode: AutovalidateMode.onUserInteraction,
            style: Theme.of(
              context,
            ).textTheme.labelLarge?.copyWith(fontSize: 14),

            decoration: InputDecoration(
              fillColor: Colors.white,
              filled: true,
              labelText: widget.label,
              labelStyle: Theme.of(context).textTheme.labelMedium?.copyWith(
                fontSize: 14,
                fontWeight: FontWeight.w500,
                color: const Color(0xFF9B9B9B),
              ),
              errorStyle: Theme.of(context).textTheme.labelMedium?.copyWith(
                fontSize: 14,
                color: Colors.red,
              ),
              floatingLabelBehavior: FloatingLabelBehavior.never,
              contentPadding: const EdgeInsets.only(
                left: 20,
                right: 20,
                top: 23,
                bottom: 23,
              ),
              border: const OutlineInputBorder(borderSide: BorderSide.none),
              enabledBorder: const OutlineInputBorder(
                borderSide: BorderSide.none,
              ),
              focusedBorder: const OutlineInputBorder(
                borderSide: BorderSide.none,
              ),
              errorBorder: const OutlineInputBorder(
                borderSide: BorderSide(color: Colors.red),
              ),
              focusedErrorBorder: const OutlineInputBorder(
                borderSide: BorderSide(color: Colors.red),
              ),
              suffixIcon:
                  isValid
                      ? const Icon(Icons.check, color: Colors.green)
                      : null, // Add a check icon
            ),
          ),
          !isActive
              ? const SizedBox.shrink()
              : Positioned(
                top: 5,
                child: Padding(
                  padding: const EdgeInsets.only(left: 20),
                  child: Text(
                    widget.label,
                    style: Theme.of(context).textTheme.labelSmall?.copyWith(
                      fontSize: 11,
                      fontWeight: FontWeight.w500,
                      color: const Color(0xFF9B9B9B),
                    ),
                  ),
                ),
              ),
        ],
      ),
    );
  }
}
