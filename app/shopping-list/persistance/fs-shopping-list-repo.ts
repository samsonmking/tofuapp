import { ShoppingListRepo } from "./shopping-list-repo"; 
import { ShoppingList } from "../models/shopping-list";
import { MemoryShoppingListRepo } from "./memory-shopping-list-repo";
import fs, { write } from 'fs';
import util from 'util';

export class FileShoppingListRepo implements ShoppingListRepo {
    private readonly innerRepo: MemoryShoppingListRepo;

    constructor(private filePath: string) {
        this.innerRepo = new MemoryShoppingListRepo();
        if (fs.existsSync(filePath)) {
            const lists = this.loadFromFile();
            const seed = lists.reduce<Seed>((acc: Seed, cur: ShoppingList) => {
                if (cur.id) {
                    acc.lists.set(cur.id, cur);
                    return Object.assign({}, acc, { index: Math.max(acc.index, cur.id) });
                }
                return acc;
            }, {
                lists: new Map<number, ShoppingList>(),
                index: 1
            });
            this.innerRepo = new MemoryShoppingListRepo(seed.lists, seed.index);
        }
    }

    public async getShoppingLists(): Promise<ShoppingList[]> {
        return await this.innerRepo.getShoppingLists();
    }

    public async getShoppingList(id: number): Promise<ShoppingList> {
        return this.innerRepo.getShoppingList(id);
    }

    public async updateShoppingList(list: ShoppingList): Promise<ShoppingList> {
        const updatedList = await this.innerRepo.updateShoppingList(list);
        await this.saveToFile();
        return updatedList;
    }

    public async addShoppingList(list: ShoppingList): Promise<ShoppingList> {
        const newList = await this.innerRepo.addShoppingList(list);
        await this.saveToFile();
        return newList;
    }

    public async deleteShoppingList(id: number): Promise<boolean> {
        const deleted = await this.innerRepo.deleteShoppingList(id);
        if (deleted) {
            await this.saveToFile();
        }
        return deleted;
    }

    private loadFromFile(): ShoppingList[] {
        const listsJSON = fs.readFileSync(this.filePath);
        return JSON.parse(listsJSON.toString());
    }

    private async saveToFile() {
        const lists = await this.innerRepo.getShoppingLists();
        const writeToFile = util.promisify(fs.writeFile);
        await writeToFile(this.filePath, JSON.stringify(lists, null, 2));
    }
}

interface Seed {
    lists: Map<number, ShoppingList>;
    index: number;
}
