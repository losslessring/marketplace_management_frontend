import { dfsRecursive } from '@/app/common/graph/dfsRecursive'
import { expect, test } from '@playwright/test'

test('depth first search', async () => {
    const adjacencyList = {
        582608: [776040],
        725860: [34534],
        776040: [],
        612534: [600305],
        600305: [145109],
        145109: [],
        34534: [855500],
        827707: [612534, 725860, 582608],
        855500: [],
    }
    const startNode = 827707
    const result = dfsRecursive(startNode, adjacencyList)
    const expected = [
        827707, 612534, 600305, 145109, 725860, 34534, 855500, 582608, 776040,
    ]

    await expect(result).toStrictEqual(expected)
})
