export interface DbService<Entity> {

  begin(entityName: string): void;

  insert(entity: Entity): Entity;

  update(updatedEntity: Entity, entityId: number): Entity | null;
  
  get getAll(): Entity[] | [];

  getItemsWithSameDetail(key: keyof Entity, detail: string): Entity[] | [];

  getById(id: number): Entity | null;
}
