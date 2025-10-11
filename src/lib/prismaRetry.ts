// lib/prismaRetry.ts
export const prismaRetry = async <T>(
  queryFn: () => Promise<T>,
  retries: number = 3,
  delay: number = 500
): Promise<T> => {
  let attempt = 0
  while (attempt < retries) {
    try {
      return await queryFn()
    } catch (err) {
      attempt++
      console.warn(`Prisma query failed, attempt ${attempt}/${retries}`, err)
      if (attempt >= retries) throw err
      await new Promise(res => setTimeout(res, delay)) // wait before retrying
    }
  }
  throw new Error("Unexpected error in prismaRetry")
}
