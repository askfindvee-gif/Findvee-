import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import '../services/supabase_client.dart';
import 'router.dart';
import 'theme.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: 'assets/.env');
  await SupabaseService.init();
  runApp(const FindVeeApp());
}

class FindVeeApp extends StatelessWidget {
  const FindVeeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'FindVee',
      theme: buildAppTheme(),
      routerConfig: appRouter,
    );
  }
}
