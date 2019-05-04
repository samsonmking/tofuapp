import {FileRecipeImageStore} from '../../app/recipe-image/fs-recipe-image-store';
import { expect } from 'chai';
import mock from 'mock-fs';

describe('fs-recipe-image-store', () => {
    before(() => {
        mock({
            'images': {}
        });
    });

    after(() => {
        mock.restore();
    })

    it('#saveImage() saves image to disk and returns successful ImageParseResult', async function() {
        const testee = new FileRecipeImageStore();

        await testee.saveImage(1, 'https://i.imgur.com/hG9Ykq5.jpg');
    });

    it('#getImagePathForRecipe() returns base path + id', function() {
        const basePath = '/images';
        const id = 1;
        const testee = new FileRecipeImageStore(basePath);

        const result = testee.getImagePathForRecipe(id);

        expect(result).to.deep.equal(`${basePath}/${id}.jpg`)
    });
});