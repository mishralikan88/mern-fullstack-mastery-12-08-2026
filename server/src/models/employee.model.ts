import mongoose, { Schema } from "mongoose";

interface IEmployee {
  name: string;
  email: string;
  department: string;
  role: string;
  status: "active" | "inactive";
}

const employeeSchema = new Schema<IEmployee>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model<IEmployee>(
  "Employee",
  employeeSchema
);