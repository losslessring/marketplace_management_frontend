import { maxBy } from '@/app/common/data/maxBy'
import { expect, test } from '@playwright/test'

test.describe('find max value in a list of objects with provided key', () => {
    const coordinates = [
        {
            x: 100,
            y: 110,
        },

        {
            x: 200,
            y: 220,
        },
        {
            x: 230,
            y: 240,
        },
        {
            x: 80,
            y: 90,
        },
    ]
    test('find max value in a list of objects with provided key "x"', async () => {
        const expected = 230

        const result = maxBy(coordinates, 'x')

        expect(result).toStrictEqual(expected)
    })

    test('find max value in a list of objects with provided key "y"', async () => {
        const expected = 240

        const result = maxBy(coordinates, 'y')

        expect(result).toStrictEqual(expected)
    })
})
