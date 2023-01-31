import { Model, FilterQuery, Document, UpdateQuery, QueryOptions } from "mongoose";

export abstract class EntityRepository<T extends Document>{
  constructor(
    protected readonly entityModel: Model<T>
  ) {

  }
  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<T | null> {
    return this.entityModel.findOne(entityFilterQuery, {

      __v: 0,
      ...projection
    }).exec()
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData)
    return entity.save()
  }



  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true
      }
    )
  }

  async find(
    entityFilterQuery?: FilterQuery<T>,
    projection?: Record<string, unknown>,
    queryOptions? : QueryOptions<unknown>
  ): Promise<T[] | null> {
    console.log(queryOptions )
    return this.entityModel.find(entityFilterQuery,projection,queryOptions);
  }

}