import { Request, Response } from 'express';
import Burrito from '../models/Burrito';

// Get all burritos
export const getAllBurritos = async (req: Request, res: Response) => {
    try {
        const burritos = await Burrito.find();
        res.json(burritos);
    } catch (error) {
        if (error instanceof Error) {
            // Now TypeScript knows `error` is of type Error and has a `message` property
            res.status(500).json({ message: error.message });
        } else {
            // If it's not an Error instance, or you're not sure of the error structure
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Get a single burrito by ID
export const getBurritoById = async (req: Request, res: Response) => {
    try {
        const burrito = await Burrito.findById(req.params.id);
        if (!burrito) return res.status(404).json({ message: 'Burrito not found' });
        res.json(burrito);
    } catch (error) {
        if (error instanceof Error) {
            // Now TypeScript knows `error` is of type Error and has a `message` property
            res.status(500).json({ message: error.message });
        } else {
            // If it's not an Error instance, or you're not sure of the error structure
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Create a new burrito
export const createBurrito = async (req: Request, res: Response) => {
    try {
      const newBurrito = new Burrito(req.body);
      const savedBurrito = await newBurrito.save();
      res.status(201).json(savedBurrito);
    } catch (error) {
        if (error instanceof Error) {
            // Now TypeScript knows `error` is of type Error and has a `message` property
            res.status(500).json({ message: error.message });
        } else {
            // If it's not an Error instance, or you're not sure of the error structure
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
  };

export default {
    getAllBurritos,
    getBurritoById,
    createBurrito, 
    // ... any other functions ...
  };