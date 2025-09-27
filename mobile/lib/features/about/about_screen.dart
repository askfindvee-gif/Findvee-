import 'package:flutter/material.dart';

class AboutScreen extends StatelessWidget {
  const AboutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Image.asset('assets/logo.png', height: 28),
            const SizedBox(width: 8),
            const Text('FindVee'),
          ],
        ),
      ),
      body: const Center(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: Text(
            'FindVee brings coastal intelligence to every surface. This about page is a placeholder ready for custom content.',
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}
