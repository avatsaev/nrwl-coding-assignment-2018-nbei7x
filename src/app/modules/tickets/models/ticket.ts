import {User} from '../../../models/user';

export interface Ticket {
  id?: number;
  description?: string;
  assigneeId: number;
  completed: boolean;
  user?: User
}
