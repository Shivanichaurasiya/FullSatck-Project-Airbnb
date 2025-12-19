
const mongoose = require("mongoose");
const review = require("./review");
const { ref } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
  url: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?auto=format&fit=crop&w=800&q=60",
  },
  filename: {
    type: String,
    default: "default.jpg",
  }
},
 
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
        type:Schema.Types.ObjectId,
        ref:"Review" 
    
    }
  ],
});
const Review = require("./review"); // adjust path if needed

listingSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
