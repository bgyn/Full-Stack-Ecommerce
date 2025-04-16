import 'package:ecommerce/config/theme/theme.dart';
import 'package:flutter/material.dart';

class PrimaryButton extends StatelessWidget {
  final String title;
  final VoidCallback? onTap;
  final Color? backgroundColor;
  const PrimaryButton({
    super.key,
    required this.title,
    this.onTap,
    this.backgroundColor = ColorPallete.primaryColor,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: backgroundColor,
          borderRadius: BorderRadius.circular(30),
        ),
        padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 24),
        child: Center(
          child: Text(
            title.toUpperCase(),
            style: Theme.of(
              context,
            ).textTheme.labelLarge?.copyWith(fontSize: 14, color: Colors.white),
          ),
        ),
      ),
    );
  }
}
