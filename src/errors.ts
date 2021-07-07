class RequestError extends Error {
  statusCode: number;
  body: any;
  type: string;
  constructor(message: string, statusCode?: number, type?: string, body?: any) {
    super(message);

    this.statusCode = statusCode || 500;
    this.type = type || null;
    this.body = body || null;
  }
}

export class QueuedError extends RequestError {
  constructor(body: any) {
    super("Lookup queued", 202, "async_created", body);
  }
}

export class NotFoundError extends RequestError {
  constructor(body: any) {
    super("Record not found", 404, "not_found", body);
  }
}

export class BadRequestError extends RequestError {
  constructor(body: any) {
    super("Bad request", 400, "bad_request", body);
  }
}

export class RateLimitError extends RequestError {
  constructor(body: any) {
    super("Too many requests", 429, "rate_limit", body);
  }
}

export class UnknownError extends RequestError {
  constructor(body: any) {
    super("API error", 500, "api_error", body);
  }
}
