import { maxCoordinate } from '@/app/common/geometry/maxCoordinate'
import { expect, test } from '@playwright/test'

test.describe('find max value in a list connection coordinates', () => {
    const connections = [
        {
            id: '0_0',
            beginX: 100,
            beginY: 110,
            endX: 200,
            endY: 220,
        },

        {
            id: '0_1',
            beginX: 230,
            beginY: 240,
            endX: 80,
            endY: 90,
        },
    ]
    test('find max value in a list of objects with provided key "x"', async () => {
        const expected = 230

        const result = maxCoordinate(connections, 'x')

        expect(result).toStrictEqual(expected)
    })

    test('find max value in a list of objects with provided key "y"', async () => {
        const expected = 240

        const result = maxCoordinate(connections, 'y')

        expect(result).toStrictEqual(expected)
    })
})
