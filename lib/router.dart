import 'package:conna/routes/index.dart';
import 'package:go_router/go_router.dart';

final router = GoRouter(
  routes: [
    GoRoute(
      path: "/",
      builder: (context, state) => Index(),
    ),
  ],
);
