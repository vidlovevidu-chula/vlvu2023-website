import { getEstamps, getEstampCount as dbEstampCount } from "./db"

export interface Estamp {
  name: string
}

export const getAllEstamps = async () => {
  return await getEstamps()
}

export const getEstampCount = async () => {
  // remove template
  return (await dbEstampCount()) - 1
}
