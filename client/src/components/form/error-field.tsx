type ErrorFieldProps = {
  message: string;
};

export const ErrorField = ({ message }: ErrorFieldProps) => {
  return <span className="text-sm text-red-500">{message}</span>;
};
