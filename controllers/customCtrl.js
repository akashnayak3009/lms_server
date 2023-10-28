import Work from "../models/workWithUsModel.js";
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../config/validateMongoDbId.js";
import APIFeatures from "../utils/apiFeature.js";

export const createOne = (Model) => {
  return asyncHandler(async (req, res) => {
    try {
      if(req.body.title){
        req.body.slug=slugify(req.body.title)
      }
      const detail = await Model.create(req.body);
      res
        .status(200)
        .json({ status: true, message: "Created Success", detail });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Post details error",
      });
    }
  });
};

export const updateOne = (Model) => {
  return asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      if(req.body.title){
        req.body.slug=slugify(req.body.title)
      }
      const data = await Model.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({
        status: true,
        message: "Updated details",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Updated details error",
      });
    }
  });
};

export const deleteOne = (Model) => {
  return asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const data = await Model.findByIdAndDelete(id);
      res.status(200).json({
        status: true,
        message: "Details Deleted",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Details deleted error",
      });
    }
  });
};

export const getOne = (Model, populateOptions) => {
  return asyncHandler(async (req, res) => {
    const { id, slug } = req.params;

    try {
      let query;

      if (id) {
        validateMongodbId(id);
        query = Model.findById(id);
      } else if (slug) {
        query = Model.findOne({ slug: slug });
      }

      if (populateOptions) {
        query = query.populate(populateOptions);
      }

      const data = await query;

      if (!data) {
        return res.status(404).json({ message: "No data found" });
      }

      res.status(200).json({
        status: true,
        message: "Fetched details",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Fetched details error",
      });
    }
  });
};

export const getAll = (Model) => {
  return asyncHandler(async (req, res) => {
    try {
      let filter = {};
      const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const data = await features.query;
      res.status(200).json({
        status: true,
        message: "All details Fetched",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Fetched All details error",
      });
    }
  });
};
