import Stripe from 'stripe';
import initStripe from 'stripe';
import { supabase } from '../../utils/supabase';

import type { StripeCustomer , StripeReq} from '../../utils/types';

const handler = async (req: StripeReq, res) => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const customer: StripeCustomer = await stripe.customers.create({
    email: req.body.record.email
  });

  await supabase.from('profile').update({
    stripe_customer: customer.id
  }).eq('id', req.body.record.id);

  res.send({ message: `stripe customer created: ${ customer.id }` });
}

export default handler;