const { AuthenticationError } = require("apollo-server-express");
const { User, Review, Reservation } = require("../models");
const { signToken } = require("../utils/auth");
// const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById({ _id: context.user._id }).populate(
          "reviews"
        );
        return user;
      }
      throw new AuthenticationError("User is not logged in");
    },
    reviews: async (parent, args, context) => {
      const reviews = await Review.find().sort({ createdAt: -1 });
      console.log(reviews);
      return reviews;
    },
    singleReview: async (parent, args, context) => {
      console.log("Getting one review", args);
      const review = await Review.findById({ _id: args.reviewId });
      console.log("Returned review", review);
      return review;
    },
    reservations: async (parent, args, context) => {
      console.log("Getting the reservations for", args, context.user.username);
      const reservation = await User.findById({
        _id: context.user._id
      }).populate("reservations");
      console.log("RESERVATIONS", reservation);
      return reservation;
    },
    // checkout: async (parent, args, context) => {
    //   const url = new URL(context.headers.referer).origin;

      // add this new Donation to the database using Donation model

      // const order = new Order({ products: args.products });
      // const line_items = [];

      // const { products } = await order.populate('products');

      // for (let i = 0; i < products.length; i++) {
      //   const product = await stripe.products.create({
      //     name: products[i].name,
      //     description: products[i].description,
      //     images: [`${url}/images/${products[i].image}`]
      //   });

      //   const price = await stripe.prices.create({
      //     product: product.id,
      //     unit_amount: products[i].price * 100,
      //     currency: 'usd',
      //   });

      //   line_items.push({
      //     price: price.id,
      //     quantity: 1
      //   });
      // }

      // // dummy data
      // const product = await stripe.products.create({
      //   name: "Donation",
      //   description: "Description of donation!",
      //   // images: [`${url}/images/${products[i].image}`]
      // });

      // const price = await stripe.prices.create({
      //   product: 123,
      //   unit_amount: args.amount * 100,
      //   currency: "usd",
      // });

      // const line_items = [
      //   {
      //     price: price.id,
      //     quantity: 1,
      //   },
      // ];

    //   const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ["card"],
    //     line_items,
    //     mode: "payment",
    //     success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    //     cancel_url: `${url}/`,
    //   });

    //   return { session: session.id };
    // },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      console.log('CREATNIG A USER')
      const user = await User.create({ username, email, password });
      console.log('ADDING USER', user);
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addReview: async (parent, { reviewText }, context) => {
      if (context.user) {
        const review = await Review.create({
          reviewText,
          reviewAuthor: context.user.username,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { reviews: review._id } }
        );
        return review;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addReservation: async (parent, { reservationName, reservationDate, reservationNumber , reservationTime }, context) => {
      if (context.user) {
        const reservation = await Reservation.create({
          reservationName: context.user.username,
          reservationDate, reservationNumber , reservationTime
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { reservations: reservation._id } }
        );
        return reservation;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteReview: async (parent, { reviewId }) => {
      console.log("Deleting a review", reviewId);
      return Review.findOneAndDelete({ _id: reviewId });
    },
  },

//These one's I'm still not sure if they work -V
//     updateReview: async (parent, args, context) => {
//       if (context.user) {
//           console.log('Review Updated!')
//           const review = Review.findByIdAndUpdate(
//               { _id: context.review._id },
//               { reviewText }
//           )
//           return review
//       }
//   },


// deleteReservation: async (parent, { reservationId }) => {
//   console.log('Deleting reservation', reservationId);
//   return Reservation.findOneAndDelete({ _id: reservationId })
// },

};

module.exports = resolvers;
