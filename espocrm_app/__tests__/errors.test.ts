import { AxiosError } from 'axios';
import { mapApiError } from '../src/api/errors';

describe('mapApiError', () => {
  it('handles auth errors', () => {
    const error = new AxiosError('Unauthorized', undefined, {}, {}, {
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config: {},
      data: {},
    });
    const mapped = mapApiError(error);
    expect(mapped.category).toBe('auth');
  });

  it('handles network errors', () => {
    const error = new AxiosError('Network', undefined, {}, {}, undefined as any);
    const mapped = mapApiError(error);
    expect(mapped.category).toBe('network');
  });
});
