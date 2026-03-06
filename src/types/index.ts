export interface Todo {
  id: string;
  title: string;
  description: string;
  finished: boolean;
}

export type RootStackParamList = {
  Home: { successMessage?: string };
  AddTodo: undefined;
};
