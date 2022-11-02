export interface RequestExt extends Request {
  params: {
    id: string | undefined;
  };
}
