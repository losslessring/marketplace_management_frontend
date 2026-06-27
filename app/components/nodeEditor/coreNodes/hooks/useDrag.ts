import { useEffect } from 'react'

export default function useDrag(
    id: number,
    updateNodePosition: (
        nodeId: number,
        positionX: number,
        positionY: number
    ) => void,
    setIsDragging: Function
) {
    useEffect(() => {
        function makeDraggable(element: any) {
            if (!element) {
                return
            }
            let pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0

            // element.onmousedown = dragMouseDown
            // element.ontouchstart = dragMouseDown

            let dragHandle = element.getElementsByClassName('drag-handle')[0]

            if (dragHandle !== undefined) {
                // if present, the header is where you move the DIV from:
                dragHandle.onmousedown = dragMouseDown
                dragHandle.ontouchstart = dragMouseDown //added touch event
            } else {
                // otherwise, move the DIV from anywhere inside the DIV:
                element.onmousedown = dragMouseDown
                element.ontouchstart = dragMouseDown //added touch event
            }

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

                // console.log('drag start x: ' + x + ' y:' + y)
                // dragHandle.style.border = 'thick solid #0000FF'

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
                setIsDragging(true)

                element.style.top = element.offsetTop - pos2 + 'px'
                element.style.left = element.offsetLeft - pos1 + 'px'
            }

            function closeDragElement() {
                //console.log('drag end x: ' + pos3 + ' y:' + pos4)

                updateNodePosition(
                    // applicationId,
                    Number(id),
                    element.offsetLeft - pos1,
                    element.offsetTop - pos2
                )

                setIsDragging(false)

                // stop moving when mouse button is released:
                document.onmouseup = null
                document.ontouchcancel = null //added touch event
                document.ontouchend = null //added touch event
                document.onmousemove = null
                document.ontouchmove = null //added touch event
                // dragHandle.style.border = 'none'
            }
        }

        makeDraggable(document.getElementById(String(id)))
    }, [id])
}
