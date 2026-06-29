import { BoundingBox } from '@/app/interfaces/geometry/BoundingBox.interface'

export function intersect(a: BoundingBox, b: BoundingBox): boolean {
    return (
        a.minX <= b.maxX &&
        a.maxX >= b.minX &&
        a.minY <= b.maxY &&
        a.maxY >= b.minY
    )
}
