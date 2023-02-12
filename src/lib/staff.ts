import { getCurrentUserData, staffDocExist, staffReadable, updateUser } from "@/lib/db"

export enum RedeemError {
  UserNotFound,
  MissingStamp,
  AlreadyRedeem,
}

/**
 * @description must login with staff account
 * @returns return null if sucess else RedeemError
 */
export const redeemPrize: (userId: string) => Promise<null | RedeemError> = async (userId: string) => {
  const user = await getCurrentUserData(userId)

  if (!user) {
    return RedeemError.UserNotFound
  }

  // check if user already redeemed
  if (user.prizeRedeemed) {
    return RedeemError.AlreadyRedeem
  }

  // check if user is qualified for redeem (have all stamp)
  if (user.prizeStamp) {
    return RedeemError.MissingStamp
  }

  await updateUser(userId, { prizeRedeemed: true })

  return null
}

export const redeemFortune: (userId: string) => Promise<null | RedeemError> = async (userId: string) => {
  const user = await getCurrentUserData(userId)

  if (!user) {
    return RedeemError.UserNotFound
  }

  // check if user already redeemed
  if (user.PrizeRedeemed) {
    return RedeemError.AlreadyRedeem
  }

  // check if user is qualified for redeem (have all stamp)
  if (user.PrizeStamp) {
    return RedeemError.MissingStamp
  }

  await updateUser(userId, { PrizeRedeemed: true })

  return null
}

export const isStaff = async () => {
  return await staffReadable()
}
