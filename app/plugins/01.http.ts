import type { $Fetch } from 'nitropack';
import { HTTPClient } from '~/lib/http.client';

export default defineNuxtPlugin({
  name: 'http',

  setup() {
    const config = useRuntimeConfig();
    const fetcher: $Fetch = $fetch.create({
      baseURL: import.meta.server ? String(config.apiInternal) : String(config.public.apiBase),
    });
    const httpClient = new HTTPClient(fetcher);

    return {
      provide: {
        httpClient,
      },
    };
  },
});
