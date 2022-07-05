export type Lesson = {
  id: number,
  created_at: Date,
  title: string,
  description: string
}

export type StripeCustomer = {
  id: string,
  email: string
}

// type Record = {
//   id: string,
//   email: string
// }

// export type StripeCustomer = {
//   record: Record
// }

interface StripeBody {
  record: StripeCustomer
}

export interface StripeReq {
  body: StripeBody
}

// interface StripeRes {
//   body: Body
// }