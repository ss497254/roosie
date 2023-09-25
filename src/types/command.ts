export type Command = (param: string) => void;

export interface ChatCommands {
  new?: Command;
  newm?: Command;
  next?: Command;
  prev?: Command;
  clear?: Command;
  del?: Command;
}
