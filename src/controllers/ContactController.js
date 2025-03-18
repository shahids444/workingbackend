import Contact from "../models/ContactModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get all Contacts
// @route   GET /api/Contacts
// @access  Public
export const getContacts = asyncHandler(async (req, res) => {
  const Contacts = await Contact.find({});
  res.json(Contacts);
});

// @desc    Get Contact by ID
// @route   GET /api/Contacts/:id
// @access  Public
export const getContactById = asyncHandler(async (req, res) => {
  const Contact = await Contact.findById(req.params.id); // Changed variable name to avoid conflict
  if (Contact) res.json(Contact);
  else {
    res.status(404);
    throw new Error("Contact not found");
  }
});

// @desc    Update Contact
// @route   PUT /api/Contacts/:id
// @access  Private
export const updateContact = asyncHandler(async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedContact) return res.status(404).json({ error: "Contact not found" });

    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// @desc    Create a new Contact
// @route   POST /api/Contacts/createContact
// @access  Private
export const createContacts = asyncHandler(async (req, res) => {
  const { name, email,phone,subject, message } = req.body;

  const ContactExists = await Contact.findOne({ name }); // Changed variable name
 

  const newContact = await Contact.create({ name, email,phone,subject, message,user: req.user ? req.user._id : null, // Ensure req.user exists
  });

  if (newContact) {
    res.status(201).json({ message: "Contact added successfully", Contact: newContact });
  } else {
    res.status(400);
    throw new Error("Invalid Contact data");
  }
});
