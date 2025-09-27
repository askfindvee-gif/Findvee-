import 'package:go_router/go_router.dart';

import '../features/auth/login_screen.dart';
import '../features/home/home_screen.dart';
import '../features/about/about_screen.dart';

final appRouter = GoRouter(
  routes: [
    GoRoute(path: '/', builder: (_, __) => const HomeScreen()),
    GoRoute(path: '/about', builder: (_, __) => const AboutScreen()),
    GoRoute(path: '/login', builder: (_, __) => const LoginScreen()),
  ],
);
