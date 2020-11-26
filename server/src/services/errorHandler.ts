export const resOk = (data: any) => ({
  error: false,
  message: '',
  ...data,
});

export const resError = (message: string) => ({
  error: true,
  message,
})