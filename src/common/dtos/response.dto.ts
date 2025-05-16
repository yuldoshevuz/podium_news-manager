class Response<T, M = null> {
  success: boolean;
  data: T | null;
  message?: M;

  constructor(success: boolean, data: T | null, message?: M) {
    this.success = success;
    this.data = data;
    message && (this.message = message);
  }
}

export class SuccessResponse<T> extends Response<T> {
  constructor(data: T) {
    super(true, data);
  }
}

export class ErrorResponse<T> extends Response<null, T> {
  constructor(message?: T) {
    super(false, null, message);
  }
}
