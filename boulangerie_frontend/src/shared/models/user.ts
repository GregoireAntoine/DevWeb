export class User {
  username: string;
  email: string;
  
  constructor(json: any) {
    this.username = json.username;
    this.email = json.email;
  }
}
