export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  name: string;
  lastname: string;
  cellphone: string;
  rol: string;
}

export interface IUserRol {
  email: string;
  name: string;
  lastname: string;
  cellphone: string;
  rol: string;
}