export function extractMessage(response: unknown): {
  message: string;
  errors?: string[];
} {
  if (typeof response === 'string') {
    return { message: response };
  }

  if (typeof response === 'object' && response !== null) {
    if ('message' in response) {
      const msg = (response as { message?: unknown }).message;

      if (Array.isArray(msg)) {
        return {
          message: msg.join(', '),
          errors: msg,
        };
      }

      if (typeof msg === 'string') {
        return { message: msg };
      }
    }
  }

  return { message: 'Internal server error' };
}
