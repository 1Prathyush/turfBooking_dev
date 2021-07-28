const mongoose = require("mongoose");

const turfSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    ownerMail: {
      type: String,
      required: true,
    },
    firebaseUID: {
      type: String,
      required: true,
    },
    turfName: {
      type: String,
    },
    turfPlace: {
      type: String,
    },
    landmark: {
      type: String,
    },
    PhoneNumber: {
      type: Number,
    },
    district: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    BookingStates: [
      {
        bookdate :{
          type:Date,
        },
        TimeSlot: [
          {
            SixAM: {
              type: String,
              default:" "
            },
            SevenAM: {
              type: String,
              default:" "
            },
            EightAM: {
              type: String,
              default:" "
            },
            SixPM: {
              type: String,
              default:" "
            },
            SevenPM: {
              type: String,
              default:" "
            },
            EightPM: {
              type: String,
              default:" "
            },
            NinePM: {
              type: String,
              default:" "
            },
            TenPM: {
              type: String,
              default:" "
            },
            ElevenPM: {
              type: String,
              default:" "
            },
          },
        ],
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("turf", turfSchema);
