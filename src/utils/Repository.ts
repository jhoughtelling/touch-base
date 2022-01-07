import AsyncStorage from "@react-native-async-storage/async-storage";
import { Group } from "../models/Group";
//import { sampleGroups } from "../SampleData";
import Guid from "./Guid";
import { UpdateableContact } from "../models/UpdateableContact";
import { UpdateableGroup } from "../models/UpdateableGroup";

class Repository {
  private static _instance: Repository;
  private _groups!: Group[];

  //-----------------------------------------------------------------------------------------------
  // Singleton
  //-----------------------------------------------------------------------------------------------

  private constructor() {}

  public static getInstance(): Repository {
    if (!this._instance) {
      this._instance = new Repository();
    }
    return this._instance;
  }

  //-----------------------------------------------------------------------------------------------
  // Public
  //-----------------------------------------------------------------------------------------------

  public async createOrUpdateGroup(model: UpdateableGroup) {
    if (model.key) {
      for (let i = 0; i < this._groups.length; i++) {
        if (this._groups[i].key == model.key) {
          this._groups[i].name = model.name;
        }
      }
    } else {
      this._groups.push({
        key: Guid.create(),
        name: model.name,
        contacts: [],
      });
    }

    this._sort();

    await this._save();
  }

  public async createOrUpdateContact(model: UpdateableContact) {
    for (let i = 0; i < this._groups.length; i++) {
      if (this._groups[i].key == model.groupKey) {
        if (model.contactKey) {
          for (let j = 0; j < this._groups[i].contacts.length; j++) {
            if (this._groups[i].contacts[j].key == model.contactKey) {
              let contact = this._groups[i].contacts[j];
              contact.firstName = model.firstName;
              contact.lastName = model.lastName;
              contact.phone = model.phone;
              contact.modified = Date.now();
            }
          }
        } else {
          this._groups[i].contacts.push({
            key: Guid.create(),
            firstName: model.firstName,
            lastName: model.lastName,
            phone: model.phone,
            modified: Date.now(),
          });
        }
      }
    }

    this._sort();

    await this._save();
  }

  public async deleteGroup(groupKey: string) {
    let indexToRemove = -1;
    for (let i = 0; i < this._groups.length; i++) {
      if (this._groups[i].key == groupKey) {
        indexToRemove = i;
        break;
      }
    }

    if (indexToRemove >= 0) {
      this._groups.splice(indexToRemove, 1);
    }

    this._sort();

    await this._save();
  }

  public async deleteContact(key: string) {
    for (let i = 0; i < this._groups.length; i++) {
      let indexToRemove = -1;
      for (let j = 0; j < this._groups[i].contacts.length; j++) {
        if (this._groups[i].contacts[j].key == key) {
          indexToRemove = j;
          break;
        }
      }
      if (indexToRemove >= 0) {
        this._groups[i].contacts.splice(indexToRemove, 1);
      }
    }

    await this._save();
  }

  public getGroup(key: string): Group {
    var groups = this._groups.filter((g) => g.key == key);
    if (groups.length == 1) {
      return groups[0];
    }
    throw new Error("Group key not found");
  }

  public groups(): Group[] {
    return this._groups;
  }

  public async initialize() { 
    if (!this._groups) { 
      //Uncomment to reset to sample data...
      //this._groups = sampleGroups;
      //await this._save();

      var json = await AsyncStorage.getItem("touch-base:groups");
      this._groups = json ? JSON.parse(json) : new Array<Group>();

      this._sort();
    }
  }

  //-----------------------------------------------------------------------------------------------
  // Private
  //-----------------------------------------------------------------------------------------------

  private async _save() {
    var json = JSON.stringify(this._groups);
    return await AsyncStorage.setItem("touch-base:groups", json);
  }

  private _sort() {
    const compareString = (a: string, b: string) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    };

    this._groups.sort((a, b) => compareString(a.name, b.name));

    this._groups.forEach((g) =>
      g.contacts.sort((a, b) => compareString(a.lastName, b.lastName) || compareString(a.firstName, b.firstName))
    );
  }
}

export default Repository;
