import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

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
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Sharp coastal foundation',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 12),
              const Text(
                'Web and mobile share Supabase-backed services and glassy styling primitives.',
              ),
              const SizedBox(height: 24),
              FilledButton(
                onPressed: () => context.go('/about'),
                child: const Text('About FindVee'),
              ),
              const SizedBox(height: 12),
              OutlinedButton(
                onPressed: () => context.go('/login'),
                child: const Text('Login placeholder'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
