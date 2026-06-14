import { useEffect, useRef } from 'react'

export default function useDrag(id: string) {
    const isClicked = useRef<boolean>(false)

    const coords = useRef<{
        startX: number
        startY: number
        lastX: number
        lastY: number
    }>({
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
    })

    // useEffect(() => {
    //     const target = document.getElementById(id)

    //     if (!target) {
    //         throw new Error('Element with given id doesn`t exist')
    //     }

    //     const container = target.parentElement

    //     if (!container) {
    //         throw new Error('Target element must have a parent')
    //     }

    //     const onMouseDown = (e: MouseEvent) => {
    //         isClicked.current = true
    //         coords.current.startX = e.clientX
    //         coords.current.startY = e.clientY
    //     }

    //     const onMouseUp = (e: MouseEvent) => {
    //         isClicked.current = false
    //         coords.current.lastX = target.offsetLeft
    //         coords.current.lastY = target.offsetTop
    //     }

    //     const onMouseMove = (e: MouseEvent) => {
    //         if (!isClicked.current) return

    //         const nextX =
    //             e.clientX - coords.current.startX + coords.current.lastX
    //         const nextY =
    //             e.clientY - coords.current.startY + coords.current.lastY

    //         target.style.top = `${nextY}px`
    //         target.style.left = `${nextX}px`
    //     }

    //     target.addEventListener('mousedown', onMouseDown)
    //     target.addEventListener('mouseup', onMouseUp)
    //     container.addEventListener('mousemove', onMouseMove)
    //     container.addEventListener('mouseleave', onMouseUp)

    //     const cleanup = () => {
    //         target.removeEventListener('mousedown', onMouseDown)
    //         target.removeEventListener('mouseup', onMouseUp)
    //         container.removeEventListener('mousemove', onMouseMove)
    //         container.removeEventListener('mouseleave', onMouseUp)
    //     }

    //     return cleanup
    // }, [id])

    useEffect(() => {
        function makeDraggable(element: any) {
            if (!element) {
                return
            }
            let pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0

            element.onmousedown = dragMouseDown
            element.ontouchstart = dragMouseDown

            function dragMouseDown(e: any) {
                e = e || window.event
                e.preventDefault()

                let x
                let y

                //Get touch or click position
                //https://stackoverflow.com/a/41993300/5078983
                if (
                    e.type == 'touchstart' ||
                    e.type == 'touchmove' ||
                    e.type == 'touchend' ||
                    e.type == 'touchcancel'
                ) {
                    let evt =
                        typeof e.originalEvent === 'undefined'
                            ? e
                            : e.originalEvent
                    let touch = evt.touches[0] || evt.changedTouches[0]
                    x = touch.pageX
                    y = touch.pageY
                } else if (
                    e.type == 'mousedown' ||
                    e.type == 'mouseup' ||
                    e.type == 'mousemove' ||
                    e.type == 'mouseover' ||
                    e.type == 'mouseout' ||
                    e.type == 'mouseenter' ||
                    e.type == 'mouseleave'
                ) {
                    x = e.clientX
                    y = e.clientY
                }

                console.log('drag start x: ' + x + ' y:' + y)

                // get the mouse cursor position at startup:
                pos3 = x
                pos4 = y
                document.onmouseup = closeDragElement
                document.ontouchend = closeDragElement
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag
                document.ontouchmove = elementDrag
            }

            function elementDrag(e: any) {
                e = e || window.event
                e.preventDefault()

                let x
                let y

                //Get touch or click position
                //https://stackoverflow.com/a/41993300/5078983
                if (
                    e.type == 'touchstart' ||
                    e.type == 'touchmove' ||
                    e.type == 'touchend' ||
                    e.type == 'touchcancel'
                ) {
                    let evt =
                        typeof e.originalEvent === 'undefined'
                            ? e
                            : e.originalEvent
                    let touch = evt.touches[0] || evt.changedTouches[0]
                    x = touch.pageX
                    y = touch.pageY
                } else if (
                    e.type == 'mousedown' ||
                    e.type == 'mouseup' ||
                    e.type == 'mousemove' ||
                    e.type == 'mouseover' ||
                    e.type == 'mouseout' ||
                    e.type == 'mouseenter' ||
                    e.type == 'mouseleave'
                ) {
                    x = e.clientX
                    y = e.clientY
                }

                // calculate the new cursor position:
                pos1 = pos3 - x
                pos2 = pos4 - y
                pos3 = x
                pos4 = y
                // set the element's new position:
                element.style.top = element.offsetTop - pos2 + 'px'
                element.style.left = element.offsetLeft - pos1 + 'px'
            }

            function closeDragElement() {
                console.log('drag end x: ' + pos3 + ' y:' + pos4)
                // stop moving when mouse button is released:
                document.onmouseup = null
                document.ontouchcancel = null //added touch event
                document.ontouchend = null //added touch event
                document.onmousemove = null
                document.ontouchmove = null //added touch event
            }
        }

        makeDraggable(document.getElementById(id))
    }, [id])
}
