import {
  Document,
  FilterQuery,
  Model,
  ObjectId,
  UpdateQuery,
  /* mongo, */
} from "mongoose"

/**
 * A general CRUD service class to be used as a basis for all services.
 */
export default abstract class Service<Doc extends Document, Input> {
  constructor (private readonly model: Model<Doc>) {
    this.model = model
  }

  // Arrow functions are necessary here for correct `this` binding.

  /**
   * Get all items from the collection.
   * @param where an optional filter query for constrained search
   * @returns all (matched) items from the collection
   */
  getAll = async (where: FilterQuery<Doc> = {}) => {
    const { page = 0, limit = 0 } = where

    /* @todo currently doesn't work due to whiny typescript
    // If a mongo id is sent we try to construct it to a proper ObjectId.
    // Throws an error if it's an invalid id.
    where._id &&= new mongo.ObjectId(where._id)
    */

    return await this.model
      .find(where)
      .skip(page * limit)
      .limit(limit)
  }

  /**
   * Insert a new document.
   * @param doc the valid document object to insert
   * @returns the inserted document
   */
  insert = async (doc: Input) => await this.model.create<Input>(doc)

  /**
   * Update an existing document.
   * @param id the mongo id of the document to be updated
   * @param doc the valid document object to insert
   * @returns the updated document
   */
  update = async (id: ObjectId, doc: UpdateQuery<Doc>) =>
    await this.model.findByIdAndUpdate(id, doc, { new: true })

  /**
   * Delete an existing document.
   * @param id the mongo id of the document to delete
   * @returns the deleted document
   */
  delete = async (id: ObjectId) => await this.model.findByIdAndDelete(id)
}
