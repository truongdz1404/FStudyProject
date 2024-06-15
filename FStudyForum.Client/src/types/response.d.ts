export interface Response {
  status: string
  message: string
}

export interface ResponseWith<T> extends Response {
  data: T
}
