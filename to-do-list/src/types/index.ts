export interface Todo {
  _id: string;
  category: string;
  completed: boolean;
  deadline: Date;
  description: string;
  title: string;
}

export interface ResponseFuncs {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
}
