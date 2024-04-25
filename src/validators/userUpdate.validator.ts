import Joi from "joi";

export const UpdateSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be longer than 3 letters",
    "string.max": "Name must be shorter than 30 letters",
    "any.required": "Name is required",
  }),
  email: Joi.string()
    .regex(/^\S+@\S+\.\S+$/)
    .messages({
      "string.base": "Email must be a string",
      "string.empty": "Email cannot be empty",
      "string.pattern.base": "Email must look like username@example.com",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .min(8)
    .max(32)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be longer than 8 symbols",
      "string.max": "Password must be shorter than 32 symbols",
      "string.pattern.base":
        "Password must have 1 UpperCase, 1 LowerCase, 1 Number, 1 Special character",
      "any.required": "Password is required",
    }),
  phone: Joi.string()
    .regex(/^\+380\d{9}$/)
    .messages({
      "string.pattern.base": "Phone number must consist of 12 characters",
    }),
  age: Joi.number().min(1).max(100).messages({
    "number.base": "Age must be a number",
    "any.required": "Age is required",
    "number.min": "Age must be higher than 0",
    "number.max": "Age must be less than 100",
  }),
});
