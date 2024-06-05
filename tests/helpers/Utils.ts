import * as OTPAuth from "otpauth";

export function getTOTP(
  issuer?: string,
  label?: string,
  algorithm?: string,
  digits?: number,
  period?: number,
  secret?: string,
) {
  const totp = new OTPAuth.TOTP({
    issuer: issuer,
    label: label,
    algorithm: algorithm,
    digits: digits,
    period: period,
    secret: secret,
  });
  return totp.generate();
}

type Credentials = {
  username: string | undefined;
  password: string | undefined;
  secret: string | undefined;
};

export function getCredentials(role: string): Credentials {
  if (role === "manager") {
    return {
      username: process.env.MANAGER_USERNAME,
      password: process.env.MANAGER_PASSWORD,
      secret: process.env.MANAGER_SECRET,
    };
  } else {
    return {
      username: process.env.STAFF_USERNAME,
      password: process.env.STAFF_PASSWORD,
      secret: process.env.STAFF_SECRET,
    };
  }
}
