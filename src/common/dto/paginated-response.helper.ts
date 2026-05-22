export function buildPaginatedResponse<T>(
  message: string,
  data: T[],
  total: number,
  page: number,
  limit: number,
) {
  return {
    message,
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
