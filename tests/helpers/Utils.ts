import * as OTPAuth from "otpauth"

export function getTOTP(
    issuer?: string,
    label?: string,
    algorithm?: string,
    digits?: number,
    period?: number,
    secret?: string,
) {
    let totp = new OTPAuth.TOTP({
        issuer: issuer,
        label: label,
        algorithm: algorithm,
        digits: digits,
        period: period,
        secret: secret,
    });
    return totp.generate()
}