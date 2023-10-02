//without a defined matcher, this one line applies next-auth to the entire project
export { default } from "next-auth/middleware"

//matcher applies next-auth only to matching routes (can also be regex). This way you can have some pages be public, while also protecting other routes
export const config = { matcher: ["/admin"] }