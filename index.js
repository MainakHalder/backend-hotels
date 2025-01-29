const { initializeDatabase } = require("./db/db.connect");
const Hotel = require("./models/hotel");
initializeDatabase();

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Server is working");
});

const newHotel = {
  name: "New Hotel",
  category: "Mid-Range",
  location: "123 Main Street, Frazer Town",
  rating: 4.0,
  reviews: [],
  website: "https://hotel-example.com",
  phoneNumber: "+1234567890",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  amenities: ["Laundry", "Room Service"],
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: true,
  photos: [
    "https://example.com/hotel-photo1.jpg",
    "https://example.com/hotel-photo2.jpg",
  ],
};
const newHotel1 = {
  name: "Lake View",
  category: "Mid-Range",
  location: "124 Main Street, Anytown",
  rating: 3.2,
  reviews: [],
  website: "https://lake-view-example.com",
  phoneNumber: "+1234555890",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  amenities: ["Laundry", "Boating"],
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isParkingAvailable: false,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: false,
  photos: [
    "https://example.com/hotel1-photo1.jpg",
    "https://example.com/hotel1-photo2.jpg",
  ],
};

const newHotel2 = {
  name: "Sunset Resort",
  category: "Resort",
  location: "12 Main Road, Anytown",
  rating: 4.0,
  reviews: [],
  website: "https://sunset-example.com",
  phoneNumber: "+1299655890",
  checkInTime: "2:00 PM",
  checkOutTime: "11:00 AM",
  amenities: [
    "Room Service",
    "Horse riding",
    "Boating",
    "Kids Play Area",
    "Bar",
  ],
  priceRange: "$$$$ (61+)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: true,
  isSpaAvailable: true,
  isRestaurantAvailable: true,
  photos: [
    "https://example.com/hotel2-photo1.jpg",
    "https://example.com/hotel2-photo2.jpg",
  ],
};

const createData = async (newHotel) => {
  try {
    const addHotel = new Hotel(newHotel);
    const saveData = await addHotel.save();
    return saveData;
  } catch (error) {
    throw error;
  }
};

app.post("/hotels", async (req, res) => {
  try {
    const newHotel = await createData(req.body);
    res
      .status(201)
      .json({ message: "Hotel added successfully", hotel: newHotel });
  } catch (error) {
    res.status(500).json({ error: "Failed to add hotel" });
  }
});

// createData(newHotel);
// createData(newHotel1);
// createData(newHotel2);

const readAllHotels = async () => {
  try {
    const readHotels = await Hotel.find();
    return readHotels;
  } catch (error) {
    throw error;
  }
};

app.get("/hotels", async (req, res) => {
  try {
    const hotel = await readAllHotels();
    if (hotel.length) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
});

// readAllHotels();

const findHotelByName = async (hotelName) => {
  try {
    const hotelByName = await Hotel.findOne({ name: hotelName });
    return hotelByName;
  } catch (error) {
    throw error;
  }
};

app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const hotel = await findHotelByName(req.params.hotelName);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
});
// findHotelByName("Lake View");

// const findHotelsByParking = async () => {
//   try {
//     const hotelByParking = await Hotel.find({ isParkingAvailable: true });
//     console.log(hotelByParking);
//   } catch (error) {
//     throw error;
//   }
// };
// findHotelsByParking();

// const findHotelByRestaurant = async () => {
//   try {
//     const hotelByRestaurant = await Hotel.find({ isRestaurantAvailable: true });
//     console.log(hotelByRestaurant);
//   } catch (error) {
//     throw error;
//   }
// };
// findHotelByRestaurant();

// const findMidHotels = async (type) => {
//   try {
//     const midHotels = await Hotel.find({ category: type });
//     console.log(midHotels);
//   } catch (error) {
//     throw error;
//   }
// };
// findMidHotels("Mid-Range");

// const findHotelsByPrice = async (budget) => {
//   try {
//     const hotelsByPrice = await Hotel.find({ priceRange: budget });
//     console.log(hotelsByPrice);
//   } catch (error) {
//     throw error;
//   }
// };
// findHotelsByPrice("$$$$ (61+)");

const findHotelsByRating = async (hotelRating) => {
  try {
    const hotelsByRating = await Hotel.find({ rating: hotelRating });
    return hotelsByRating;
  } catch (error) {
    throw error;
  }
};

app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try {
    const hotel = await findHotelsByRating(req.params.hotelRating);
    if (hotel.length) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotels not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});
// findHotelsByRating(4.0);

const findHotelsByPhno = async (phone) => {
  try {
    const hotelsByPhno = await Hotel.findOne({ phoneNumber: phone });
    return hotelsByPhno;
  } catch (error) {
    throw error;
  }
};

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try {
    const hotel = await findHotelsByPhno(req.params.phoneNumber);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel." });
  }
});
// findHotelsByPhno("+1299655890");

async function readHotelsByCategory(hotelCategory) {
  try {
    const hotelByCategory = await Hotel.find({ category: hotelCategory });
    return hotelByCategory;
  } catch (error) {
    console.log("Error occured:", error);
  }
}

app.get("/hotels/category/:hotelCategory", async (req, res) => {
  try {
    const hotel = await readHotelsByCategory(req.params.hotelCategory);
    if (hotel.length) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotels not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
});

//Update api's

async function updateTimeById(hotelId, dataToUpdate) {
  try {
    const updatedData = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, {
      new: true,
    });
    return updatedData;
  } catch (error) {
    console.log("Error occured while updating the data: ", error);
  }
}

app.post("/hotels/:hotelId", async (req, res) => {
  try {
    const updatedHotel = await updateTimeById(req.params.hotelId, req.body);
    if (updatedHotel) {
      res.status(200).json({
        message: "Hotel updated successfully",
        updatedHotels: updatedHotel,
      });
    } else {
      res.status(404).json({ error: "Hotel not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update hotel." });
  }
});
// updateTimeById("671f1e251f7e9a98cec9b4da", {
//   checkOutTime: "11:00 AM",
// });

async function updateRatingByName(hotelName, dataToUpdate) {
  try {
    const updatedData = await Hotel.findOneAndUpdate(
      { name: hotelName },
      dataToUpdate,
      { new: true }
    );
    console.log(updatedData);
  } catch (error) {
    console.log("Error occured while updating the data: ", error);
  }
}
// updateRatingByName("Sunset Resort", { rating: 4.2 });

async function updatePhoneNo(phone, dataToUpdate) {
  try {
    const updatedData = await Hotel.findOneAndUpdate(
      { phoneNumber: phone },
      dataToUpdate,
      { new: true }
    );
    console.log(updatedData);
  } catch (error) {
    console.log("Error occured while updating data: ", error);
  }
}
// updatePhoneNo("+1299655890", { phoneNumber: "+1997687392" });

async function deleteHotelById(hotelId) {
  try {
    const deletedData = await Hotel.findByIdAndDelete(hotelId);
    return deletedData;
  } catch (error) {
    console.log("Error occured while deleting", error);
  }
}
app.delete("/hotels/:hotelId", async (req, res) => {
  try {
    const deletedData = await deleteHotelById(req.params.hotelId);
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete hotel." });
  }
});
// deleteHotelById("6717dff36b9efd81088c6304");

async function deleteHotelByPhoneNumber(phone) {
  try {
    const deletedData = await Hotel.findOneAndDelete(phone);
    console.log("Deleted data: ", deletedData);
  } catch (error) {
    console.log("Error occured while deleting", error);
  }
}
// deleteHotelByPhoneNumber("+1234555890");

const PORT = 3800;
app.listen(PORT, () => {
  console.log("The server is running on port: ", PORT);
});
