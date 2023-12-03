export type ServerResponse<Data> = {
    status: number;
    type: 'success';
    message: string;
    data: Data;
  };