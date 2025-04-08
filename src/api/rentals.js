import { getRentalsCollection } from '../utils/mongodb';

export async function getAllRentals() {
  try {
    const rentals = await getRentalsCollection();
    return await rentals.find({}).toArray();
  } catch (error) {
    console.error('Error fetching rentals:', error);
    throw error;
  }
}

export async function getRentalById(id) {
  try {
    const rentals = await getRentalsCollection();
    return await rentals.findOne({ _id: id });
  } catch (error) {
    console.error('Error fetching rental by id:', error);
    throw error;
  }
}

export async function createRental(rentalData) {
  try {
    const rentals = await getRentalsCollection();
    const result = await rentals.insertOne({
      ...rentalData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return result.insertedId;
  } catch (error) {
    console.error('Error creating rental:', error);
    throw error;
  }
}

export async function updateRental(id, rentalData) {
  try {
    const rentals = await getRentalsCollection();
    const result = await rentals.updateOne(
      { _id: id },
      {
        $set: {
          ...rentalData,
          updatedAt: new Date()
        }
      }
    );
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error updating rental:', error);
    throw error;
  }
}

export async function deleteRental(id) {
  try {
    const rentals = await getRentalsCollection();
    const result = await rentals.deleteOne({ _id: id });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting rental:', error);
    throw error;
  }
} 