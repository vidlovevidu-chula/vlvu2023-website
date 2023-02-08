import { getCurrentUserData, getEstamps, updateUser } from "@/lib/db"
import { getEstampCount } from "./estamp"

export enum RedeemError {
  UserNotFound,
  MissingStamp,
  AlreadyRedeem,
}

/**
 * @description must login with staff account
 * @returns return null if sucess else RedeemError
 */
export const redeem: (userId: string) => Promise<null | RedeemError> = async (userId: string) => {
  const user = await getCurrentUserData(userId)

  if (!user) {
    return RedeemError.UserNotFound
  }

  // check if user already redeemed
  if (user.redeemed) {
    return RedeemError.AlreadyRedeem
  }

  // check if user is qualified for redeem (have all stamp)
  const stampCount = await getEstampCount()

  if (user.stamps < stampCount) {
    return RedeemError.MissingStamp
  }

  await updateUser(userId, { redeemed: true })

  return null
}
