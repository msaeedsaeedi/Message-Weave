import { inject, Pipe, PipeTransform } from '@angular/core';
import { User_R, UsersService } from '@services/users.service';

@Pipe({
  name: 'getPhoto',
  standalone: true
})
export class GetPhotoPipe implements PipeTransform {

  user_service = inject(UsersService);

  async transform(id: string, users: User_R[], loaded: Promise<boolean>): Promise<URL> {
    await loaded;
    const res = users.find(item => item.user_id === id)
    if (res) {
      return (res.Photo);
    }
    return (await this.user_service.getUserswithid(id))[0].Photo;
  }

}
