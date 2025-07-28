const Address = require("../model/Address");

// Create Address
const createAddr = async (req, res) => {
  const { name, mobile, pincode, address, city, state } = req.body;
  const newAddress = new Address({
    user: req.user._id,
    name,
    mobile,
    pincode,
    address,
    city,
    state,
  });

  const created = await newAddress.save();
  res.status(201).json(created);
};

// Get all addresses of user
const getAllAddr = async (req, res) => {
  const addresses = await Address.find({ user: req.user._id });
  res.json(addresses);
};

// Update address
const updateAddr = async (req, res) => {
  const addr = await Address.findById(req.params.id);

  if (addr && addr.user.toString() === req.user._id.toString()) {
    addr.name = req.body.name || addr.name;
    addr.mobile = req.body.mobile || addr.mobile;
    addr.pincode = req.body.pincode || addr.pincode;
    addr.address = req.body.address || addr.address;
    addr.city = req.body.city || addr.city;
    addr.state = req.body.state || addr.state;

    const updated = await addr.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: "Address not found or unauthorized" });
  }
};

// Delete address
const deleteAddr = async (req, res) => {
  const addr = await Address.findById(req.params.id);

  if (addr && addr.user.toString() === req.user._id.toString()) {
    await addr.deleteOne();
    res.json({ message: "Address deleted" });
  } else {
    res.status(404).json({ message: "Address not found or unauthorized" });
  }
};

module.exports = { createAddr, getAllAddr, updateAddr, deleteAddr };
