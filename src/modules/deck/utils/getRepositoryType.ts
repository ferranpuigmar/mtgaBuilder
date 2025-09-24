// Import dinámico solo en el backend
import { DeckRepositoryType, DeckRepository } from "../repositories/deckRepository.interface";
import { LocalStorageDeckRepository } from "../repositories/LocalStorageDeckRepository";

const repositoryMap = {
    [DeckRepositoryType.LOCAL_STORAGE]: new LocalStorageDeckRepository(),
};

export const getRepository = (repositoryType: DeckRepositoryType): DeckRepository | null => {
    const repository = repositoryMap[repositoryType as keyof typeof repositoryMap];

    return repository || null;
}