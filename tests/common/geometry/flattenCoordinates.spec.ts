import { flattenCoordinates } from '@/app/common/geometry/flattenCoordinates'
import { expect, test } from '@playwright/test'

test('flatten coordinates to list', async () => {
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

    const expected = [
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

    const result = flattenCoordinates(connections)

    expect(result).toStrictEqual(expected)
})
