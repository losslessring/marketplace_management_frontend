import { ConnectionCoordinates } from '@/app/interfaces/geometry/ConnectionCoordinates'
import { Coordinates } from '@/app/interfaces/geometry/Coordinates'

export function flattenCoordinates(
    connectionCoordinates: ConnectionCoordinates[]
): Coordinates[] {
    return connectionCoordinates
        .map((connection) => [
            { x: connection.beginX, y: connection.beginY },
            { x: connection.endX, y: connection.endY },
        ])
        .flat()
}
