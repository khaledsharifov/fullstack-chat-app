export interface ISignUpForm {
  fullName: string;
  email: string;
  password: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IProfilePic {
  profilePic: string | ArrayBuffer;
}
