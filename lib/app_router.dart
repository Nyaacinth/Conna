import 'package:go_router/go_router.dart';

import 'views/splash.dart';

final appRouter = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const Splash(),
    ),
  ],
);
