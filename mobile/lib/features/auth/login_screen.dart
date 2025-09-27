import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

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
      body: Center(
        child: Container(
          width: 320,
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: const Color(0x1A1E2936),
            border: Border.all(color: const Color(0x332C3A4A)),
          ),
          child: const Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Login placeholder',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
              ),
              SizedBox(height: 12),
              Text('Connect Supabase authentication here when you are ready.'),
            ],
          ),
        ),
      ),
    );
  }
}
