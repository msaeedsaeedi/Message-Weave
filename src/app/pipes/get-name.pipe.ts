import { Pipe, PipeTransform } from '@angular/core';
import { User_R } from '@services/users.service';

@Pipe({
  name: 'getName',
  standalone: true
})
export class GetNamePipe implements PipeTransform {

  transform(id: string, users: User_R[]): string {
    const user = users.find(item => item.user_id === id);
    return user ? user.Username : '';
  }

}
