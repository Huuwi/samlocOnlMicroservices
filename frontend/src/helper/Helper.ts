type V2 = [number, number]
type Rect2 = [Function, Function, Function, Function]


function createLineFromTwoPoints(point1: V2, point2: V2): Function {
    let x1 = point1[0]
    let y1 = point1[1]
    let x2 = point2[0]
    let y2 = point2[1]

    return function (x: number): number {
        return (y2 - y1) / (x2 - x1) * (x - x1) + y1
    }
}



export default {

    createRectFromFourPoints(point1: V2, point2: V2, point3: V2, point4: V2) {
        const line1 = createLineFromTwoPoints(point1, point2)
        const line2 = createLineFromTwoPoints(point2, point3)
        const line3 = createLineFromTwoPoints(point3, point4)
        const line4 = createLineFromTwoPoints(point4, point1)

        return [line1, line2, line3, line4]
    },
    checkPointInRect(rect: Rect2, point: V2): Boolean {
        const value1 = rect[0](point[0]) > point[1]
        const value2 = rect[1](point[0]) > point[1]
        const value3 = rect[2](point[0]) > point[1]
        const value4 = rect[3](point[0]) > point[1]
        const condition1 = (value1 != value3)
        const condition2 = (value2 != value4)

        return condition1 && condition2
    },

}