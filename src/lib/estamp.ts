import { getEstamps } from "./db"

export interface Estamp {
  name: string
}

export const getAllEstamps = async () => {
  return await getEstamps()
}
