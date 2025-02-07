import { Injectable } from '@angular/core';
import { DbService } from './db.interface';

@Injectable({
  providedIn: 'root'
})
export class DbServiceImpl<Entity> implements DbService<Entity> {
  private entityName: string = "";

  constructor() { }

  begin(entityName: string): void {
    this.entityName = entityName;
    if (localStorage.getItem(entityName) === null) {
      localStorage.setItem(entityName, JSON.stringify([]));
    }
  }

  insert(entity: Entity): Entity {
    const currentData: Entity[] = JSON.parse(localStorage.getItem(this.entityName) || '[]');

    const nextId = currentData.length > 0 ? (currentData[currentData.length - 1] as any).id + 1 : 1;

    (entity as any).id = nextId;

    currentData.push(entity);

    localStorage.setItem(this.entityName, JSON.stringify(currentData));

    return entity;
  }

  update(updatedEntity: Entity, entityId: number): Entity | null {
    const currentData: Entity[] = JSON.parse(localStorage.getItem(this.entityName) || '[]');
    const entityIndex = currentData.findIndex((entity: any) => entity.id === entityId);
  
    if (entityIndex === -1) {
      return null;
    }
  
    currentData[entityIndex] = { ...currentData[entityIndex], ...updatedEntity };
  
    localStorage.setItem(this.entityName, JSON.stringify(currentData));
  
    return currentData[entityIndex];
  }
  
  get getAll(): Entity[] | [] {
    return JSON.parse(localStorage.getItem(this.entityName) || '[]');
  }

  getItemsWithSameDetail(key: keyof Entity, detail: string): Entity[] | [] {
    const currentItems = this.getAll;

    const matchingItems = currentItems.filter((item: any) => {
      return item && item[key] === detail;
    });
    return matchingItems;
  }

  getById(id: number): Entity | null {
    const currentItems = this.getAll;
    const entity = currentItems.find((item: any) => item && item.id === id);
    return entity || null;
  }  
}
