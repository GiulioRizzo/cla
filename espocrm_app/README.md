# EspoCRM React Native Scaffold

This project bootstraps a React Native client for EspoCRM with environment-driven configuration, secure authentication storage, a typed API client, and basic UI scaffolding.

## Environment
Create an `.env` file based on `.env.example`:

```
API_BASE_URL=/api/v1/
AUTH_MODE=Bearer
RETRY_LIMIT=3
NETWORK_LOGGING=true
```

Values drive authentication headers (Bearer vs Basic), retry limits, and network logging for the Axios client.

## Key Features
- `react-native-config` loads environment variables for runtime configuration.
- Axios client with auth interceptors, retry strategy for 429/5xx responses, and optional request/response logging.
- Secure token storage via `react-native-keychain` with credentials persisted in `@react-native-async-storage/async-storage`.
- Zod-based schemas for Leads, Opportunities, Contacts, Tasks, and Meetings with list parsing helpers.
- Service layer in `src/api/espoApi.ts` providing auth plus CRUD/list helpers for the EspoCRM entities.
- Minimal UI scaffolding for login and lead listing using React context to inject the API instance.

## Scripts
- `npm start` - Start Metro.
- `npm test` - Run Jest unit tests.
- Platform run scripts (`npm run android` / `npm run ios`) assume native environments are configured.
