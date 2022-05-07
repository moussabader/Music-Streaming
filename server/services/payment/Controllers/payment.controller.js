const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const User = require('../../../models/User')

let session_id = null;
module.exports = {
    purchase: async (req, res) => {

        //this is gonna be removed once the template is ready
        const token = await Stripe.tokens.create({
          card: {
            number: '4242424242424242',
            exp_month: 3,
            exp_year: 2023,
            cvc: '314',
          },
        });
        
      //actual payment
        try {
          Stripe.customers
            .create({
              name: req.body.name,
              email: req.body.email,
              source: token.id
            })
            .then(customer =>
              Stripe.charges.create({
                amount: req.body.amount * 100,
                currency: "usd",
                customer: customer.id
               
              })
            )
            .then(async () => {
              console.log('Charge created successfully')
              const filter = { name: 'Jean-Luc Picard' };
              const update = { accType: 'PREMIUM' };
              const user = await User.findOneAndUpdate(filter, update);
              res.send(user.email+' is premium user now')
            }) 
            
            .catch(err => console.log(err));
        } catch (err) {
          res.send(err.message);
        }
      },

      Subscription: async (req, res) => {
        console.log("charge about to be created");
        const { token = {}, amount = 0 } = req.body; 
    
        if (!Object.keys(token).length || !amount) {
            res.status(400).json({ success: false });
        }
  
        const { id:customerId } = await Stripe.customers.create({
            email: token.email,
            source: token.id, 
        }).catch(e => {
            console.log(e);
            return null; 
        })
    
        if (!customerId) {
            res.status(500).json({ success: false });
            return; 
        }
    
        const invoiceId = `${token.email}-${Math.random().toString()}-${Date.now().toString()}`;
    
        const charge = await Stripe.charges.create({
            amount: amount * 100,
            currency: "USD",
            customer: customerId,
            receipt_email: token.email,
            description: "Donation",
        }, { idempotencyKey: invoiceId }).catch(e => {
            console.log(e);
            return null; 
        });
    
        if (!charge) {
            console.log("charge error")
            res.status(500).json({ success: false });
            return;
        };
        console.log('Charge created successfully')
        const filter = { email: token.email };
        const update = { accType: 'PREMIUM' };
        await User.findOneAndUpdate(filter, update);
        res.status(201).json({ success: true });
    },

    checkout:  async (req, res) => {
      const session = await Stripe.checkout.sessions.create({
        payment_method_types: [
          'card'
        ],
        line_items: [
          {
            // TODO: replace this with the `price` of the product you want to sell
            // price: '{{PRICE_ID}}',
            price: 'price_1KqmTiIS9fITYSqfAcq7ERbS',
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: 'http://localhost:3006/payment/success',
        cancel_url: `http://localhost:3000`,
      });
      session_id= session.id
   
      res.redirect(303, session.url)
     },

     success : async (req, res)=>{
      const session = await Stripe.checkout.sessions.retrieve(
        session_id
      );  
      const filter = { email: session.customer_details.email };
      const update = { accType: 'PREMIUM' };
      await User.findOneAndUpdate(filter, update);
      res.status(201).redirect("http://localhost:3000");
     
     }

}