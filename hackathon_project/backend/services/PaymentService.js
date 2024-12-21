/*// PaymentService.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class PaymentService {
  // Process an appointment invoice
  async processInvoice(appointment) {
    try {
      // Create a payment intent (example using Stripe)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: this.calculateAmount(appointment),
        currency: 'usd',
        description: Invoice for appointment ${appointment.id},
      });

      return paymentIntent.client_secret; // Return client secret for frontend to handle payment
    } catch (error) {
      console.error('Error processing payment:', error);
      throw new Error('Payment processing failed');
    }
  }

  // Calculate the payment amount based on the appointment details
  calculateAmount(appointment) {
    // Example logic: base fee of $50 for a regular appointment, $100 for emergency
    const baseAmount = appointment.priority === 'emergency' ? 100 : 50;
    return baseAmount * 100; // Stripe uses the smallest unit (cents)
  }

  // Create a patient subscription plan
  async createPatientPlan(patient) {
    try {
      // Example: Creating a recurring subscription using Stripe
      const subscription = await stripe.subscriptions.create({
        customer: patient.stripeCustomerId, // Linked customer in Stripe
        items: [{ price: process.env.STRIPE_PLAN_ID }],
        payment_behavior: 'default_incomplete', // Require a successful payment
      });

      return subscription;
    } catch (error) {
      console.error('Error creating subscription plan:', error);
      throw new Error('Subscription creation failed');
    }
  }
}

module.exports = PaymentService;*/