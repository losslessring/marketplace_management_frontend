import { ConnectionCoordinates } from '@/app/interfaces/geometry/ConnectionCoordinates'
import { maxBy } from '../data/maxBy'
import { flattenCoordinates } from './flattenCoordinates'

export function maxCoordinate(
    connections: ConnectionCoordinates[],
    coordinate: 'x' | 'y'
) {
    return maxBy(flattenCoordinates(connections), coordinate)
}
